// Shared test helpers: in-memory DB + config built from a fake env.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig, loadProductsFile } from '../src/config.js';
import { openDb } from '../src/db.js';

export const products = loadProductsFile();

export function tmpDir(prefix = 'platform-test-') {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/** Config for tests. Default: mock mode (no Stripe key), tmp data dir, admin creds. */
export function testConfig(env = {}) {
  return loadConfig({
    BASE_URL: 'http://localhost:0',
    DATA_DIR: tmpDir(),
    ADMIN_USER: 'admin',
    ADMIN_PASS: 'test-password-123',
    IP_HASH_SALT: 'salt',
    SITE_NAME: 'TestShop',
    ...env,
  }, { products });
}

export const memDb = () => openDb(':memory:');

/** Stripe-like paid session with the main product + the upsell as an optional item. */
export function paidSession(overrides = {}) {
  return {
    id: 'cs_test_a1b2c3d4e5f6g7h8i9j0',
    object: 'checkout.session',
    payment_status: 'paid',
    status: 'complete',
    currency: 'pln',
    amount_total: 7800,
    created: 1700000000,
    client_reference_id: 'visitor-1',
    customer_details: { email: 'Anna.Kowalska@Example.com', name: 'Anna Kowalska' },
    metadata: { product_id: 'main', visitor_id: 'visitor-1', event_id: 'evt-123', utm_source: 'fb', utm_medium: 'cpc', utm_campaign: 'test', utm_content: 'kreacjaA', fbp: 'fb.1.1.2', fbc: 'fb.1.1.abc', landing_url: 'https://example.test/?utm_content=kreacjaA', client_ip: '1.2.3.4', user_agent: 'UA' },
    line_items: {
      data: [
        { quantity: 1, amount_total: 4900, description: 'Produkt główny', price: { id: 'price_dyn_1', unit_amount: 4900, product: { id: 'prod_1', name: 'Produkt główny', metadata: { product_id: 'main' } } } },
        { quantity: 1, amount_total: 2900, description: 'Dodatek', price: { id: 'price_dyn_2', unit_amount: 2900, product: { id: 'prod_2', name: 'Dodatek', metadata: { product_id: 'upsell' } } } },
      ],
    },
    ...overrides,
  };
}

/** Fake Stripe client: retrieve() returns the given session and counts calls. */
export function fakeStripe(session) {
  const calls = [];
  return {
    calls,
    checkout: { sessions: { retrieve: async (id, opts) => { calls.push({ id, opts }); if (id !== session.id) { const e = new Error('No such checkout.session'); e.type = 'StripeInvalidRequestError'; e.statusCode = 404; throw e; } return session; } } },
  };
}

export function fakeMailer() {
  const sent = [];
  return { provider: 'fake', sent, send: async (m) => { sent.push(m); return { id: `m${sent.length}` }; } };
}

export function fakeCapi() {
  const calls = [];
  return { enabled: true, calls, sendPurchase: async (p) => { calls.push(p); return { ok: true }; } };
}

/** Start an express app on a random port. Returns {base, close}. */
export function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ base: `http://127.0.0.1:${port}`, port, server, close: () => new Promise((r) => server.close(r)) });
    });
  });
}
