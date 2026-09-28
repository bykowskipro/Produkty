// Stripe webhook: signature verification + idempotent fulfillment through the real HTTP route.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import Stripe from 'stripe';
import { createApp } from '../../src/server.js';
import { testConfig, memDb, listen, paidSession, fakeStripe } from '../helpers.js';

const SECRET = 'whsec_test_secret';
let srv, db, session, real;

before(async () => {
  db = memDb();
  session = paidSession();
  real = new Stripe('sk_test_fake');
  const stripe = { webhooks: real.webhooks, checkout: fakeStripe(session).checkout }; // real signature check, fake retrieve
  const config = testConfig({ STRIPE_SECRET_KEY: 'sk_test_fake', STRIPE_WEBHOOK_SECRET: SECRET, BASE_URL: 'https://example.test' });
  const { app } = createApp({ config, db, stripe });
  srv = await listen(app);
});
after(() => srv.close());

function send(type, obj, secret = SECRET) {
  const payload = JSON.stringify({ id: 'evt_1', object: 'event', type, data: { object: obj } });
  const signature = real.webhooks.generateTestHeaderString({ payload, secret });
  return fetch(srv.base + '/webhook/stripe', { method: 'POST', headers: { 'content-type': 'application/json', 'stripe-signature': signature }, body: payload });
}

test('rejects a bad signature', async () => {
  const r = await send('checkout.session.completed', { id: session.id }, 'whsec_wrong');
  assert.equal(r.status, 400);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 0);
});

test('checkout.session.completed fulfills once, redelivery is a no-op', async () => {
  const r1 = await send('checkout.session.completed', { id: session.id, object: 'checkout.session' });
  assert.equal(r1.status, 200);
  assert.deepEqual(await r1.json(), { received: true });
  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 2);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM access_tokens').get().c, 2);
  assert.equal(db.prepare("SELECT status, email_sent_at FROM fulfillments").get().status, 'done');

  const r2 = await send('checkout.session.async_payment_succeeded', { id: session.id, object: 'checkout.session' });
  assert.equal(r2.status, 200);
  assert.equal(db.prepare('SELECT COUNT(*) c FROM orders').get().c, 2);
  assert.equal(db.prepare("SELECT COUNT(*) c FROM events WHERE event = 'purchase'").get().c, 1);
});

test('irrelevant event types are acknowledged without side effects', async () => {
  const r = await send('payment_intent.created', { id: 'pi_1' });
  assert.equal(r.status, 200);
});

test('GET /api/session/:id in Stripe mode validates the id format and returns 404 for unknown sessions', async () => {
  assert.equal((await fetch(`${srv.base}/api/session/mock_abc`)).status, 400);
  const r = await fetch(`${srv.base}/api/session/cs_test_unknownunknownunknown`);
  assert.equal(r.status, 404);
  const ok = await fetch(`${srv.base}/api/session/${session.id}`);
  const j = await ok.json();
  assert.equal(j.paid, true);
  assert.equal(j.items.length, 2);
});
