import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFulfillment, matchProduct } from '../../src/fulfillment.js';
import { testConfig, memDb, paidSession, fakeStripe, fakeMailer, fakeCapi, products } from '../helpers.js';

const quiet = { info() {}, warn() {}, error() {} };

function setup(session = paidSession()) {
  const config = testConfig({ STRIPE_SECRET_KEY: 'sk_test_fake', BASE_URL: 'https://example.test' });
  const db = memDb();
  const stripe = fakeStripe(session);
  const mailer = fakeMailer();
  const capi = fakeCapi();
  const f = createFulfillment({ db, config, stripe, mailer, capi, log: quiet });
  return { config, db, stripe, mailer, capi, f, session };
}

test('fulfill(): paid session with an optional item -> 2 orders, 2 tokens, 1 email, 1 CAPI event, purchase + upsell_purchase events', async () => {
  const { db, mailer, capi, f, session } = setup();
  const r = await f.fulfill(session.id);

  assert.equal(r.paid, true);
  assert.equal(r.email, 'Anna.Kowalska@Example.com');
  assert.equal(r.event_id, 'evt-123');
  assert.equal(r.value, 78);
  assert.equal(r.currency, 'PLN');
  assert.deepEqual(r.items.map((i) => i.product_id), ['main', 'upsell']);
  for (const item of r.items) assert.match(item.access_url, /^https:\/\/example\.test\/d\/[A-Za-z0-9_-]{43}$/);

  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 2);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM access_tokens').get().c, 2);
  assert.equal(db.prepare("SELECT status FROM fulfillments WHERE session_id = ?").get(session.id).status, 'done');

  // one e-mail listing both links
  assert.equal(mailer.sent.length, 1);
  assert.equal(mailer.sent[0].to, 'Anna.Kowalska@Example.com');
  const mainName = products.find((p) => p.id === 'main').name;
  const upsellName = products.find((p) => p.id === 'upsell').name;
  assert.ok(mailer.sent[0].subject.includes(`${mainName} + ${upsellName}`), `subject lists both products: ${mailer.sent[0].subject}`);
  assert.match(mailer.sent[0].html, /Cześć, Anna!/);
  for (const item of r.items) assert.ok(mailer.sent[0].html.includes(item.access_url) && mailer.sent[0].text.includes(item.access_url));

  // CAPI purchase with hashed e-mail and dedup id
  assert.equal(capi.calls.length, 1);
  const c = capi.calls[0];
  assert.equal(c.eventId, 'evt-123');
  assert.equal(c.value, 78);
  assert.equal(c.fbp, 'fb.1.1.2');
  assert.deepEqual(c.contents.map((x) => x.id), ['main', 'upsell']);

  // analytics events with the session's UTM attribution
  const ev = db.prepare('SELECT event, props, utm_content, visitor_id FROM events ORDER BY id').all();
  assert.deepEqual(ev.map((e) => e.event).sort(), ['purchase', 'upsell_purchase']);
  const purchase = ev.find((e) => e.event === 'purchase');
  assert.equal(purchase.utm_content, 'kreacjaA');
  assert.equal(purchase.visitor_id, 'visitor-1');
  assert.equal(JSON.parse(purchase.props).amount, 7800);
  assert.equal(JSON.parse(ev.find((e) => e.event === 'upsell_purchase').props).amount, 2900);
});

test('fulfill() is idempotent: repeated and concurrent calls do not duplicate anything', async () => {
  const { db, mailer, capi, f, session } = setup();
  const [r1, r2, r3] = await Promise.all([f.fulfill(session.id), f.fulfill(session.id), f.fulfill(session.id)]);
  const r4 = await f.fulfill(session.id);
  assert.deepEqual(r1.items, r2.items);
  assert.deepEqual(r1.items, r3.items);
  assert.deepEqual(r1.items, r4.items);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 2);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM access_tokens').get().c, 2);
  assert.equal(db.prepare("SELECT COUNT(*) c FROM events WHERE event = 'purchase'").get().c, 1);
  assert.equal(db.prepare("SELECT COUNT(*) c FROM events WHERE event = 'upsell_purchase'").get().c, 1);
  assert.equal(mailer.sent.length, 1, 'exactly one e-mail');
  assert.equal(capi.calls.length, 1, 'exactly one CAPI event');
});

test('fulfill(): e-mail failure is retried on the next call, without duplicating orders', async () => {
  const { db, f, session } = setup();
  let fail = true;
  const mailer = { sent: [], send: async (m) => { if (fail) throw new Error('smtp down'); mailer.sent.push(m); } };
  const f2 = createFulfillment({ db, config: testConfig({ STRIPE_SECRET_KEY: 'sk_test_fake' }), stripe: fakeStripe(session), mailer, capi: fakeCapi(), log: quiet });
  const r1 = await f2.fulfill(session.id);
  assert.equal(r1.paid, true, 'customer still gets access when e-mail fails');
  assert.equal(mailer.sent.length, 0);
  assert.equal(db.prepare('SELECT email_sent_at, error FROM fulfillments').get().email_sent_at, null);
  fail = false;
  await f2.fulfill(session.id);
  assert.equal(mailer.sent.length, 1);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 2);
  void f;
});

test('fulfill(): unpaid session creates nothing; unknown session reports missing', async () => {
  const { db, mailer, f, session } = setup(paidSession({ payment_status: 'unpaid' }));
  assert.deepEqual(await f.fulfill(session.id), { paid: false, payment_status: 'unpaid' });
  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 0);
  assert.equal(mailer.sent.length, 0);
  await assert.rejects(() => f.fulfill('cs_test_unknown000000'), /No such/);
});

test('fulfill(): mock_ sessions come from the mock store and skip Stripe', async () => {
  const config = testConfig({ BASE_URL: 'http://localhost:3000' });
  const db = memDb();
  const session = paidSession({ id: 'mock_abc123' });
  const mockStore = { get: (id) => (id === session.id ? session : null) };
  const mailer = fakeMailer();
  const capi = { enabled: false, calls: [], sendPurchase: async () => ({ skipped: true }) };
  const f = createFulfillment({ db, config, stripe: null, mockStore, mailer, capi, log: quiet });
  const r = await f.fulfill('mock_abc123');
  assert.equal(r.paid, true);
  assert.equal(r.items.length, 2);
  assert.equal(mailer.sent.length, 1);
});

test('resendEmail() sends the delivery mail again for the order session', async () => {
  const { db, mailer, f, session } = setup();
  await f.fulfill(session.id);
  const orderId = db.prepare('SELECT id FROM orders ORDER BY id LIMIT 1').get().id;
  const r = await f.resendEmail(orderId);
  assert.equal(r.items, 2);
  assert.equal(mailer.sent.length, 2);
  await assert.rejects(() => f.resendEmail(999), /not found/);
});

test('matchProduct: by stripe_price_id, then metadata.product_id, then name', () => {
  const withPrice = products.map((p) => (p.id === 'main' ? { ...p, stripe_price_id: 'price_live_main' } : p));
  assert.equal(matchProduct(withPrice, { price: { id: 'price_live_main', product: 'prod_x' } }).id, 'main');
  assert.equal(matchProduct(products, { price: { id: 'price_x', product: { metadata: { product_id: 'upsell' } } } }).id, 'upsell');
  assert.equal(matchProduct(products, { price: { id: 'price_x', metadata: { product_id: 'upsell' } } }).id, 'upsell');
  assert.equal(matchProduct(products, { price: { id: 'price_x', product: { name: products.find((p) => p.id === 'upsell').name, metadata: {} } } }).id, 'upsell');
  assert.equal(matchProduct(products, { price: { id: 'price_x', product: { name: 'Nope', metadata: {} } } }), null);
});

test('fulfill(): CAPI Purchase is skipped without marketing consent; e-mail carries the legal confirmation', async () => {
  const noConsent = paidSession({ metadata: { ...paidSession().metadata, marketing_consent: 'false' } });
  const { capi, mailer, f } = setup(noConsent);
  const r = await f.fulfill(noConsent.id);
  assert.equal(r.paid, true);
  assert.equal(mailer.sent.length, 1, 'delivery e-mail still goes out');
  assert.equal(capi.calls.length, 0, 'no server-side event to Meta without consent');
  // Confirmation content (art. 21 UPK): order number, consent block with art. 38 ust. 1 pkt 13, complaints, seller placeholders
  const mail = mailer.sent[0];
  assert.match(mail.subject, /potwierdzenie zamówienia nr 000001/);
  assert.match(mail.html, /art\. 38 ust\. 1 pkt 13/);
  assert.match(mail.html, /prawo odstąpienia nie przysługuje/, 'session.consent.terms_of_service = accepted -> withdrawal right lost');
  assert.match(mail.text, /Odpowiemy w ciągu 14 dni/);
  assert.match(mail.html, /78,00 zł/);
});

test('fulfill(): session without the Stripe consent flag -> e-mail falls back to the 14-day withdrawal instruction', async () => {
  const s = paidSession({ consent: null });
  const { mailer, f } = setup(s);
  await f.fulfill(s.id);
  assert.match(mailer.sent[0].html, /Masz prawo odstąpić od tej umowy w terminie 14 dni/);
  assert.doesNotMatch(mailer.sent[0].html, /prawo odstąpienia nie przysługuje/);
});
