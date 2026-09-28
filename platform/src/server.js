// HTTP server: wires config, SQLite, Stripe (or mock), fulfillment, access, analytics and admin.
// createApp() is exported for tests; main() runs when this file is the entry point.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import express from 'express';
import { loadConfig, ROOT_DIR } from './config.js';
import { openDb } from './db.js';
import { createStripeClient, ensurePriceId, buildCheckoutParams, constructWebhookEvent } from './stripe.js';
import { createMailer } from './email.js';
import { createCapi } from './meta-capi.js';
import { createFulfillment } from './fulfillment.js';
import { createAccessRouter } from './access.js';
import { createAnalyticsRouter } from './analytics.js';
import { createAdminRouter } from './admin.js';
import { createMockStore, createMockRouter } from './mock.js';

export const log = {
  info: (m) => console.log(`${new Date().toISOString()} INFO ${m}`),
  warn: (m) => console.warn(`${new Date().toISOString()} WARN ${m}`),
  error: (m) => console.error(`${new Date().toISOString()} ERROR ${m}`),
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://js.stripe.com",
  "connect-src 'self' https://www.facebook.com https://connect.facebook.net https://api.stripe.com",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "media-src 'self' data: blob: https:",
  "frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://www.facebook.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
].join('; ');

function securityHeaders(req, res, next) {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': CSP,
  });
  next();
}

/** Minimal in-memory rate limiter (per IP, fixed window). */
export function rateLimit({ windowMs = 60000, max = 60 } = {}) {
  const hits = new Map();
  const timer = setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (v.reset <= now) hits.delete(k); }, windowMs);
  timer.unref?.();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || 'unknown';
    let h = hits.get(key);
    if (!h || h.reset <= now) { h = { count: 0, reset: now + windowMs }; hits.set(key, h); }
    h.count += 1;
    if (h.count > max) {
      res.set('Retry-After', String(Math.ceil((h.reset - now) / 1000)));
      return res.status(429).json({ error: 'Zbyt wiele żądań, spróbuj za chwilę.' });
    }
    next();
  };
}

const s = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

/** Validate POST /api/checkout body. Returns {error} or {value}. */
export function validateCheckoutInput(body, products) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'expected a JSON object' };
  const product = products.find((p) => p.id === body.product_id && p.type === 'main');
  if (!product) return { error: 'unknown product_id' };
  const value = { product_id: product.id };
  for (const k of ['visitor_id', 'event_id']) {
    const v = s(body[k], 64);
    if (v && !ID_RE.test(v)) return { error: `invalid ${k}` };
    value[k] = v;
  }
  for (const k of ['fbp', 'fbc', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) value[k] = s(body[k], 200);
  value.landing_url = s(body.landing_url, 2048);
  if (value.landing_url && !/^https?:\/\//i.test(value.landing_url)) return { error: 'invalid landing_url' };
  // Marketing (Meta) consent as given in the cookie banner; anything but an explicit true counts as "no consent".
  value.marketing_consent = body.marketing_consent === true || body.marketing_consent === 'true' ? 'true' : 'false';
  return { value, product };
}

/** Build the Express app. `stripe` may be injected (tests); otherwise a client is created from config. */
export function createApp({ config, db, stripe, fetchImpl = fetch } = {}) {
  config = config || loadConfig();
  db = db || openDb(path.join(config.dataDir, 'platform.sqlite'));

  stripe = config.mock ? null : (stripe || createStripeClient(config.stripe.secretKey));
  const mockStore = config.mock ? createMockStore(db) : null;
  const mailer = createMailer({ ...config.email, outboxDir: path.join(config.dataDir, 'outbox'), log, fetchImpl });
  const capi = createCapi({ pixelId: config.meta.pixelId, token: config.meta.capiToken, testEventCode: config.meta.testEventCode, log, fetchImpl });
  const fulfillment = createFulfillment({ db, config, stripe, mockStore, mailer, capi, log });

  if (config.mock) log.warn('MOCK MODE: no STRIPE_SECRET_KEY - /api/checkout uses the fake /mock-checkout page');
  else if (!config.stripe.webhookSecret) log.warn('STRIPE_WEBHOOK_SECRET missing: /webhook/stripe will reject events (success page still fulfills orders)');

  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);
  app.set('etag', 'weak');
  app.use(securityHeaders);

  // Request log (skip static assets and health checks).
  app.use((req, res, next) => {
    if (req.path.startsWith('/assets/') || req.path === '/healthz') return next();
    const t0 = process.hrtime.bigint();
    res.on('finish', () => log.info(`${req.method} ${req.originalUrl.slice(0, 200)} ${res.statusCode} ${Number(process.hrtime.bigint() - t0) / 1e6 | 0}ms`));
    next();
  });

  app.get('/healthz', (req, res) => res.json({ ok: true }));

  // --- Stripe webhook (raw body BEFORE the JSON parser) ---
  app.post('/webhook/stripe', express.raw({ type: 'application/json', limit: '1mb' }), async (req, res) => {
    if (!stripe || !config.stripe.webhookSecret) return res.status(503).json({ error: 'webhook not configured' });
    let event;
    try {
      event = constructWebhookEvent(stripe, req.body, req.get('stripe-signature'), config.stripe.webhookSecret);
    } catch (err) {
      log.warn(`webhook: signature verification failed: ${err.message}`);
      return res.status(400).json({ error: 'invalid signature' });
    }
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      try {
        const r = await fulfillment.fulfill(event.data.object.id);
        log.info(`webhook: ${event.type} ${event.data.object.id} paid=${r.paid}`);
      } catch (err) {
        log.error(`webhook: fulfill failed for ${event.data.object.id}: ${err.message}`);
        return res.status(500).json({ error: 'fulfillment failed' }); // Stripe retries
      }
    }
    res.json({ received: true });
  });

  app.use('/api', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); }, express.json({ limit: '64kb' }));

  // --- Public config for the front-end ---
  app.get('/api/config', (req, res) => {
    res.json({
      site_name: config.siteName,
      mock: config.mock,
      meta_pixel_id: config.meta.pixelId || null,
      products: config.products.map(({ id, name, description, price_pln, type }) => ({ id, name, description, price_pln, type })),
    });
  });

  // --- Checkout ---
  app.post('/api/checkout', rateLimit({ windowMs: 60000, max: 15 }), async (req, res, next) => {
    const v = validateCheckoutInput(req.body, config.products);
    if (v.error) return res.status(400).json({ error: v.error });
    const { value: input, product } = v;
    const upsellProducts = config.products.filter((p) => p.type === 'upsell');
    const clientIp = req.ip;
    const userAgent = s(req.get('user-agent'), 300);
    const metadata = { product_id: product.id, ...input, client_ip: clientIp, user_agent: userAgent };
    try {
      if (config.mock) {
        const session = mockStore.createPending({ product, upsells: upsellProducts, metadata, visitorId: input.visitor_id });
        return res.json({ url: `/mock-checkout?session_id=${encodeURIComponent(session.id)}`, mock: true });
      }
      const upsells = [];
      for (const u of upsellProducts) upsells.push({ product: u, priceId: await ensurePriceId(stripe, db, u) });
      const params = buildCheckoutParams({ product, upsells, input, ctx: { baseUrl: config.baseUrl, termsText: config.stripe.termsText, submitText: config.stripe.submitText, clientIp, userAgent } });
      const session = await stripe.checkout.sessions.create(params);
      log.info(`checkout: session ${session.id} product=${product.id} visitor=${input.visitor_id || '-'}`);
      res.json({ url: session.url });
    } catch (err) {
      next(err);
    }
  });

  // --- Success page data (also fulfills when the webhook is late) ---
  app.get('/api/session/:id', rateLimit({ windowMs: 60000, max: 60 }), async (req, res, next) => {
    const id = req.params.id;
    const valid = config.mock ? /^mock_[A-Za-z0-9_-]{4,64}$/.test(id) : /^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id);
    if (!valid) return res.status(400).json({ paid: false, error: 'invalid session id' });
    try {
      const r = await fulfillment.fulfill(id);
      if (r.missing) return res.status(404).json({ paid: false, error: 'not found' });
      res.json(r);
    } catch (err) {
      if (err?.type === 'StripeInvalidRequestError' && err.statusCode === 404) return res.status(404).json({ paid: false, error: 'not found' });
      next(err);
    }
  });

  app.get('/sukces', (req, res) => res.sendFile(path.join(ROOT_DIR, 'public', 'sukces.html')));

  app.use(createAccessRouter({ db, config, log }));
  app.use(rateLimit({ windowMs: 60000, max: 300 }), createAnalyticsRouter({ db, config }));
  app.use('/admin', createAdminRouter({ db, config, fulfillment, log }));
  if (config.mock) app.use(createMockRouter({ config, store: mockStore, log }));

  app.use(express.static(path.join(ROOT_DIR, 'public'), {
    extensions: ['html'],
    setHeaders(res, filePath) {
      res.set('Cache-Control', filePath.endsWith('.html') ? 'no-cache' : (config.isProduction ? 'public, max-age=3600' : 'no-cache'));
    },
  }));

  // 404 + error handling (never leak stack traces)
  app.use((req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' });
    res.status(404).type('html').send('<!doctype html><html lang="pl"><meta charset="utf-8"><title>404</title><p>Nie znaleziono strony. <a href="/">Wróć na stronę główną</a></p>');
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err?.type === 'entity.parse.failed') return res.status(400).json({ error: 'invalid JSON' });
    if (err?.type === 'entity.too.large') return res.status(413).json({ error: 'payload too large' });
    log.error(`${req.method} ${req.originalUrl}: ${err?.stack || err}`);
    if (req.path.startsWith('/api/') || req.accepts(['html', 'json']) === 'json') return res.status(500).json({ error: 'Wystąpił błąd serwera. Spróbuj ponownie.' });
    res.status(500).type('html').send('<!doctype html><html lang="pl"><meta charset="utf-8"><title>Błąd</title><p>Wystąpił błąd serwera. Spróbuj ponownie za chwilę.</p>');
  });

  return { app, db, config, fulfillment, mailer, capi, mockStore };
}

export function main() {
  let config;
  try { config = loadConfig(); } catch (err) { log.error(err.message); process.exit(1); }
  const { app, db } = createApp({ config });
  const server = app.listen(config.port, () => log.info(`listening on :${config.port} base_url=${config.baseUrl} env=${process.env.NODE_ENV || 'development'} mock=${config.mock}`));

  let closing = false;
  const shutdown = (signal) => {
    if (closing) return;
    closing = true;
    log.info(`${signal} received, shutting down`);
    server.close(() => { try { db.close(); } catch {} process.exit(0); });
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', (err) => log.error(`unhandledRejection: ${err?.stack || err}`));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
