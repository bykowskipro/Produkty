import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createToken, issueToken, verifyToken, productsOwned, parseCookies } from '../../src/access.js';
import { memDb } from '../helpers.js';

test('createToken: 32 random bytes as base64url, unique', () => {
  const a = createToken();
  const b = createToken();
  assert.match(a, /^[A-Za-z0-9_-]{43}$/);
  assert.notEqual(a, b);
});

test('issueToken + verifyToken round trip; revoked/malformed rejected', () => {
  const db = memDb();
  db.prepare("INSERT INTO orders (id, session_id, product_id, name, amount, email) VALUES (1, 'cs_1', 'main', 'Produkt', 4900, 'a@b.pl')").run();
  db.prepare("INSERT INTO orders (id, session_id, product_id, name, amount, email) VALUES (2, 'cs_1', 'upsell', 'Dodatek', 2900, 'a@b.pl')").run();
  const token = issueToken(db, { orderId: 1, productId: 'main', email: 'a@b.pl' });
  issueToken(db, { orderId: 2, productId: 'upsell', email: 'a@b.pl' });

  const row = verifyToken(db, token);
  assert.equal(row.product_id, 'main');
  assert.equal(row.order_id, 1);
  assert.deepEqual(productsOwned(db, row), ['main', 'upsell']);
  assert.ok(db.prepare('SELECT last_used_at FROM access_tokens WHERE token = ?').get(token).last_used_at, 'last_used_at updated');

  assert.equal(verifyToken(db, token.slice(0, 42) + (token.endsWith('A') ? 'B' : 'A')), null, 'wrong token');
  assert.equal(verifyToken(db, 'short'), null);
  assert.equal(verifyToken(db, undefined), null);
  assert.equal(verifyToken(db, "' OR 1=1 --"), null);

  db.prepare('UPDATE access_tokens SET revoked = 1 WHERE token = ?').run(token);
  assert.equal(verifyToken(db, token), null, 'revoked token rejected');
});

test('parseCookies handles multiple cookies and odd input', () => {
  assert.deepEqual(parseCookies('a=1; access_main=abc%3D; b=x=y'), { a: '1', access_main: 'abc=', b: 'x=y' });
  assert.deepEqual(parseCookies(undefined), {});
  assert.deepEqual(parseCookies('junk'), {});
});
