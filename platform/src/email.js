// Delivery e-mail rendering (emails/delivery.{html,txt}) and sending (Resend API or local outbox).
// The e-mail doubles as the confirmation of the contract on a durable medium (art. 21 UPK): order summary,
// consent to immediate delivery / loss of the withdrawal right (art. 38 ust. 1 pkt 13 UPK), complaints, seller data.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT_DIR } from './config.js';

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function fill(template, vars) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));
}

export const formatPln = (grosze) => (Number(grosze || 0) / 100).toFixed(2).replace('.', ',') + ' zł';

/** Zero-padded human order number derived from the first order row of the session. */
export const formatOrderId = (id) => (id ? String(id).padStart(6, '0') : '—');

/** "28.09.2026, godz. 14:05" in Polish local time (Europe/Warsaw). */
export function formatPlDateTime(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return String(iso);
  const date = new Intl.DateTimeFormat('pl-PL', { timeZone: 'Europe/Warsaw', day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
  const time = new Intl.DateTimeFormat('pl-PL', { timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(d);
  return `${date}, godz. ${time}`;
}

const PAYMENT_METHOD_LABELS = { card: 'karta płatnicza', blik: 'BLIK', p24: 'Przelewy24', link: 'Link (Stripe)' };
export const paymentMethodLabel = (type) => PAYMENT_METHOD_LABELS[type] || 'płatność online przez Stripe (karta, BLIK, Przelewy24 lub Link – według wyboru w formularzu)';

/**
 * Withdrawal-right block for the confirmation e-mail. Two variants:
 *  - consented: the buyer ticked the required Stripe consent (session.consent.terms_of_service === 'accepted') ->
 *    the right of withdrawal is lost on delivery; we document the consent and delivery timestamps (art. 21 ust. 2 UPK).
 *  - not consented / unknown: fail-safe statutory instruction (14 days, how to withdraw, refund rules) – art. 36 pkt 2 UPK risk accepted.
 */
export function withdrawalBlock({ consented, orderDate, contactEmail, baseUrl, orderId }) {
  const contact = contactEmail ? `e-mailem na ${contactEmail}` : 'e-mailem (adres w sekcji „Sprzedawca” poniżej)';
  if (consented) {
    const text =
      'PRAWO ODSTĄPIENIA OD UMOWY\n' +
      'Zgodnie z ustawą o prawach konsumenta konsument może odstąpić od umowy zawartej na odległość w terminie 14 dni. ' +
      `Składając zamówienie (${orderDate}) wyraziłeś/-aś wyraźną zgodę na dostarczenie treści cyfrowej przed upływem tego terminu ` +
      'i przyjąłeś/-ęłaś do wiadomości, że z chwilą dostarczenia treści tracisz prawo odstąpienia od umowy ' +
      '(art. 38 ust. 1 pkt 13 ustawy z dnia 30 maja 2014 r. o prawach konsumenta). ' +
      `Treść cyfrowa została dostarczona ${orderDate} wraz z tym e-mailem (link dostępowy powyżej). W związku z tym prawo odstąpienia nie przysługuje. ` +
      'Nie ogranicza to Twoich uprawnień z tytułu niezgodności treści cyfrowej z umową (reklamacja – patrz niżej) ani 14-dniowej gwarancji satysfakcji.';
    const html =
      '<tr><td style="padding:14px 0 6px;font-size:16px;font-weight:700">Prawo odstąpienia od umowy</td></tr>' +
      '<tr><td style="font-size:14px;line-height:1.55;background:#ede9fe;border-radius:10px;padding:12px 14px">' +
      'Zgodnie z ustawą o prawach konsumenta konsument może odstąpić od umowy zawartej na odległość w terminie 14 dni. ' +
      `<strong>Składając zamówienie (${escapeHtml(orderDate)}) wyraziłeś/-aś wyraźną zgodę na dostarczenie treści cyfrowej przed upływem tego terminu ` +
      'i przyjąłeś/-ęłaś do wiadomości, że z chwilą dostarczenia treści tracisz prawo odstąpienia od umowy</strong> ' +
      '(art. 38 ust. 1 pkt 13 ustawy z dnia 30 maja 2014 r. o prawach konsumenta). ' +
      `Treść cyfrowa została dostarczona ${escapeHtml(orderDate)} wraz z tym e-mailem (link dostępowy powyżej). <strong>W związku z tym prawo odstąpienia nie przysługuje.</strong> ` +
      'Nie ogranicza to Twoich uprawnień z tytułu niezgodności treści cyfrowej z umową (reklamacja – patrz niżej) ani 14-dniowej gwarancji satysfakcji.' +
      '</td></tr>';
    return { html, text };
  }
  const formUrl = `${baseUrl}/legal/regulamin.html#zal1`;
  const sample = `„Niniejszym informuję o odstąpieniu od umowy o dostarczanie treści cyfrowej (zamówienie nr ${orderId}, zawartej dnia ${orderDate}). Imię i nazwisko: …, adres e-mail użyty przy zakupie: …, data: ….”`;
  const text =
    'PRAWO ODSTĄPIENIA OD UMOWY\n' +
    `Masz prawo odstąpić od tej umowy w terminie 14 dni od dnia jej zawarcia (${orderDate}) bez podania przyczyny. ` +
    `Aby to zrobić, wyślij jednoznaczne oświadczenie – najprościej ${contact}. Możesz skorzystać ze wzoru formularza (Załącznik 1 do Regulaminu: ${formUrl}), ale nie jest to obowiązkowe. ` +
    'Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem. Zwrócimy wszystkie otrzymane od Ciebie płatności niezwłocznie, nie później niż w ciągu 14 dni od otrzymania oświadczenia, tym samym sposobem płatności. ' +
    `Przykładowa treść: ${sample}`;
  const html =
    '<tr><td style="padding:14px 0 6px;font-size:16px;font-weight:700">Prawo odstąpienia od umowy</td></tr>' +
    '<tr><td style="font-size:14px;line-height:1.55;background:#ede9fe;border-radius:10px;padding:12px 14px">' +
    `<strong>Masz prawo odstąpić od tej umowy w terminie 14 dni od dnia jej zawarcia (${escapeHtml(orderDate)}) bez podania przyczyny.</strong> ` +
    `Aby to zrobić, wyślij jednoznaczne oświadczenie – najprościej ${escapeHtml(contact)}. Możesz skorzystać ze <a href="${escapeHtml(formUrl)}" style="color:#6d28d9">wzoru formularza</a> (Załącznik 1 do Regulaminu), ale nie jest to obowiązkowe. ` +
    'Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem. Zwrócimy wszystkie otrzymane od Ciebie płatności niezwłocznie, nie później niż w ciągu 14 dni od otrzymania oświadczenia, tym samym sposobem płatności. ' +
    `Przykładowa treść: ${escapeHtml(sample)}` +
    '</td></tr>';
  return { html, text };
}

/**
 * Render the delivery e-mail.
 * @param items    [{product_id, name, amount, access_url}] – all purchased products; the first one is the primary button.
 * @param order    {id, created_at, amount_total, currency, consent_tos, payment_method} – from the fulfillments/orders tables (optional).
 * @param products config.products (used for product descriptions = "główne cechy świadczenia").
 * @param contactEmail seller contact address (EMAIL_REPLY_TO) used in the withdrawal instruction.
 */
export function renderDeliveryEmail({ name, items, siteName, baseUrl, order = {}, products = [], contactEmail = '', templatesDir = path.join(ROOT_DIR, 'emails') }) {
  const html = fs.readFileSync(path.join(templatesDir, 'delivery.html'), 'utf8');
  const text = fs.readFileSync(path.join(templatesDir, 'delivery.txt'), 'utf8');
  const firstName = (name || '').trim().split(/\s+/)[0] || '';
  const accessUrl = items[0]?.access_url || baseUrl;
  const orderId = formatOrderId(order.id);
  const orderDate = formatPlDateTime(order.created_at);
  const total = order.amount_total ?? items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
  const consented = order.consent_tos === 'accepted';
  const describe = (it) => products.find((p) => p.id === it.product_id)?.description || '';
  const withdrawal = withdrawalBlock({ consented, orderDate, contactEmail, baseUrl, orderId });

  const common = {
    site_name: siteName,
    base_url: baseUrl,
    year: String(new Date().getFullYear()),
    greeting: firstName ? `Cześć, ${firstName}!` : 'Cześć!',
    order_id: orderId,
    order_date: orderDate,
    consent_ts: orderDate,
    delivered_at: orderDate,
    amount: formatPln(total),
    payment_method: paymentMethodLabel(order.payment_method),
  };
  const htmlVars = {
    ...Object.fromEntries(Object.entries(common).map(([k, v]) => [k, escapeHtml(v)])),
    name: escapeHtml(firstName),
    access_url: escapeHtml(accessUrl),
    items: items.map((it) => `<li style="margin:0 0 10px"><a href="${escapeHtml(it.access_url)}" style="color:#6d28d9;font-weight:600">${escapeHtml(it.name)}</a><br><span style="font-size:13px;color:#555">${escapeHtml(it.access_url)}</span></li>`).join(''),
    items_table: items.map((it) => {
      const desc = describe(it);
      return `<tr><td style="padding:6px 8px 6px 0;border-bottom:1px solid #e2e8f0"><strong>${escapeHtml(it.name)}</strong>${desc ? `<br><span style="color:#475569">${escapeHtml(desc)}</span>` : ''}</td>` +
        `<td style="padding:6px 0;border-bottom:1px solid #e2e8f0;text-align:right;white-space:nowrap">${it.amount !== undefined ? formatPln(it.amount) : ''}</td></tr>`;
    }).join(''),
    withdrawal_block: withdrawal.html,
  };
  const textVars = {
    ...common,
    name: firstName,
    access_url: accessUrl,
    items: items.map((it) => `- ${it.name}: ${it.access_url}`).join('\n'),
    items_table: items.map((it) => {
      const desc = describe(it);
      return `- ${it.name}${it.amount !== undefined ? ` – ${formatPln(it.amount)}` : ''}${desc ? `\n  ${desc}` : ''}`;
    }).join('\n'),
    withdrawal_block: withdrawal.text,
  };
  return {
    subject: `Twój dostęp: ${items.map((i) => i.name).join(' + ')} – potwierdzenie zamówienia nr ${orderId} (${siteName})`,
    html: fill(html, htmlVars),
    text: fill(text, textVars),
  };
}

/**
 * Mailer: Resend when RESEND_API_KEY is set, otherwise files in data/outbox (dev/test).
 */
export function createMailer({ resendApiKey, from, replyTo, outboxDir, log = console, fetchImpl = fetch }) {
  const provider = resendApiKey ? 'resend' : 'outbox';
  async function send({ to, subject, html, text }) {
    if (provider === 'resend') {
      const res = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
      });
      const body = await res.text();
      if (!res.ok) throw new Error(`Resend error ${res.status}: ${body.slice(0, 300)}`);
      log.info?.(`email sent provider=resend to=${maskEmail(to)} id=${safeJson(body)?.id || '?'}`);
      return { provider, id: safeJson(body)?.id };
    }
    fs.mkdirSync(outboxDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const base = path.join(outboxDir, `${stamp}-${Math.random().toString(36).slice(2, 6)}`);
    fs.writeFileSync(`${base}.html`, `<!-- to: ${to}\n     subject: ${subject} -->\n${html}`);
    fs.writeFileSync(`${base}.txt`, `To: ${to}\nSubject: ${subject}\n\n${text}`);
    log.info?.(`email written to outbox (no RESEND_API_KEY) to=${maskEmail(to)} file=${base}.html`);
    return { provider, file: `${base}.html` };
  }
  return { provider, send };
}

function safeJson(s) { try { return JSON.parse(s); } catch { return null; } }

/** a***@domain.pl */
export function maskEmail(email) {
  if (!email || !email.includes('@')) return '***';
  const [user, domain] = email.split('@');
  return `${user.slice(0, 1)}***@${domain}`;
}
