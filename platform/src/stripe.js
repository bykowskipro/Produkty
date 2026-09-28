// Stripe Checkout helpers. buildCheckoutParams() is pure so it can be unit-tested.
import Stripe from 'stripe';

export function createStripeClient(secretKey) {
  return new Stripe(secretKey, { maxNetworkRetries: 2, timeout: 20000 });
}

/**
 * Returns a reusable Stripe Price id for a product.
 * `optional_items` (order bump) needs a Price id and does not accept price_data,
 * so we create one Price per (product, amount) on the fly and cache it in SQLite.
 */
export async function ensurePriceId(stripe, db, product) {
  if (product.stripe_price_id) return product.stripe_price_id;
  const key = `${product.id}:${product.price_pln}:pln`;
  const cached = db.prepare('SELECT price_id FROM stripe_prices WHERE key = ?').get(key);
  if (cached) return cached.price_id;
  const price = await stripe.prices.create({
    currency: 'pln',
    unit_amount: product.price_pln,
    product_data: { name: product.name, metadata: { product_id: product.id } },
    metadata: { product_id: product.id },
  });
  db.prepare('INSERT OR REPLACE INTO stripe_prices (key, price_id) VALUES (?, ?)').run(key, price.id);
  return price.id;
}

/** Trim strings to Stripe's 500-char metadata limit; drop empty values. */
export function buildMetadata(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue;
    out[k] = String(v).slice(0, 500);
  }
  return out;
}

/**
 * Build the Checkout Session params.
 * @param product  main product (from config)
 * @param upsells  [{product, priceId}] offered as optional items (order bump)
 * @param input    validated body of POST /api/checkout
 * @param ctx      {baseUrl, termsText, submitText, clientIp, userAgent}
 */
export function buildCheckoutParams({ product, upsells = [], input, ctx }) {
  const lineItem = product.stripe_price_id
    ? { price: product.stripe_price_id, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: 'pln',
          unit_amount: product.price_pln,
          product_data: {
            name: product.name,
            ...(product.description ? { description: product.description.slice(0, 500) } : {}),
            metadata: { product_id: product.id },
          },
        },
      };

  const params = {
    mode: 'payment',
    currency: 'pln',
    locale: 'pl',
    line_items: [lineItem],
    customer_creation: 'always',
    consent_collection: { terms_of_service: 'required' },
    custom_text: {
      terms_of_service_acceptance: { message: ctx.termsText.slice(0, 1200) },
      ...(ctx.submitText ? { submit: { message: ctx.submitText.slice(0, 1200) } } : {}),
    },
    success_url: `${ctx.baseUrl}/sukces?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ctx.baseUrl}/?canceled=1`,
    client_reference_id: input.visitor_id || undefined,
    allow_promotion_codes: false, // off during the test: a promo field invites code-hunting and abandonment
    phone_number_collection: { enabled: false },
    billing_address_collection: 'auto',
    metadata: buildMetadata({
      product_id: product.id,
      visitor_id: input.visitor_id,
      event_id: input.event_id,
      utm_source: input.utm_source,
      utm_medium: input.utm_medium,
      utm_campaign: input.utm_campaign,
      utm_content: input.utm_content,
      utm_term: input.utm_term,
      fbp: input.fbp,
      fbc: input.fbc,
      marketing_consent: input.marketing_consent, // 'true' | 'false' – gates the server-side Meta CAPI event in fulfillment
      landing_url: input.landing_url,
      client_ip: ctx.clientIp,
      user_agent: ctx.userAgent,
    }),
  };
  if (upsells.length) {
    params.optional_items = upsells.slice(0, 10).map(({ priceId }) => ({ price: priceId, quantity: 1 }));
  }
  return params;
}

export async function retrieveSession(stripe, sessionId) {
  return stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items.data.price.product'] });
}

export function constructWebhookEvent(stripe, rawBody, signature, secret) {
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
