// Idempotent order fulfillment shared by the Stripe webhook and the success page.
// fulfill(sessionId): session -> orders + access tokens -> ONE e-mail -> CAPI Purchase -> analytics events.
import { transaction, nowIso } from './db.js';
import { issueToken } from './access.js';
import { recordEvent } from './analytics.js';
import { renderDeliveryEmail } from './email.js';
import { retrieveSession } from './stripe.js';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/** Map a Stripe line item to a configured product (by price id, then price/product metadata, then name). */
export function matchProduct(products, item) {
  const price = item.price || {};
  const prod = typeof price.product === 'object' && price.product ? price.product : {};
  return (
    products.find((p) => p.stripe_price_id && p.stripe_price_id === price.id) ||
    products.find((p) => p.id === prod.metadata?.product_id) ||
    products.find((p) => p.id === price.metadata?.product_id) ||
    products.find((p) => p.name === prod.name) ||
    null
  );
}

export function createFulfillment({ db, config, stripe, mockStore, mailer, capi, log = console }) {
  const accessUrl = (token) => `${config.baseUrl}/d/${token}`;

  async function loadSession(sessionId) {
    if (sessionId.startsWith('mock_')) return mockStore?.get(sessionId) || null;
    if (!stripe) throw new Error('Stripe is not configured');
    return retrieveSession(stripe, sessionId);
  }

  /** Items + tokens already stored for a session (used for idempotent replies). */
  function storedItems(sessionId) {
    return db.prepare(`SELECT o.id AS order_id, o.product_id, o.name, o.amount, t.token
                       FROM orders o JOIN access_tokens t ON t.order_id = o.id
                       WHERE o.session_id = ? ORDER BY o.id`).all(sessionId)
      .map((r) => ({ order_id: r.order_id, product_id: r.product_id, name: r.name, amount: r.amount, access_url: accessUrl(r.token) }));
  }

  function buildResult(session, items) {
    return {
      paid: true,
      session_id: session.id,
      email: session.customer_details?.email || null,
      event_id: session.metadata?.event_id || null,
      value: (session.amount_total || 0) / 100,
      currency: (session.currency || 'pln').toUpperCase(),
      items: items.map(({ product_id, name, access_url }) => ({ product_id, name, access_url })),
    };
  }

  /**
   * Synchronous, transactional part: fulfillment row (acts as the lock), orders, tokens, analytics events.
   * Safe to call any number of times; returns true when this call created the orders.
   */
  function persistOrders(session, lines) {
    return transaction(db, () => {
      const email = session.customer_details?.email || null;
      const md = session.metadata || {};
      const inserted = db.prepare(`INSERT INTO fulfillments (session_id, status, email, amount_total, currency, metadata)
                                   VALUES (?, 'processing', ?, ?, ?, ?) ON CONFLICT(session_id) DO NOTHING`)
        .run(session.id, email, session.amount_total || 0, session.currency || 'pln', JSON.stringify(md));
      let created = false;
      for (const line of lines) {
        const r = db.prepare(`INSERT INTO orders (session_id, product_id, name, amount, currency, quantity, email)
                              VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(session_id, product_id) DO NOTHING`)
          .run(session.id, line.product.id, line.product.name, line.amount, session.currency || 'pln', line.quantity, email);
        if (r.changes === 0) continue;
        created = true;
        issueToken(db, { orderId: Number(r.lastInsertRowid), productId: line.product.id, email });
        if (line.product.type === 'upsell') {
          recordEvent(db, eventBase(session, md), { event: 'upsell_purchase', props: JSON.stringify({ session_id: session.id, product_id: line.product.id, amount: line.amount, value: line.amount / 100, currency: 'PLN' }) });
        }
      }
      if (inserted.changes > 0) {
        recordEvent(db, eventBase(session, md), {
          event: 'purchase',
          props: JSON.stringify({ session_id: session.id, amount: session.amount_total || 0, value: (session.amount_total || 0) / 100, currency: 'PLN', product_ids: lines.map((l) => l.product.id), event_id: md.event_id || null }),
        });
      }
      return created;
    });
  }

  function eventBase(session, md) {
    const base = { visitor_id: md.visitor_id || session.client_reference_id || null, url: md.landing_url || null, referrer: null, user_agent: md.user_agent || null, ip_hash: null };
    for (const k of UTM_KEYS) base[k] = md[k] || null;
    return base;
  }

  /** Claim a one-shot side effect (email / capi) atomically; returns true when this call owns it. */
  function claim(sessionId, column) {
    return db.prepare(`UPDATE fulfillments SET ${column} = ?, updated_at = ? WHERE session_id = ? AND ${column} IS NULL`).run(nowIso(), nowIso(), sessionId).changes === 1;
  }
  function release(sessionId, column, err) {
    db.prepare(`UPDATE fulfillments SET ${column} = NULL, error = ?, updated_at = ? WHERE session_id = ?`).run(String(err?.message || err).slice(0, 500), nowIso(), sessionId);
  }

  async function sendEmail(session, items) {
    const to = session.customer_details?.email;
    if (!to) { log.warn?.(`fulfill ${session.id}: no customer e-mail, skipping delivery mail`); return; }
    const msg = renderDeliveryEmail({ name: session.customer_details?.name, items, siteName: config.siteName, baseUrl: config.baseUrl });
    await mailer.send({ to, ...msg });
  }

  async function sendCapi(session, items) {
    const md = session.metadata || {};
    await capi.sendPurchase({
      email: session.customer_details?.email,
      eventId: md.event_id,
      eventTime: Math.floor(Date.now() / 1000), // payment confirmation time (close to the browser Purchase event)
      sourceUrl: md.landing_url,
      clientIp: md.client_ip,
      userAgent: md.user_agent,
      fbp: md.fbp,
      fbc: md.fbc,
      value: (session.amount_total || 0) / 100,
      currency: (session.currency || 'pln').toUpperCase(),
      contents: items.map((i) => ({ id: i.product_id, quantity: 1, item_price: i.amount / 100 })),
    });
  }

  /** Main entry point. Returns {paid:false} or {paid:true, email, event_id, value, currency, items}. */
  async function fulfill(sessionId) {
    const session = await loadSession(sessionId);
    if (!session) return { paid: false, missing: true };
    if (session.payment_status !== 'paid') return { paid: false, payment_status: session.payment_status };

    const lines = [];
    for (const item of session.line_items?.data || []) {
      const product = matchProduct(config.products, item);
      if (!product) { log.warn?.(`fulfill ${session.id}: unknown line item "${item.description || item.price?.id}"`); continue; }
      lines.push({ product, quantity: item.quantity || 1, amount: item.amount_total ?? (item.price?.unit_amount || 0) * (item.quantity || 1) });
    }
    if (!lines.length) throw new Error(`fulfill ${session.id}: no recognised products in session`);

    const created = persistOrders(session, lines);
    const items = storedItems(session.id);
    if (created) log.info?.(`fulfill ${session.id}: orders created products=${items.map((i) => i.product_id).join(',')} total=${session.amount_total}`);

    // One-shot side effects, each claimed atomically so concurrent webhook + success-page calls never double-send.
    if (claim(session.id, 'email_sent_at')) {
      try { await sendEmail(session, items); } catch (err) { release(session.id, 'email_sent_at', err); log.error?.(`fulfill ${session.id}: email failed: ${err.message}`); }
    }
    if (claim(session.id, 'capi_sent_at')) {
      try { await sendCapi(session, items); } catch (err) { release(session.id, 'capi_sent_at', err); log.error?.(`fulfill ${session.id}: capi failed: ${err.message}`); }
    }
    db.prepare(`UPDATE fulfillments SET status = 'done', updated_at = ? WHERE session_id = ?`).run(nowIso(), session.id);
    return buildResult(session, items);
  }

  /** Re-send the delivery e-mail for the session of a given order (admin action). */
  async function resendEmail(orderId) {
    const order = db.prepare('SELECT session_id, email FROM orders WHERE id = ?').get(orderId);
    if (!order) throw new Error('order not found');
    if (!order.email) throw new Error('order has no e-mail');
    const items = storedItems(order.session_id);
    const msg = renderDeliveryEmail({ name: '', items, siteName: config.siteName, baseUrl: config.baseUrl });
    await mailer.send({ to: order.email, ...msg });
    db.prepare('UPDATE fulfillments SET email_sent_at = ?, updated_at = ? WHERE session_id = ?').run(nowIso(), nowIso(), order.session_id);
    return { to: order.email, items: items.length };
  }

  return { fulfill, resendEmail, storedItems };
}
