// End-to-end purchase flow in mock mode (no Stripe keys): landing -> consent -> CTA -> mock checkout (+upsell)
// -> success page -> product app (token, progress sync) -> admin dashboard numbers.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { createApp } from '../../src/server.js';
import { openDb } from '../../src/db.js';
import { testConfig, listen, products } from '../helpers.js';

let browser, srv, config, db;

// Prices come from config/products.json so the flow test does not break when the offer changes.
const pln = (grosze) => (grosze / 100).toFixed(2).replace('.', ',') + ' zł';
const mainPrice = products.find((p) => p.id === 'main').price_pln;
const upsellPrice = products.find((p) => p.id === 'upsell').price_pln;
const revenue = mainPrice + upsellPrice; // grosze, main + upsell bought in this flow
const spend = revenue / 200; // zł: half of the revenue -> CPA = spend, ROAS = 2.00

before(async () => {
  config = testConfig();
  db = openDb(path.join(config.dataDir, 'platform.sqlite'));
  const { app } = createApp({ config, db });
  srv = await listen(app);
  config.baseUrl = srv.base; // access links must point at the random test port
  browser = await chromium.launch();
});
after(async () => { await browser?.close(); await srv?.close(); db?.close(); });

const kpi = async (page, label) => (await page.locator('.kpi', { hasText: label }).first().locator('b').textContent()).trim();

test('full mock purchase flow with upsell, access, progress sync and admin funnel', async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); // phone-sized
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  // 1. Landing with UTM, accept the cookie banner
  await page.goto(`${srv.base}/?utm_source=fb&utm_medium=cpc&utm_campaign=test&utm_content=kreacjaA`);
  await page.getByRole('button', { name: 'Akceptuję' }).click();
  await page.waitForSelector('#consent-banner', { state: 'detached' });
  assert.equal(await page.evaluate(() => window.Consent.granted()), true);
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('utm_first')).utm_content), 'kreacjaA');
  assert.equal(await page.locator('[data-price="main"]').textContent(), pln(mainPrice));

  // 2. CTA -> mock checkout
  await page.getByTestId('cta-main').click();
  await page.waitForURL(/\/mock-checkout\?session_id=mock_/);
  await page.getByText('TRYB TESTOWY').waitFor();

  // 3. Tick the upsell, pay
  await page.getByTestId('upsell-upsell').check();
  await page.getByTestId('mock-email').fill('kupujacy@example.com');
  await page.locator('input[type=checkbox][required]').check();
  await page.getByTestId('mock-pay').click();

  // 4. Success page: 2 access links
  await page.waitForURL(/\/sukces\?session_id=mock_/);
  await page.getByText('Zakup udany').waitFor();
  const links = page.locator('[data-testid="access-links"] a');
  assert.equal(await links.count(), 2);
  const mainHref = await page.getByTestId('access-link-main').getAttribute('href');
  const upsellHref = await page.getByTestId('access-link-upsell').getAttribute('href');
  assert.match(mainHref, new RegExp(`^${srv.base}/d/[A-Za-z0-9_-]{43}$`));
  assert.ok(await page.locator('#first-step').isVisible(), 'first-step slot present');
  assert.ok((await page.textContent('body')).includes('Link wysłaliśmy też na e-mail'));
  assert.ok((await page.textContent('#buyer-email')).includes('kupujacy@example.com'));

  // 5. Follow the main link -> product app (Odhacz Auto checklist) with token; first visit shows the onboarding
  await page.getByTestId('access-link-main').click();
  await page.waitForURL(/\/app\/$/);
  const token = await page.evaluate(() => window.Access.token());
  assert.match(token, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(token, mainHref.split('/d/')[1]);
  assert.ok(!page.url().includes('t='), '?t= stripped from the URL');
  await page.locator('.onb__skip').click();
  await page.goto(`${srv.base}/app/#/settings`);
  await page.getByTestId('access-status').filter({ hasText: 'aktywny' }).waitFor();
  assert.ok((await page.getByTestId('access-status').textContent()).includes('upsell'), 'products_owned lists the upsell too');

  // 6. Progress sync: answer an item (localStorage + debounced Access.saveProgress), read back, survives reload
  await page.goto(`${srv.base}/app/#/phase/p3`);
  await page.locator('[data-item="p3s1i1"] .ans--ok').click(); // „Równe i symetryczne” – an option adapted to the question, state ok
  await page.evaluate(() => window.OdhaczApp.flushSync());
  const remote = await page.evaluate(() => window.Access.loadProgress());
  assert.equal(remote.v, 1);
  const tuples = Object.values(Object.values(remote.cars)[0].a);
  assert.equal(tuples.length, 1);
  assert.equal(tuples[0][0], 'ok', 'compact [state, option, note] tuple per item id');
  assert.equal(tuples[0][1], 'good', 'the chosen option id is kept next to the state');
  await page.reload();
  await page.locator('.item.is-ok').first().waitFor();
  await page.locator('[data-item="p3s1i2"] .ans--uwaga').click(); // „Trzeba docisnąć”
  await page.locator('.item.is-uwaga').first().waitFor();
  await page.evaluate(() => window.OdhaczApp.flushSync());
  assert.equal(Object.keys(Object.values((await page.evaluate(() => window.Access.loadProgress())).cars)[0].a).length, 2);

  // 7. Upsell area opens with its own link; cookie keeps /app/ open without ?t=
  await page.goto(upsellHref);
  await page.waitForURL(/\/dodatek\/$/);
  await page.locator('.onb__skip').click();
  await page.goto(`${srv.base}/dodatek/#/settings`);
  await page.getByTestId('access-status').filter({ hasText: 'aktywny' }).waitFor();
  const r = await page.goto(`${srv.base}/app/`);
  assert.equal(r.status(), 200);
  assert.match(page.url(), /\/app\/$/);

  // 8. Fresh browser without cookie is locked out
  const anon = await browser.newContext();
  const anonPage = await anon.newPage();
  await anonPage.goto(`${srv.base}/app/`);
  assert.match(anonPage.url(), /\/$/);
  await anonPage.getByText('Ten obszar jest dostępny po zakupie').waitFor();
  await anon.close();

  // 9. Delivery e-mail landed in the outbox with both links
  const outbox = fs.readdirSync(path.join(config.dataDir, 'outbox')).filter((f) => f.endsWith('.html'));
  assert.equal(outbox.length, 1, 'exactly one e-mail');
  const mail = fs.readFileSync(path.join(config.dataDir, 'outbox', outbox[0]), 'utf8');
  assert.ok(mail.includes(mainHref) && mail.includes(upsellHref));
  assert.ok(mail.includes('to: kupujacy@example.com'));

  // 10. Admin dashboard (basic auth): 1 purchase, 1 upsell, 78 zł, attributed to kreacjaA
  const adminCtx = await browser.newContext({ httpCredentials: { username: 'admin', password: 'test-password-123' } });
  const admin = await adminCtx.newPage();
  const noAuth = await page.goto(`${srv.base}/admin`);
  assert.equal(noAuth.status(), 401);
  await admin.goto(`${srv.base}/admin`);
  assert.equal(await kpi(admin, 'Zakupy'), '1');
  assert.equal(await kpi(admin, 'Upselle'), '1');
  assert.equal(await kpi(admin, 'Przychód'), pln(revenue));
  assert.equal(await kpi(admin, 'Odwiedzający'), '2', 'buyer + the locked-out anonymous visitor');
  assert.equal(await kpi(admin, 'Kliknięcia CTA'), '1');
  assert.equal(await kpi(admin, 'Start checkoutu'), '1');
  const utmRow = admin.locator('table tr', { hasText: 'kreacjaA' }).first();
  const cells = (await utmRow.locator('td').allTextContents()).map((s) => s.trim());
  assert.deepEqual(cells.slice(0, 2), ['kreacjaA', '1']);
  assert.equal(cells[6], '1', 'purchase attributed to utm_content');
  assert.ok((await admin.textContent('body')).includes('k***@example.com'), 'masked e-mail in orders');

  // spend form -> CPA / ROAS
  await admin.fill('input[name=amount]', String(spend));
  await admin.click('form[action^="/admin/spend"] button');
  await admin.waitForURL(/msg=/);
  assert.equal(await kpi(admin, 'Wydatki na reklamę'), pln(spend * 100));
  assert.equal(await kpi(admin, 'CPA'), pln(spend * 100));
  assert.equal(await kpi(admin, 'ROAS'), '2.00');

  // resend e-mail -> second file in outbox
  await admin.click('form[action^="/admin/resend/"] button');
  await admin.waitForURL(/msg=/);
  assert.equal(fs.readdirSync(path.join(config.dataDir, 'outbox')).filter((f) => f.endsWith('.html')).length, 2);

  // CSV export
  const csv = await adminCtx.request.get(`${srv.base}/admin/export.csv`);
  assert.equal(csv.status(), 200);
  assert.ok((await csv.text()).includes('checkout_start'));

  await adminCtx.close();
  await ctx.close();
  assert.deepEqual(errors, [], 'no browser page errors');
});
