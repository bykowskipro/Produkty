import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reportRange, funnelByDay, funnelByUtmContent, totals, upsertSpend, lastOrders, eventsCsv, basicAuth } from '../../src/admin.js';
import { recordEvent } from '../../src/analytics.js';
import { memDb } from '../helpers.js';

function seed(db) {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  const ev = (visitor, event, utm_content, props, ts) =>
    recordEvent(db, { visitor_id: visitor, event, props: props ? JSON.stringify(props) : null, url: null, referrer: null, utm_source: 'fb', utm_medium: null, utm_campaign: null, utm_content, utm_term: null }, { ts: ts.toISOString() });

  // today: 3 unique visitors (A twice), 2 CTA, 2 checkouts, 2 purchases (B with upsell)
  ev('A', 'page_view', 'kreacjaA', null, now); ev('A', 'page_view', 'kreacjaA', null, now);
  ev('B', 'page_view', 'kreacjaA', null, now);
  ev('C', 'page_view', 'kreacjaB', null, now);
  ev('A', 'cta_click', 'kreacjaA', null, now); ev('B', 'cta_click', 'kreacjaA', null, now); ev('B', 'cta_click', 'kreacjaA', null, now);
  ev('A', 'checkout_start', 'kreacjaA', null, now); ev('B', 'checkout_start', 'kreacjaA', null, now);
  ev('A', 'purchase', 'kreacjaA', { amount: 4900, value: 49 }, now);
  ev('B', 'purchase', 'kreacjaA', { amount: 7800, value: 78 }, now);
  ev('B', 'upsell_purchase', 'kreacjaA', { amount: 2900, value: 29 }, now);
  // yesterday: 1 visitor, no conversions, no utm_content
  ev('D', 'page_view', null, null, yesterday);
  return { now, yesterday };
}

test('reportRange covers the last N local days', () => {
  const r = reportRange(7);
  assert.ok(r.fromIso < r.toIso);
  assert.match(r.fromDay, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(Math.round((Date.parse(r.toIso) - Date.parse(r.fromIso)) / 86400000), 7);
  assert.match(r.modifier, /^[+-]\d+ minutes$/);
});

test('funnelByDay / funnelByUtmContent / totals aggregate correctly (unique visitors, purchases, revenue, spend, CPA, ROAS)', () => {
  const db = memDb();
  seed(db);
  const range = reportRange(30);
  const today = range.toDay;

  upsertSpend(db, { date: today, amount: '50,00', note: 'test' });

  const byDay = funnelByDay(db, range);
  assert.equal(byDay.length, 2);
  const d0 = byDay[0];
  assert.equal(d0.day, today);
  assert.equal(d0.visitors, 3, 'unique visitors');
  assert.equal(d0.cta_clicks, 2, 'unique CTA clickers');
  assert.equal(d0.checkout_starts, 2);
  assert.equal(d0.purchases, 2);
  assert.equal(d0.upsell_purchases, 1);
  assert.equal(d0.revenue, 12700, 'revenue in grosze from purchase.amount');
  assert.equal(d0.spend, 5000);
  assert.equal(d0.cpa, 2500);
  assert.ok(Math.abs(d0.roas - 2.54) < 1e-9);
  assert.ok(Math.abs(d0.cr_cta - 2 / 3) < 1e-9);
  assert.equal(d0.cr_checkout, 1);
  assert.equal(d0.cr_purchase, 1);
  assert.ok(Math.abs(d0.cr_total - 2 / 3) < 1e-9);

  const d1 = byDay[1];
  assert.equal(d1.visitors, 1);
  assert.equal(d1.purchases, 0);
  assert.equal(d1.cpa, null);
  assert.equal(d1.roas, null);

  const byUtm = funnelByUtmContent(db, range);
  const a = byUtm.find((r) => r.utm_content === 'kreacjaA');
  const b = byUtm.find((r) => r.utm_content === 'kreacjaB');
  const none = byUtm.find((r) => r.utm_content === '(brak)');
  assert.deepEqual([a.visitors, a.cta_clicks, a.checkout_starts, a.purchases, a.upsell_purchases, a.revenue], [2, 2, 2, 2, 1, 12700]);
  assert.deepEqual([b.visitors, b.purchases], [1, 0]);
  assert.deepEqual([none.visitors, none.purchases], [1, 0]);
  assert.equal(byUtm[0].utm_content, 'kreacjaA', 'sorted by purchases desc');

  const t = totals(db, range);
  assert.deepEqual([t.visitors, t.cta_clicks, t.checkout_starts, t.purchases, t.upsell_purchases, t.revenue, t.spend], [4, 2, 2, 2, 1, 12700, 5000]);
  assert.equal(t.cpa, 2500);

  // spend upsert overwrites the same date
  upsertSpend(db, { date: today, amount: '10', note: '' });
  assert.equal(totals(db, range).spend, 1000);
  assert.throws(() => upsertSpend(db, { date: 'x', amount: '1' }), /RRRR-MM-DD/);
  assert.throws(() => upsertSpend(db, { date: today, amount: 'abc' }), /liczbą/);

  // events outside the range are excluded
  const narrow = { ...reportRange(1), fromIso: new Date(Date.now() + 3600000).toISOString() };
  assert.equal(totals(db, narrow).visitors, 0);
});

test('lastOrders joins fulfillment flags; eventsCsv escapes quotes', () => {
  const db = memDb();
  db.prepare("INSERT INTO fulfillments (session_id, status, email_sent_at) VALUES ('cs_1', 'done', '2026-01-01T00:00:00Z')").run();
  db.prepare("INSERT INTO orders (session_id, product_id, name, amount, email) VALUES ('cs_1', 'main', 'P', 4900, 'anna@example.com')").run();
  const rows = lastOrders(db);
  assert.equal(rows.length, 1);
  assert.ok(rows[0].email_sent_at);
  recordEvent(db, { visitor_id: 'v', event: 'page_view', props: '{"a":"q\\"uote"}', url: 'http://x/?a=1', referrer: null, utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null });
  const csv = eventsCsv(db, reportRange(7));
  const lines = csv.trim().split('\n');
  assert.equal(lines.length, 2);
  assert.ok(lines[0].startsWith('id,ts,visitor_id,event,props'));
  assert.ok(lines[1].includes('"{""a"":""q\\""uote""}"'));
});

test('basicAuth accepts only the exact credentials', () => {
  const mw = basicAuth({ user: 'admin', pass: 'secret-123' });
  const run = (header) => {
    let status = 200; let nexted = false;
    const req = { get: (h) => (h === 'authorization' ? header : undefined) };
    const res = { set() {}, status(s) { status = s; return this; }, send() {} };
    mw(req, res, () => { nexted = true; });
    return nexted ? 'ok' : status;
  };
  assert.equal(run('Basic ' + Buffer.from('admin:secret-123').toString('base64')), 'ok');
  assert.equal(run('Basic ' + Buffer.from('admin:wrong').toString('base64')), 401);
  assert.equal(run('Basic ' + Buffer.from('admin:secret-1234').toString('base64')), 401);
  assert.equal(run(undefined), 401);
  assert.equal(run('Bearer x'), 401);
});
