// Central configuration: environment variables + config/products.json.
// loadConfig(env) is a pure function so tests can pass their own env object.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Default Polish consent text shown in Stripe Checkout (required, unchecked checkbox): acceptance of the terms and
// privacy policy + explicit request/consent for immediate delivery + acknowledgement of losing the 14-day withdrawal
// right (art. 38 ust. 1 pkt 13 ustawy o prawach konsumenta), ending with the voluntary money-back guarantee so the last
// thing before "Zapłać" is not only the loss of a right. Final wording and rationale: legal/01-teksty.md.
// Stripe renders Markdown links and allows up to 1200 characters; this text is ~460 so it stays readable on a phone.
// {BASE_URL} and {SITE_NAME} are substituted in loadConfig().
export const DEFAULT_TERMS_TEXT =
  'Akceptuję [Regulamin]({BASE_URL}/legal/regulamin.html) i [Politykę prywatności]({BASE_URL}/legal/polityka-prywatnosci.html). ' +
  'Żądam dostarczenia treści cyfrowej od razu po zapłacie, wyrażam na to wyraźną zgodę i przyjmuję do wiadomości, ' +
  'że z chwilą dostarczenia tracę ustawowe prawo odstąpienia od umowy w terminie 14 dni (art. 38 ust. 1 pkt 13 ustawy o prawach konsumenta). ' +
  'Niezależnie od tego przysługuje mi 14-dniowa gwarancja zwrotu {SITE_NAME} opisana w Regulaminie.';

// Default text above the pay button (pre-contractual information about immediate delivery, art. 12 ust. 1 pkt 12 UPK).
export const DEFAULT_SUBMIT_TEXT = 'Dostęp wyślemy od razu na e-mail. 14 dni gwarancji zwrotu.';

const PRODUCT_ID_RE = /^[a-z0-9_-]{1,32}$/;

/** Validate and normalise the products array from products.json (or a test fixture). */
export function normalizeProducts(list) {
  if (!Array.isArray(list) || list.length === 0) throw new Error('products.json: expected a non-empty array');
  const ids = new Set();
  const products = list.map((p) => {
    if (!PRODUCT_ID_RE.test(p.id || '')) throw new Error(`products.json: invalid id "${p.id}" (use a-z 0-9 _ -)`);
    if (ids.has(p.id)) throw new Error(`products.json: duplicate id "${p.id}"`);
    ids.add(p.id);
    if (!Number.isInteger(p.price_pln) || p.price_pln < 200) throw new Error(`products.json: price_pln for "${p.id}" must be an integer in grosze (>= 200)`);
    if (!['main', 'upsell'].includes(p.type)) throw new Error(`products.json: type for "${p.id}" must be "main" or "upsell"`);
    let accessPath = String(p.access_path || '').trim();
    if (!accessPath.startsWith('/')) accessPath = '/' + accessPath;
    if (!accessPath.endsWith('/')) accessPath += '/';
    return {
      id: p.id,
      name: String(p.name || p.id),
      description: String(p.description || ''),
      price_pln: p.price_pln,
      stripe_price_id: String(p.stripe_price_id || '').trim(),
      type: p.type,
      access_path: accessPath,
    };
  });
  if (!products.some((p) => p.type === 'main')) throw new Error('products.json: at least one product of type "main" is required');
  return products;
}

export function loadProductsFile(file = path.join(ROOT_DIR, 'config', 'products.json')) {
  return normalizeProducts(JSON.parse(fs.readFileSync(file, 'utf8')));
}

function bool(v, dflt) {
  if (v === undefined || v === '') return dflt;
  return !['0', 'false', 'no', 'off'].includes(String(v).toLowerCase());
}

/**
 * Build the runtime config from an env-like object.
 * Throws on unsafe production setups (missing admin credentials or Stripe key).
 */
export function loadConfig(env = process.env, { products } = {}) {
  const isProduction = env.NODE_ENV === 'production';
  const baseUrl = String(env.BASE_URL || `http://localhost:${env.PORT || 3000}`).replace(/\/+$/, '');
  const siteName = env.SITE_NAME || 'Sklep';
  const stripeKey = String(env.STRIPE_SECRET_KEY || '').trim();
  const mockForced = bool(env.MOCK_MODE, false);
  const mock = mockForced || !stripeKey;

  if (isProduction) {
    if (!env.ADMIN_USER || !env.ADMIN_PASS) throw new Error('Refusing to start: ADMIN_USER and ADMIN_PASS are required in production');
    if (String(env.ADMIN_PASS).length < 10) throw new Error('Refusing to start: ADMIN_PASS must be at least 10 characters');
    if (mock && !mockForced) throw new Error('Refusing to start: STRIPE_SECRET_KEY is missing in production (set MOCK_MODE=1 to run the test checkout on purpose)');
  }

  return {
    isProduction,
    port: Number(env.PORT || 3000),
    baseUrl,
    siteName,
    dataDir: path.resolve(env.DATA_DIR || path.join(ROOT_DIR, 'data')),
    trustProxy: env.TRUST_PROXY === undefined || env.TRUST_PROXY === '' ? 1 : (/^\d+$/.test(env.TRUST_PROXY) ? Number(env.TRUST_PROXY) : bool(env.TRUST_PROXY, true)),
    mock,
    stripe: {
      secretKey: stripeKey,
      webhookSecret: String(env.STRIPE_WEBHOOK_SECRET || '').trim(),
      termsText: (env.CHECKOUT_TERMS_TEXT || DEFAULT_TERMS_TEXT).replaceAll('{BASE_URL}', baseUrl).replaceAll('{SITE_NAME}', siteName),
      submitText: (env.CHECKOUT_SUBMIT_TEXT || DEFAULT_SUBMIT_TEXT).replaceAll('{SITE_NAME}', siteName),
    },
    email: {
      resendApiKey: String(env.RESEND_API_KEY || '').trim(),
      from: env.EMAIL_FROM || `${env.SITE_NAME || 'Sklep'} <onboarding@resend.dev>`,
      replyTo: env.EMAIL_REPLY_TO || '',
    },
    meta: {
      pixelId: String(env.META_PIXEL_ID || '').trim(),
      capiToken: String(env.META_CAPI_TOKEN || '').trim(),
      testEventCode: String(env.META_TEST_EVENT_CODE || '').trim(),
    },
    admin: { user: env.ADMIN_USER || '', pass: env.ADMIN_PASS || '' },
    ipHashSalt: env.IP_HASH_SALT || 'change-me',
    products: products || loadProductsFile(),
  };
}
