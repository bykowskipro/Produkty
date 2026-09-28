// Mock checkout used when STRIPE_SECRET_KEY is missing (local QA without Stripe).
// Produces session objects shaped like Stripe's so the very same fulfill() path runs.
import crypto from 'node:crypto';
import express from 'express';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pln = (g) => (g / 100).toFixed(2).replace('.', ',') + ' zł';

export function createMockStore(db) {
  return {
    get(id) {
      const row = db.prepare('SELECT data FROM mock_sessions WHERE id = ?').get(id);
      return row ? JSON.parse(row.data) : null;
    },
    put(session) {
      db.prepare('INSERT INTO mock_sessions (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data').run(session.id, JSON.stringify(session));
      return session;
    },
    /** Called by POST /api/checkout in mock mode: an unpaid session waiting on /mock-checkout. */
    createPending({ product, upsells, metadata, visitorId }) {
      return this.put({
        id: `mock_${crypto.randomBytes(12).toString('base64url')}`,
        object: 'checkout.session',
        mode: 'payment',
        status: 'open',
        payment_status: 'unpaid',
        currency: 'pln',
        amount_total: product.price_pln,
        client_reference_id: visitorId || null,
        metadata,
        customer_details: null,
        created: Math.floor(Date.now() / 1000),
        line_items: { data: [lineItem(product)] },
        mock: { product_id: product.id, upsell_ids: upsells.map((u) => u.id) },
      });
    },
  };
}

function lineItem(product) {
  return {
    quantity: 1,
    description: product.name,
    amount_total: product.price_pln,
    price: { id: product.stripe_price_id || `price_mock_${product.id}`, unit_amount: product.price_pln, currency: 'pln', metadata: { product_id: product.id }, product: { name: product.name, metadata: { product_id: product.id } } },
  };
}

export function createMockRouter({ config, store, log = console }) {
  const router = express.Router();
  const byId = (id) => config.products.find((p) => p.id === id);

  router.get('/mock-checkout', (req, res) => {
    const session = typeof req.query.session_id === 'string' ? store.get(req.query.session_id) : null;
    if (!session) return res.status(404).type('html').send('<p>Brak takiej sesji testowej.</p>');
    const product = byId(session.mock.product_id);
    const upsells = session.mock.upsell_ids.map(byId).filter(Boolean);
    res.type('html').send(`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Checkout testowy</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:480px;margin:40px auto;padding:0 16px;color:#111}.warn{background:#fff3cd;border:1px solid #ffe08a;padding:10px 14px;border-radius:8px;font-weight:600}
.row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee}label{display:block;margin:14px 0}input[type=email]{width:100%;padding:10px;font:inherit;border:1px solid #bbb;border-radius:8px;box-sizing:border-box}
button{width:100%;padding:14px;font:inherit;font-weight:700;background:#635bff;color:#fff;border:0;border-radius:8px;cursor:pointer}.bump{border:2px dashed #635bff;padding:12px;border-radius:8px;margin:14px 0}</style></head><body>
<p class="warn">TRYB TESTOWY – to nie jest prawdziwa płatność (brak klucza Stripe).</p>
<h1>Checkout testowy</h1>
<form method="post" action="/mock-checkout/pay">
<input type="hidden" name="session_id" value="${esc(session.id)}">
<div class="row"><span>${esc(product.name)}</span><b>${pln(product.price_pln)}</b></div>
${upsells.map((u) => `<div class="bump"><label style="margin:0"><input type="checkbox" name="upsell" value="${esc(u.id)}" data-testid="upsell-${esc(u.id)}"> <b>Dodaj: ${esc(u.name)}</b> (+${pln(u.price_pln)})<br><small>${esc(u.description)}</small></label></div>`).join('')}
<label>E-mail<input type="email" name="email" required placeholder="test@example.com" data-testid="mock-email"></label>
<label><input type="checkbox" required> ${esc(config.stripe.termsText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'))}</label>
<button type="submit" data-testid="mock-pay">Zapłać (test)</button>
</form></body></html>`);
  });

  router.post('/mock-checkout/pay', express.urlencoded({ extended: false, limit: '8kb' }), (req, res) => {
    const session = typeof req.body.session_id === 'string' ? store.get(req.body.session_id) : null;
    if (!session) return res.status(404).type('html').send('<p>Brak takiej sesji testowej.</p>');
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).type('html').send('<p>Podaj poprawny e-mail.</p>');
    const chosen = [].concat(req.body.upsell || []).filter((id) => session.mock.upsell_ids.includes(id)).map(byId).filter(Boolean);
    const product = byId(session.mock.product_id);
    const items = [product, ...chosen];
    store.put({
      ...session,
      status: 'complete',
      payment_status: 'paid',
      amount_total: items.reduce((s, p) => s + p.price_pln, 0),
      customer_details: { email, name: null },
      consent: { terms_of_service: 'accepted' }, // the consent checkbox is `required` in the mock form, like consent_collection in Stripe
      line_items: { data: items.map(lineItem) },
    });
    log.info?.(`mock-checkout: paid ${session.id} items=${items.map((p) => p.id).join(',')}`);
    res.redirect(303, `/sukces?session_id=${encodeURIComponent(session.id)}`);
  });

  return router;
}
