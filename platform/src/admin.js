// Admin dashboard: HTTP Basic Auth, funnel aggregation (per day / per utm_content), ad spend, orders, CSV export.
import crypto from 'node:crypto';
import express from 'express';
import { maskEmail } from './email.js';

// Day boundaries for reports follow Polish local time (events are stored in UTC).
const REPORT_TZ = 'Europe/Warsaw';

function tzOffsetMinutes(tz, date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(date);
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return Math.round((asUtc - date.getTime()) / 60000);
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pln = (grosze) => (Number(grosze || 0) / 100).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł';
const pct = (a, b) => (b > 0 ? ((100 * a) / b).toFixed(1) + '%' : '–');

/** Constant-time Basic Auth check. */
export function basicAuth({ user, pass }) {
  const expected = crypto.createHash('sha256').update(`${user}:${pass}`).digest();
  return (req, res, next) => {
    const header = req.get('authorization') || '';
    let ok = false;
    if (header.startsWith('Basic ')) {
      const given = crypto.createHash('sha256').update(Buffer.from(header.slice(6), 'base64').toString('utf8')).digest();
      ok = crypto.timingSafeEqual(given, expected);
    }
    if (ok) return next();
    res.set('WWW-Authenticate', 'Basic realm="admin", charset="UTF-8"');
    res.status(401).send('Wymagane logowanie');
  };
}

/** Same-origin guard for admin POST forms (browser sends Basic Auth automatically). */
function sameOrigin(req, res, next) {
  const origin = req.get('origin');
  if (req.get('sec-fetch-site') === 'cross-site') return res.status(403).send('Forbidden');
  if (origin && origin !== 'null') {
    try { if (new URL(origin).host !== req.get('host')) return res.status(403).send('Forbidden'); } catch { return res.status(403).send('Forbidden'); }
  }
  next();
}

const FUNNEL_COLS = `
  COUNT(DISTINCT CASE WHEN event = 'page_view' THEN visitor_id END)      AS visitors,
  COUNT(DISTINCT CASE WHEN event = 'cta_click' THEN visitor_id END)      AS cta_clicks,
  COUNT(DISTINCT CASE WHEN event = 'checkout_start' THEN visitor_id END) AS checkout_starts,
  SUM(CASE WHEN event = 'purchase' THEN 1 ELSE 0 END)                    AS purchases,
  SUM(CASE WHEN event = 'upsell_purchase' THEN 1 ELSE 0 END)             AS upsell_purchases,
  SUM(CASE WHEN event = 'purchase' THEN COALESCE(json_extract(props, '$.amount'), 0) ELSE 0 END) AS revenue`;

/** Report range: last `days` local days -> {fromIso, toIso, fromDay, toDay, modifier}. */
export function reportRange(days = 30, now = new Date()) {
  const offset = tzOffsetMinutes(REPORT_TZ, now);
  const localNow = new Date(now.getTime() + offset * 60000);
  const endLocal = Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate() + 1); // start of tomorrow (local)
  const startLocal = endLocal - days * 86400000;
  return {
    modifier: `${offset >= 0 ? '+' : '-'}${Math.abs(offset)} minutes`,
    fromIso: new Date(startLocal - offset * 60000).toISOString(),
    toIso: new Date(endLocal - offset * 60000).toISOString(),
    fromDay: new Date(startLocal).toISOString().slice(0, 10),
    toDay: new Date(endLocal - 1).toISOString().slice(0, 10),
  };
}

/** Funnel per local day, merged with ad spend. Rows sorted newest first. */
export function funnelByDay(db, range) {
  const rows = db.prepare(`SELECT date(ts, ?) AS day, ${FUNNEL_COLS} FROM events WHERE ts >= ? AND ts < ? GROUP BY day ORDER BY day DESC`)
    .all(range.modifier, range.fromIso, range.toIso);
  const spend = new Map(db.prepare('SELECT date, amount, note FROM spend WHERE date >= ? AND date <= ?').all(range.fromDay, range.toDay).map((s) => [s.date, s]));
  const byDay = new Map(rows.map((r) => [r.day, { ...r, spend: 0, spend_note: '' }]));
  for (const [date, s] of spend) {
    if (!byDay.has(date)) byDay.set(date, { day: date, visitors: 0, cta_clicks: 0, checkout_starts: 0, purchases: 0, upsell_purchases: 0, revenue: 0, spend: 0, spend_note: '' });
    byDay.get(date).spend = s.amount;
    byDay.get(date).spend_note = s.note || '';
  }
  return [...byDay.values()].sort((a, b) => (a.day < b.day ? 1 : -1)).map(withRates);
}

/** Funnel per utm_content (ad creative). */
export function funnelByUtmContent(db, range) {
  return db.prepare(`SELECT COALESCE(NULLIF(utm_content, ''), '(brak)') AS utm_content, ${FUNNEL_COLS}
                     FROM events WHERE ts >= ? AND ts < ? GROUP BY utm_content ORDER BY purchases DESC, visitors DESC`)
    .all(range.fromIso, range.toIso).map(withRates);
}

/** Totals for the range (funnel + spend). */
export function totals(db, range) {
  const t = db.prepare(`SELECT ${FUNNEL_COLS} FROM events WHERE ts >= ? AND ts < ?`).get(range.fromIso, range.toIso);
  const s = db.prepare('SELECT COALESCE(SUM(amount), 0) AS spend FROM spend WHERE date >= ? AND date <= ?').get(range.fromDay, range.toDay);
  return withRates({ ...t, spend: s.spend });
}

function withRates(r) {
  const out = { ...r };
  for (const k of ['visitors', 'cta_clicks', 'checkout_starts', 'purchases', 'upsell_purchases', 'revenue', 'spend']) out[k] = Number(r[k] || 0);
  out.cr_cta = out.visitors ? out.cta_clicks / out.visitors : null;
  out.cr_checkout = out.cta_clicks ? out.checkout_starts / out.cta_clicks : null;
  out.cr_purchase = out.checkout_starts ? out.purchases / out.checkout_starts : null;
  out.cr_total = out.visitors ? out.purchases / out.visitors : null;
  out.cpa = out.purchases && out.spend ? out.spend / out.purchases : null;        // grosze per purchase
  out.roas = out.spend ? out.revenue / out.spend : null;
  return out;
}

export function upsertSpend(db, { date, amount, note }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Data w formacie RRRR-MM-DD');
  const grosze = Math.round(Number(String(amount).replace(',', '.').replace(/\s/g, '')) * 100);
  if (!Number.isFinite(grosze) || grosze < 0) throw new Error('Kwota musi być liczbą >= 0');
  db.prepare(`INSERT INTO spend (date, amount, note, updated_at) VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
              ON CONFLICT(date) DO UPDATE SET amount = excluded.amount, note = excluded.note, updated_at = excluded.updated_at`).run(date, grosze, String(note || '').slice(0, 200));
}

export function lastOrders(db, limit = 50) {
  return db.prepare(`SELECT o.id, o.created_at, o.session_id, o.product_id, o.name, o.amount, o.email, f.email_sent_at, f.capi_sent_at, f.status
                     FROM orders o LEFT JOIN fulfillments f ON f.session_id = o.session_id ORDER BY o.id DESC LIMIT ?`).all(limit);
}

export function eventsCsv(db, range) {
  const cols = ['id', 'ts', 'visitor_id', 'event', 'props', 'url', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'user_agent', 'ip_hash'];
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = db.prepare(`SELECT ${cols.join(',')} FROM events WHERE ts >= ? AND ts < ? ORDER BY id`).all(range.fromIso, range.toIso);
  return [cols.join(','), ...rows.map((r) => cols.map((c) => q(r[c])).join(','))].join('\n') + '\n';
}

// ---------- rendering ----------

const CSS = `body{font:14px/1.45 system-ui,sans-serif;margin:0;padding:20px;background:#f6f7f9;color:#111}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:28px 0 8px}
.card{background:#fff;border:1px solid #e3e5e8;border-radius:10px;padding:14px 16px;margin-bottom:14px;overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:13px}
th,td{padding:6px 8px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap}th:first-child,td:first-child{text-align:left}th{background:#fafafa;font-weight:600}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.kpi{background:#fff;border:1px solid #e3e5e8;border-radius:10px;padding:10px 12px}.kpi b{display:block;font-size:20px}
.kpi span{color:#666;font-size:12px}form.inline{display:flex;gap:8px;flex-wrap:wrap;align-items:end}label{font-size:12px;color:#555;display:flex;flex-direction:column;gap:3px}
input{padding:6px 8px;border:1px solid #ccc;border-radius:6px;font:inherit}button{padding:7px 12px;border:0;border-radius:6px;background:#1a56db;color:#fff;font:inherit;cursor:pointer}
button.small{padding:3px 8px;font-size:12px;background:#555}.msg{background:#e7f7ec;border:1px solid #b7e2c3;padding:8px 12px;border-radius:8px;margin-bottom:12px}.err{background:#fdecec;border-color:#f3b8b8}
.muted{color:#777}nav a{margin-right:12px}`;

function kpi(label, value) { return `<div class="kpi"><b>${esc(value)}</b><span>${esc(label)}</span></div>`; }

function funnelTable(rows, firstCol, firstLabel, withSpend) {
  const head = `<tr><th>${esc(firstLabel)}</th><th>Odwiedz.</th><th>CTA</th><th>CR</th><th>Checkout</th><th>CR</th><th>Zakupy</th><th>CR</th><th>CR całk.</th><th>Upsell</th><th>Przychód</th>${withSpend ? '<th>Wydatki</th><th>CPA</th><th>ROAS</th>' : ''}</tr>`;
  const body = rows.map((r) => `<tr><td>${esc(r[firstCol])}${r.spend_note ? ` <span class="muted">(${esc(r.spend_note)})</span>` : ''}</td><td>${r.visitors}</td><td>${r.cta_clicks}</td><td>${pct(r.cta_clicks, r.visitors)}</td>
    <td>${r.checkout_starts}</td><td>${pct(r.checkout_starts, r.cta_clicks)}</td><td>${r.purchases}</td><td>${pct(r.purchases, r.checkout_starts)}</td><td>${pct(r.purchases, r.visitors)}</td>
    <td>${r.upsell_purchases}</td><td>${pln(r.revenue)}</td>${withSpend ? `<td>${pln(r.spend)}</td><td>${r.cpa == null ? '–' : pln(r.cpa)}</td><td>${r.roas == null ? '–' : r.roas.toFixed(2)}</td>` : ''}</tr>`).join('');
  return `<table>${head}${body || '<tr><td colspan="14" class="muted">Brak danych</td></tr>'}</table>`;
}

export function renderDashboard({ config, days, range, total, byDay, byUtm, orders, msg, err }) {
  const today = new Date(Date.now() + tzOffsetMinutes(REPORT_TZ) * 60000).toISOString().slice(0, 10);
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin – ${esc(config.siteName)}</title><style>${CSS}</style></head><body>
<h1>Panel – ${esc(config.siteName)} ${config.mock ? '<span class="muted">(TRYB TESTOWY – bez Stripe)</span>' : ''}</h1>
<nav class="muted">Zakres: ${[7, 14, 30, 90].map((d) => (d === days ? `<b>${d} dni</b>` : `<a href="/admin?days=${d}">${d} dni</a>`)).join(' · ')} · <a href="/admin/export.csv?days=${days}">Eksport zdarzeń CSV</a> · <a href="/">Strona</a></nav>
${msg ? `<p class="msg">${esc(msg)}</p>` : ''}${err ? `<p class="msg err">${esc(err)}</p>` : ''}
<h2>Podsumowanie (${esc(range.fromDay)} – ${esc(range.toDay)})</h2>
<div class="kpis">${kpi('Odwiedzający', total.visitors)}${kpi('Kliknięcia CTA', total.cta_clicks)}${kpi('Start checkoutu', total.checkout_starts)}${kpi('Zakupy', total.purchases)}${kpi('Upselle', total.upsell_purchases)}
${kpi('Przychód', pln(total.revenue))}${kpi('Wydatki na reklamę', pln(total.spend))}${kpi('CPA', total.cpa == null ? '–' : pln(total.cpa))}${kpi('ROAS', total.roas == null ? '–' : total.roas.toFixed(2))}${kpi('CR całkowity', pct(total.purchases, total.visitors))}</div>
<h2>Lejek dziennie</h2><div class="card">${funnelTable(byDay, 'day', 'Dzień', true)}</div>
<h2>Wydatki na reklamę</h2><div class="card"><form class="inline" method="post" action="/admin/spend?days=${days}">
<label>Data <input type="date" name="date" value="${today}" required></label><label>Kwota (PLN) <input type="text" name="amount" inputmode="decimal" placeholder="np. 35,50" required></label>
<label>Notatka <input type="text" name="note" placeholder="np. kampania A" maxlength="200"></label><button type="submit">Zapisz</button></form>
<p class="muted">Wpis dla istniejącej daty nadpisuje poprzednią kwotę.</p></div>
<h2>Lejek wg utm_content (kreacja)</h2><div class="card">${funnelTable(byUtm, 'utm_content', 'utm_content', false)}</div>
<h2>Ostatnie zamówienia (${orders.length})</h2><div class="card"><table><tr><th>#</th><th>Data (UTC)</th><th>Produkt</th><th>Kwota</th><th>E-mail</th><th>Sesja</th><th>E-mail wysłany</th><th>CAPI</th><th></th></tr>
${orders.map((o) => `<tr><td>${o.id}</td><td>${esc(o.created_at.slice(0, 16).replace('T', ' '))}</td><td>${esc(o.product_id)}</td><td>${pln(o.amount)}</td><td>${esc(maskEmail(o.email))}</td><td class="muted">${esc(o.session_id.slice(0, 18))}…</td>
<td>${o.email_sent_at ? 'tak' : '<b>nie</b>'}</td><td>${o.capi_sent_at ? 'tak' : 'nie'}</td><td><form method="post" action="/admin/resend/${o.id}?days=${days}" style="margin:0"><button class="small" type="submit">Wyślij e-mail ponownie</button></form></td></tr>`).join('') || '<tr><td colspan="9" class="muted">Brak zamówień</td></tr>'}
</table></div></body></html>`;
}

export function createAdminRouter({ db, config, fulfillment, log = console }) {
  const router = express.Router();
  router.use(basicAuth(config.admin));
  router.use(express.urlencoded({ extended: false, limit: '8kb' }));

  const parseDays = (q) => ([7, 14, 30, 90].includes(Number(q)) ? Number(q) : 30);

  router.get('/', (req, res) => {
    const days = parseDays(req.query.days);
    const range = reportRange(days);
    res.type('html').send(renderDashboard({
      config, days, range,
      total: totals(db, range), byDay: funnelByDay(db, range), byUtm: funnelByUtmContent(db, range), orders: lastOrders(db, 50),
      msg: typeof req.query.msg === 'string' ? req.query.msg.slice(0, 200) : '', err: typeof req.query.err === 'string' ? req.query.err.slice(0, 200) : '',
    }));
  });

  router.post('/spend', sameOrigin, (req, res) => {
    const days = parseDays(req.query.days);
    try {
      upsertSpend(db, req.body || {});
      res.redirect(303, `/admin?days=${days}&msg=${encodeURIComponent('Zapisano wydatki')}`);
    } catch (err) {
      res.redirect(303, `/admin?days=${days}&err=${encodeURIComponent(err.message)}`);
    }
  });

  router.post('/resend/:id', sameOrigin, async (req, res) => {
    const days = parseDays(req.query.days);
    const id = Number(req.params.id);
    try {
      if (!Number.isInteger(id)) throw new Error('Nieprawidłowy numer zamówienia');
      const r = await fulfillment.resendEmail(id);
      log.info?.(`admin: resent delivery e-mail for order ${id}`);
      res.redirect(303, `/admin?days=${days}&msg=${encodeURIComponent(`Wysłano ponownie do ${maskEmail(r.to)}`)}`);
    } catch (err) {
      res.redirect(303, `/admin?days=${days}&err=${encodeURIComponent('Nie udało się wysłać: ' + err.message)}`);
    }
  });

  router.get('/export.csv', (req, res) => {
    const range = reportRange(parseDays(req.query.days));
    res.set('Content-Disposition', `attachment; filename="events-${range.fromDay}-${range.toDay}.csv"`);
    res.type('text/csv').send('﻿' + eventsCsv(db, range));
  });

  return router;
}
