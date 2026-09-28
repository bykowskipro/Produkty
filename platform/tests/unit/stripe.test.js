import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCheckoutParams, buildMetadata, ensurePriceId } from '../../src/stripe.js';
import { validateCheckoutInput } from '../../src/server.js';
import { products, memDb } from '../helpers.js';

const main = products.find((p) => p.id === 'main');
const upsell = products.find((p) => p.id === 'upsell');
const ctx = { baseUrl: 'https://example.test', termsText: 'Zgoda na dostarczenie treści cyfrowych…', submitText: '', clientIp: '9.9.9.9', userAgent: 'UA' };
const input = { product_id: 'main', visitor_id: 'v1', event_id: 'e1', utm_source: 'fb', utm_medium: 'cpc', utm_campaign: 'c', utm_content: 'kreacjaA', utm_term: '', fbp: 'fb.1.1.1', fbc: '', marketing_consent: 'true', landing_url: 'https://example.test/?utm_content=kreacjaA' };

test('buildCheckoutParams: dynamic price_data with product_id metadata, consent, custom text, urls, metadata, optional_items', () => {
  const p = buildCheckoutParams({ product: main, upsells: [{ product: upsell, priceId: 'price_up_1' }], input, ctx });
  assert.equal(p.mode, 'payment');
  assert.equal(p.currency, 'pln');
  assert.equal(p.locale, 'pl');
  assert.equal(p.line_items.length, 1);
  assert.equal(p.line_items[0].price_data.unit_amount, main.price_pln);
  assert.equal(p.line_items[0].price_data.product_data.metadata.product_id, 'main');
  assert.deepEqual(p.optional_items, [{ price: 'price_up_1', quantity: 1 }]);
  assert.equal(p.customer_creation, 'always');
  assert.deepEqual(p.consent_collection, { terms_of_service: 'required' });
  assert.equal(p.custom_text.terms_of_service_acceptance.message, ctx.termsText);
  assert.equal(p.custom_text.submit, undefined);
  assert.equal(p.success_url, 'https://example.test/sukces?session_id={CHECKOUT_SESSION_ID}');
  assert.equal(p.cancel_url, 'https://example.test/?canceled=1');
  assert.equal(p.client_reference_id, 'v1');
  assert.equal(p.allow_promotion_codes, false);
  assert.deepEqual(p.phone_number_collection, { enabled: false });
  assert.equal(p.billing_address_collection, 'auto');
  assert.equal(p.metadata.visitor_id, 'v1');
  assert.equal(p.metadata.event_id, 'e1');
  assert.equal(p.metadata.utm_content, 'kreacjaA');
  assert.equal(p.metadata.client_ip, '9.9.9.9');
  assert.equal(p.metadata.user_agent, 'UA');
  assert.equal(p.metadata.fbc, undefined, 'empty values are dropped');
  assert.equal('utm_term' in p.metadata, false);
  assert.equal(p.metadata.marketing_consent, 'true', 'consent state travels with the session');
});

test('buildCheckoutParams: configured stripe_price_id is used as-is; no upsells -> no optional_items; submit text', () => {
  const p = buildCheckoutParams({ product: { ...main, stripe_price_id: 'price_live_main' }, upsells: [], input, ctx: { ...ctx, submitText: 'Dostęp natychmiast po płatności' } });
  assert.deepEqual(p.line_items, [{ price: 'price_live_main', quantity: 1 }]);
  assert.equal(p.optional_items, undefined);
  assert.equal(p.custom_text.submit.message, 'Dostęp natychmiast po płatności');
});

test('buildMetadata trims to 500 chars', () => {
  const m = buildMetadata({ a: 'x'.repeat(600), b: '', c: null, d: 5 });
  assert.equal(m.a.length, 500);
  assert.deepEqual(Object.keys(m), ['a', 'd']);
});

test('ensurePriceId creates a Price once and caches it in SQLite', async () => {
  const db = memDb();
  let created = 0;
  const stripe = { prices: { create: async (params) => { created += 1; assert.equal(params.unit_amount, upsell.price_pln); assert.equal(params.product_data.metadata.product_id, 'upsell'); return { id: 'price_new_1' }; } } };
  assert.equal(await ensurePriceId(stripe, db, upsell), 'price_new_1');
  assert.equal(await ensurePriceId(stripe, db, upsell), 'price_new_1');
  assert.equal(created, 1);
  assert.equal(await ensurePriceId(stripe, db, { ...upsell, stripe_price_id: 'price_cfg' }), 'price_cfg');
  assert.equal(created, 1);
});

test('validateCheckoutInput', () => {
  assert.equal(validateCheckoutInput(null, products).error, 'expected a JSON object');
  assert.equal(validateCheckoutInput({ product_id: 'upsell' }, products).error, 'unknown product_id', 'upsell cannot be bought alone');
  assert.equal(validateCheckoutInput({ product_id: 'main', visitor_id: 'bad id!' }, products).error, 'invalid visitor_id');
  assert.equal(validateCheckoutInput({ product_id: 'main', landing_url: 'javascript:alert(1)' }, products).error, 'invalid landing_url');
  const ok = validateCheckoutInput({ product_id: 'main', visitor_id: 'v_1-2', event_id: 'e', utm_content: 'x'.repeat(300), fbp: 1 }, products);
  assert.equal(ok.product.id, 'main');
  assert.equal(ok.value.utm_content.length, 200);
  assert.equal(ok.value.fbp, '');
  assert.equal(ok.value.marketing_consent, 'false', 'missing consent flag = no consent');
  assert.equal(validateCheckoutInput({ product_id: 'main', marketing_consent: true }, products).value.marketing_consent, 'true');
  assert.equal(validateCheckoutInput({ product_id: 'main', marketing_consent: 'yes' }, products).value.marketing_consent, 'false');
});
