// Meta Conversions API (server-side Purchase event, deduplicated with the browser pixel via event_id).
import crypto from 'node:crypto';

const GRAPH_URL = 'https://graph.facebook.com/v21.0';

export const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
export const normalizeEmail = (email) => (email || '').trim().toLowerCase();

export function createCapi({ pixelId, token, testEventCode, log = console, fetchImpl = fetch }) {
  const enabled = Boolean(pixelId && token);
  if (!enabled) log.info?.('meta-capi: disabled (set META_PIXEL_ID and META_CAPI_TOKEN to enable)');

  /** Build the payload (exported for tests). */
  function buildPurchasePayload(p) {
    const userData = { client_ip_address: p.clientIp || undefined, client_user_agent: p.userAgent || undefined, fbp: p.fbp || undefined, fbc: p.fbc || undefined };
    if (p.email) userData.em = [sha256(normalizeEmail(p.email))];
    for (const k of Object.keys(userData)) if (userData[k] === undefined) delete userData[k];
    const event = {
      event_name: 'Purchase',
      event_time: p.eventTime || Math.floor(Date.now() / 1000),
      event_id: p.eventId || undefined,
      action_source: 'website',
      event_source_url: p.sourceUrl || undefined,
      user_data: userData,
      custom_data: {
        currency: p.currency || 'PLN',
        value: p.value,
        content_type: 'product',
        content_ids: p.contents.map((c) => c.id),
        contents: p.contents.map((c) => ({ id: c.id, quantity: c.quantity || 1, item_price: c.item_price })),
        num_items: p.contents.length,
      },
    };
    return { data: [event], ...(testEventCode ? { test_event_code: testEventCode } : {}) };
  }

  async function sendPurchase(p) {
    if (!enabled) {
      log.info?.(`meta-capi: skipped Purchase event_id=${p.eventId || '-'} (not configured)`);
      return { ok: false, skipped: true };
    }
    const payload = buildPurchasePayload(p);
    const res = await fetchImpl(`${GRAPH_URL}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    if (!res.ok) throw new Error(`meta-capi error ${res.status}: ${body.slice(0, 300)}`);
    log.info?.(`meta-capi: Purchase sent event_id=${p.eventId || '-'} value=${p.value}`);
    return { ok: true, response: body };
  }

  return { enabled, sendPurchase, buildPurchasePayload };
}
