import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../../src/server.js';
import { validateEvent } from '../../src/analytics.js';
import { testConfig, memDb, listen } from '../helpers.js';

let srv, db, app;
before(async () => {
  db = memDb();
  ({ app } = createApp({ config: testConfig(), db }));
  srv = await listen(app);
});
after(() => srv.close());

const post = (path, body, headers = {}) => fetch(srv.base + path, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('validateEvent: accepts valid payloads, rejects bad names/props/sizes', () => {
  assert.equal(validateEvent({ event: 'page_view', visitor_id: 'v', props: { a: 1 }, url: 'http://x/', utm_source: 'fb' }).ok, true);
  assert.equal(validateEvent({ event: 'page_view' }).value.visitor_id, null);
  assert.equal(validateEvent(null).ok, false);
  assert.equal(validateEvent([]).ok, false);
  assert.equal(validateEvent({ event: 'Page View' }).error, 'invalid event name');
  assert.equal(validateEvent({ event: 'x'.repeat(41) }).error, 'invalid event name');
  assert.equal(validateEvent({ event: 'ok', visitor_id: 'v'.repeat(65) }).error, 'invalid visitor_id');
  assert.equal(validateEvent({ event: 'ok', props: [1] }).error, 'props must be an object');
  assert.equal(validateEvent({ event: 'ok', props: { big: 'x'.repeat(5000) } }).error, 'props too large');
  assert.equal(validateEvent({ event: 'ok', url: 'u'.repeat(3000) }).value.url.length, 2048);
});

test('POST /api/events stores the event with hashed IP and user agent; rejects invalid input', async () => {
  const r = await post('/api/events', { visitor_id: 'vis-1', event: 'page_view', props: { path: '/' }, url: 'http://x/?utm_content=k', referrer: 'https://facebook.com/', utm_source: 'fb', utm_content: 'k' }, { 'user-agent': 'TestUA/1.0' });
  assert.equal(r.status, 204);
  const row = db.prepare("SELECT * FROM events WHERE visitor_id = 'vis-1'").get();
  assert.equal(row.event, 'page_view');
  assert.equal(row.utm_content, 'k');
  assert.equal(row.user_agent, 'TestUA/1.0');
  assert.match(row.ip_hash, /^[0-9a-f]{16}$/);
  assert.equal(JSON.parse(row.props).path, '/');

  assert.equal((await post('/api/events', { event: 'bad name' })).status, 400);
  assert.equal((await post('/api/events', '{not json')).status, 400);
  assert.equal((await post('/api/events', [1, 2])).status, 400);
  // text/plain (sendBeacon) is accepted
  assert.equal((await post('/api/events', JSON.stringify({ event: 'beacon_test' }), { 'content-type': 'text/plain' })).status, 204);
});

test('security headers, JSON 404 for /api, HTML 404 otherwise, no x-powered-by', async () => {
  const r = await fetch(srv.base + '/api/nope');
  assert.equal(r.status, 404);
  assert.deepEqual(await r.json(), { error: 'not found' });
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(r.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.match(r.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  assert.match(r.headers.get('content-security-policy'), /connect\.facebook\.net/);
  assert.equal(r.headers.get('x-powered-by'), null);
  const h = await fetch(srv.base + '/nope');
  assert.equal(h.status, 404);
  assert.match(h.headers.get('content-type'), /text\/html/);
});

test('POST /api/checkout validates and returns a mock checkout url in mock mode', async () => {
  assert.equal((await post('/api/checkout', { product_id: 'nope' })).status, 400);
  assert.equal((await post('/api/checkout', { product_id: 'main', visitor_id: '!!' })).status, 400);
  const r = await post('/api/checkout', { product_id: 'main', visitor_id: 'v1', event_id: 'e1', landing_url: 'http://x/' });
  assert.equal(r.status, 200);
  const j = await r.json();
  assert.match(j.url, /^\/mock-checkout\?session_id=mock_/);
  const sid = new URL(j.url, srv.base).searchParams.get('session_id');
  const s = await fetch(`${srv.base}/api/session/${sid}`);
  assert.deepEqual(await s.json(), { paid: false, payment_status: 'unpaid' });
  assert.equal((await fetch(`${srv.base}/api/session/cs_test_notallowed_in_mock`)).status, 400);
  assert.equal((await fetch(`${srv.base}/api/session/mock_doesnotexist`)).status, 404);
});

test('protected product paths redirect without a token; /api/progress requires a token', async () => {
  const r = await fetch(srv.base + '/app/', { redirect: 'manual' });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('location'), '/?locked=1');
  const d = await fetch(srv.base + '/d/' + 'x'.repeat(43), { redirect: 'manual' });
  assert.equal(d.headers.get('location'), '/?locked=1');
  assert.equal((await fetch(srv.base + '/api/progress')).status, 401);
  assert.equal((await fetch(srv.base + '/api/access/verify?token=bad')).status, 401);
  assert.equal((await fetch(srv.base + '/legal/regulamin.html')).status, 200, 'public pages stay public');
});

test('webhook returns 503 in mock mode (not configured) and /healthz works', async () => {
  assert.equal((await post('/webhook/stripe', {})).status, 503);
  assert.deepEqual(await (await fetch(srv.base + '/healthz')).json(), { ok: true });
});
