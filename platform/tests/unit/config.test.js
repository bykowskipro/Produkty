import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig, normalizeProducts, DEFAULT_TERMS_TEXT } from '../../src/config.js';
import { products } from '../helpers.js';

test('normalizeProducts validates ids, prices, types and normalises access_path', () => {
  const [p] = normalizeProducts([{ id: 'x', name: 'X', price_pln: 1900, type: 'main', access_path: 'app/x' }]);
  assert.equal(p.access_path, '/app/x/');
  assert.throws(() => normalizeProducts([]), /non-empty/);
  assert.throws(() => normalizeProducts([{ id: 'Bad Id', price_pln: 1900, type: 'main' }]), /invalid id/);
  assert.throws(() => normalizeProducts([{ id: 'a', price_pln: 19.5, type: 'main' }]), /grosze/);
  assert.throws(() => normalizeProducts([{ id: 'a', price_pln: 1900, type: 'bundle' }]), /type/);
  assert.throws(() => normalizeProducts([{ id: 'a', price_pln: 1900, type: 'upsell' }]), /"main"/);
  assert.throws(() => normalizeProducts([{ id: 'a', price_pln: 1900, type: 'main' }, { id: 'a', price_pln: 1900, type: 'main' }]), /duplicate/);
});

test('loadConfig: mock mode without a Stripe key; BASE_URL substituted into the terms text', () => {
  const c = loadConfig({ BASE_URL: 'https://shop.test/', ADMIN_USER: 'a', ADMIN_PASS: 'b' }, { products });
  assert.equal(c.mock, true);
  assert.equal(c.baseUrl, 'https://shop.test');
  assert.ok(c.stripe.termsText.includes('https://shop.test/legal/regulamin.html'));
  assert.ok(c.stripe.termsText.includes('gwarancja zwrotu Sklep '), '{SITE_NAME} substituted');
  assert.ok(!c.stripe.termsText.includes('{'), 'no unreplaced placeholders');
  assert.equal(c.stripe.submitText, 'Dostęp wyślemy od razu na e-mail. 14 dni gwarancji zwrotu.');
  assert.ok(DEFAULT_TERMS_TEXT.includes('art. 38 ust. 1 pkt 13'));
  assert.ok(DEFAULT_TERMS_TEXT.includes('Żądam dostarczenia treści cyfrowej od razu po zapłacie'), 'explicit request for immediate delivery');
  assert.ok(DEFAULT_TERMS_TEXT.includes('wyrażam na to wyraźną zgodę'), 'express consent (statutory wording)');
  assert.ok(DEFAULT_TERMS_TEXT.length <= 1200, 'Stripe custom_text limit');
  assert.equal(loadConfig({ STRIPE_SECRET_KEY: 'sk_test_1' }, { products }).mock, false);
  assert.equal(loadConfig({ STRIPE_SECRET_KEY: 'sk_test_1', MOCK_MODE: '1' }, { products }).mock, true);
});

test('loadConfig refuses unsafe production setups', () => {
  const prod = { NODE_ENV: 'production', STRIPE_SECRET_KEY: 'sk_live_1', ADMIN_USER: 'admin', ADMIN_PASS: 'long-enough-pass' };
  assert.doesNotThrow(() => loadConfig(prod, { products }));
  assert.throws(() => loadConfig({ ...prod, ADMIN_PASS: '' }, { products }), /ADMIN_USER and ADMIN_PASS/);
  assert.throws(() => loadConfig({ ...prod, ADMIN_PASS: 'short' }, { products }), /at least 10/);
  assert.throws(() => loadConfig({ ...prod, STRIPE_SECRET_KEY: '' }, { products }), /STRIPE_SECRET_KEY/);
  assert.doesNotThrow(() => loadConfig({ ...prod, STRIPE_SECRET_KEY: '', MOCK_MODE: '1' }, { products }), 'explicit mock allowed');
});
