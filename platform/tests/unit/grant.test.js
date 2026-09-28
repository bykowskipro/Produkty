import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFulfillment } from '../../src/fulfillment.js';
import { verifyToken } from '../../src/access.js';
import { testConfig, memDb, fakeMailer, fakeCapi } from '../helpers.js';

const quiet = { info() {}, warn() {}, error() {} };

test('grantAccess(): zero-amount orders + tokens, one e-mail, no purchase events, validation', async () => {
  const config = testConfig({ BASE_URL: 'https://example.test' });
  const db = memDb();
  const mailer = fakeMailer();
  const f = createFulfillment({ db, config, stripe: null, mailer, capi: fakeCapi(), log: quiet });

  const r = await f.grantAccess({ email: ' Beta@Example.com ', productIds: ['main', 'upsell'], note: 'beta #1', sendMail: true });
  assert.equal(r.email, 'beta@example.com');
  assert.match(r.session_id, /^manual_/);
  assert.deepEqual(r.items.map((i) => i.product_id), ['main', 'upsell']);
  assert.equal(db.prepare('SELECT COALESCE(SUM(amount),0) s FROM orders').get().s, 0);
  assert.equal(mailer.sent.length, 1);
  assert.equal(mailer.sent[0].to, 'beta@example.com');
  assert.equal(db.prepare("SELECT COUNT(*) c FROM events WHERE event IN ('purchase','upsell_purchase')").get().c, 0);
  const token = r.items[0].access_url.split('/d/')[1];
  assert.ok(verifyToken(db, token), 'token is valid');

  const r2 = await f.grantAccess({ email: 'x@y.pl', productIds: 'main', sendMail: false });
  assert.equal(r2.items.length, 1);
  assert.equal(mailer.sent.length, 1, 'no e-mail when sendMail=false');

  await assert.rejects(f.grantAccess({ email: 'zly-adres', productIds: ['main'] }), /e-mail/);
  await assert.rejects(f.grantAccess({ email: 'a@b.pl', productIds: ['nie-ma'] }), /produkt/);
});
