// First-party analytics: validation + storage of funnel events, and the /api/events route.
import crypto from 'node:crypto';
import express from 'express';

const EVENT_RE = /^[a-z0-9_]{1,40}$/;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const str = (v, max) => (typeof v === 'string' && v.length > 0 ? v.slice(0, max) : null);

/** Validate a raw event payload. Returns {ok, error} or {ok, value}. */
export function validateEvent(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false, error: 'expected a JSON object' };
  if (typeof body.event !== 'string' || !EVENT_RE.test(body.event)) return { ok: false, error: 'invalid event name' };
  if (body.visitor_id !== undefined && body.visitor_id !== null && (typeof body.visitor_id !== 'string' || body.visitor_id.length > 64)) {
    return { ok: false, error: 'invalid visitor_id' };
  }
  let props = null;
  if (body.props !== undefined && body.props !== null) {
    if (typeof body.props !== 'object' || Array.isArray(body.props)) return { ok: false, error: 'props must be an object' };
    props = JSON.stringify(body.props);
    if (props.length > 4096) return { ok: false, error: 'props too large' };
  }
  const value = {
    visitor_id: str(body.visitor_id, 64),
    event: body.event,
    props,
    url: str(body.url, 2048),
    referrer: str(body.referrer, 2048),
  };
  for (const k of UTM_KEYS) value[k] = str(body[k], 200);
  return { ok: true, value };
}

export function hashIp(ip, salt) {
  if (!ip) return null;
  return crypto.createHash('sha256').update(`${salt}|${ip}`).digest('hex').slice(0, 16);
}

/** Insert one validated event. `extra` = {user_agent, ip_hash, ts?}. */
export function recordEvent(db, value, extra = {}) {
  const cols = ['visitor_id', 'event', 'props', 'url', 'referrer', ...UTM_KEYS, 'user_agent', 'ip_hash'];
  const vals = cols.map((c) => (c in extra ? extra[c] : value[c]) ?? null);
  if (extra.ts) {
    cols.push('ts');
    vals.push(extra.ts);
  }
  return db.prepare(`INSERT INTO events (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`).run(...vals);
}

export function createAnalyticsRouter({ db, config }) {
  const router = express.Router();
  // sendBeacon may post text/plain; accept both.
  router.post('/api/events', express.json({ limit: '16kb', type: ['application/json', 'text/plain'] }), (req, res) => {
    const result = validateEvent(req.body);
    if (!result.ok) return res.status(400).json({ error: result.error });
    recordEvent(db, result.value, {
      user_agent: str(req.get('user-agent'), 300),
      ip_hash: hashIp(req.ip, config.ipHashSalt),
    });
    res.status(204).end();
  });
  return router;
}
