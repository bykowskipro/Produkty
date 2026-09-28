import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderDeliveryEmail, formatPlDateTime, formatOrderId, formatPln, paymentMethodLabel } from '../../src/email.js';
import { products } from '../helpers.js';

const items = [
  { order_id: 12, product_id: 'main', name: 'Produkt główny', amount: 4900, access_url: 'https://example.test/d/aaa' },
  { order_id: 13, product_id: 'upsell', name: 'Dodatek', amount: 2900, access_url: 'https://example.test/d/bbb' },
];
const base = { name: 'Anna Kowalska', items, siteName: 'TestShop', baseUrl: 'https://example.test', products, contactEmail: 'hej@example.test' };

test('renderDeliveryEmail: consented order -> confirmation with order number, prices, consent/delivery time, no 14-day instruction', () => {
  const m = renderDeliveryEmail({ ...base, order: { id: 12, created_at: '2026-09-28T12:05:00.000Z', amount_total: 7800, currency: 'pln', consent_tos: 'accepted' } });
  assert.match(m.subject, /Produkt główny \+ Dodatek/);
  assert.match(m.subject, /nr 000012/);
  for (const s of [m.html, m.text]) {
    assert.ok(s.includes('000012'), 'order number');
    assert.ok(s.includes('78,00 zł') && s.includes('49,00 zł') && s.includes('29,00 zł'), 'total and line prices');
    assert.ok(s.includes('28.09.2026, godz. 14:05'), 'Polish local time (CEST)');
    assert.ok(s.includes('art. 38 ust. 1 pkt 13'));
    assert.ok(s.includes('prawo odstąpienia nie przysługuje'));
    assert.ok(!s.includes('Masz prawo odstąpić od tej umowy'), 'no statutory 14-day instruction when consent was given');
    assert.ok(s.includes('https://example.test/d/aaa') && s.includes('https://example.test/d/bbb'));
    assert.ok(s.includes('Odpowiemy w ciągu 14 dni'), 'complaints block');
    assert.ok(s.includes('Gwarancja satysfakcji 14 dni') || s.includes('GWARANCJA SATYSFAKCJI 14 DNI'));
    assert.ok(s.includes('Fakturę wystawimy na życzenie'));
    assert.ok(s.includes('Wiadomość transakcyjna'));
  }
  assert.ok(m.html.includes('Otwórz dostęp'));
  assert.ok(m.html.includes(products.find((p) => p.id === 'main').description.slice(0, 20)), 'product description from config in the summary table');
});

test('renderDeliveryEmail: no recorded consent -> statutory 14-day withdrawal instruction (fail-safe)', () => {
  const m = renderDeliveryEmail({ ...base, order: { id: 5, created_at: '2026-09-28T12:05:00.000Z', amount_total: 4900, currency: 'pln', consent_tos: null } });
  for (const s of [m.html, m.text]) {
    assert.ok(s.includes('Masz prawo odstąpić od tej umowy w terminie 14 dni'));
    assert.ok(s.includes('hej@example.test'), 'seller contact for the withdrawal statement');
    assert.ok(s.includes('regulamin.html#zal1'), 'link to the withdrawal form');
    assert.ok(!s.includes('prawo odstąpienia nie przysługuje'));
  }
});

test('renderDeliveryEmail: escapes HTML, tolerates a legacy call without order info; formatting helpers', () => {
  const m = renderDeliveryEmail({ name: '<b>Ala</b>', items: [{ product_id: 'main', name: 'X <script>', amount: 4900, access_url: 'https://e.test/d/x' }], siteName: 'S', baseUrl: 'https://e.test' });
  assert.ok(m.html.includes('&lt;script&gt;') && !m.html.includes('<script>'));
  assert.ok(m.html.includes('Cześć, &lt;b&gt;Ala&lt;/b&gt;!'));
  assert.match(m.subject, /nr — \(S\)$/);
  assert.equal(formatOrderId(7), '000007');
  assert.equal(formatOrderId(null), '—');
  assert.equal(formatPln(3900), '39,00 zł');
  assert.equal(formatPlDateTime('2026-01-15T23:30:00Z'), '16.01.2026, godz. 00:30', 'CET in January');
  assert.equal(paymentMethodLabel('blik'), 'BLIK');
  assert.match(paymentMethodLabel(undefined), /Stripe/);
});
