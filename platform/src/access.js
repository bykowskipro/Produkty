// Access tokens, protected product paths, progress sync.
import crypto from 'node:crypto';
import express from 'express';
import { nowIso } from './db.js';

const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/; // 32 random bytes in base64url
const MAX_PROGRESS_BYTES = 32 * 1024;
const COOKIE_MAX_AGE = 365 * 24 * 3600; // 1 year, seconds

export function createToken() {
  return crypto.randomBytes(32).toString('base64url');
}

/** Insert a token for an order. Returns the token string. */
export function issueToken(db, { orderId, productId, email }) {
  const token = createToken();
  db.prepare('INSERT INTO access_tokens (token, order_id, product_id, email) VALUES (?, ?, ?, ?)').run(token, orderId, productId, email || null);
  return token;
}

/** Return the token row (token, product_id, email, order_id) or null when unknown/revoked/malformed. */
export function verifyToken(db, token) {
  if (typeof token !== 'string' || !TOKEN_RE.test(token)) return null;
  const row = db.prepare('SELECT token, order_id, product_id, email FROM access_tokens WHERE token = ? AND revoked = 0').get(token);
  if (!row) return null;
  db.prepare('UPDATE access_tokens SET last_used_at = ? WHERE token = ?').run(nowIso(), token);
  return row;
}

/** All product ids owned by the same buyer (matched by e-mail, falling back to the token's own product). */
export function productsOwned(db, tokenRow) {
  if (!tokenRow) return [];
  if (!tokenRow.email) return [tokenRow.product_id];
  return db.prepare('SELECT DISTINCT product_id FROM orders WHERE email = ? ORDER BY product_id').all(tokenRow.email).map((r) => r.product_id);
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    if (!k) continue;
    try { out[k] = decodeURIComponent(part.slice(i + 1).trim()); } catch { out[k] = part.slice(i + 1).trim(); }
  }
  return out;
}

export const cookieName = (productId) => `access_${productId}`;

function setAccessCookie(res, productId, token, secure) {
  res.append('Set-Cookie', `${cookieName(productId)}=${token}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`);
}

/** Token from X-Access-Token header, `t` query param or any valid access_* cookie. */
export function tokenFromRequest(db, req) {
  const header = req.get('x-access-token');
  if (header) return verifyToken(db, header);
  if (typeof req.query.t === 'string') {
    const row = verifyToken(db, req.query.t);
    if (row) return row;
  }
  const cookies = parseCookies(req.headers.cookie);
  for (const [name, value] of Object.entries(cookies)) {
    if (!name.startsWith('access_')) continue;
    const row = verifyToken(db, value);
    if (row) return row;
  }
  return null;
}

/**
 * Router + middleware for access:
 *  GET /d/:token                -> set cookie, redirect to the product's access_path?t=token
 *  <access_path>/**             -> allowed with valid cookie or ?t=token, else redirect /?locked=1
 *  GET /api/access/verify       -> {ok, product_id, products_owned}
 *  GET/PUT /api/progress        -> per-token JSON blob (<= 32 KB)
 */
export function createAccessRouter({ db, config, log = console }) {
  const router = express.Router();
  const secure = config.isProduction;
  // Longest access_path first so "/app/bonus/" wins over "/app/".
  const protectedProducts = [...config.products].sort((a, b) => b.access_path.length - a.access_path.length);

  router.get('/d/:token', (req, res) => {
    const row = verifyToken(db, req.params.token);
    if (!row) return res.redirect(302, '/?locked=1');
    const product = config.products.find((p) => p.id === row.product_id);
    if (!product) return res.redirect(302, '/?locked=1');
    setAccessCookie(res, product.id, row.token, secure);
    res.redirect(302, `${product.access_path}?t=${encodeURIComponent(row.token)}`);
  });

  // Protect product areas (must be mounted before express.static).
  router.use((req, res, next) => {
    let p;
    try { p = decodeURIComponent(req.path); } catch { return res.status(400).send('Bad request'); }
    p = p.replace(/\/{2,}/g, '/');
    const product = protectedProducts.find((pr) => p.startsWith(pr.access_path) || p === pr.access_path.slice(0, -1));
    if (!product) return next();

    const cookies = parseCookies(req.headers.cookie);
    const fromCookie = verifyToken(db, cookies[cookieName(product.id)]);
    if (fromCookie && fromCookie.product_id === product.id) return next();

    const fromQuery = typeof req.query.t === 'string' ? verifyToken(db, req.query.t) : null;
    if (fromQuery && fromQuery.product_id === product.id) {
      setAccessCookie(res, product.id, fromQuery.token, secure);
      return next();
    }
    log.info?.(`access denied path=${p}`);
    res.redirect(302, '/?locked=1');
  });

  router.get('/api/access/verify', (req, res) => {
    const row = verifyToken(db, req.query.token) || tokenFromRequest(db, req);
    if (!row) return res.status(401).json({ ok: false });
    res.json({ ok: true, product_id: row.product_id, products_owned: productsOwned(db, row) });
  });

  router.get('/api/progress', (req, res) => {
    const row = tokenFromRequest(db, req);
    if (!row) return res.status(401).json({ error: 'unauthorized' });
    const rec = db.prepare('SELECT data, updated_at FROM progress WHERE token = ?').get(row.token);
    res.json({ progress: rec ? JSON.parse(rec.data) : null, updated_at: rec?.updated_at || null });
  });

  router.put('/api/progress', (req, res) => {
    const row = tokenFromRequest(db, req);
    if (!row) return res.status(401).json({ error: 'unauthorized' });
    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'expected a JSON object' });
    const data = JSON.stringify(body.progress !== undefined ? body.progress : body);
    if (Buffer.byteLength(data) > MAX_PROGRESS_BYTES) return res.status(413).json({ error: 'progress too large (max 32 KB)' });
    const updatedAt = nowIso();
    db.prepare('INSERT INTO progress (token, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(token) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at').run(row.token, data, updatedAt);
    res.json({ ok: true, updated_at: updatedAt });
  });

  return router;
}
