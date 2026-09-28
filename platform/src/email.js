// Delivery e-mail rendering (emails/delivery.{html,txt}) and sending (Resend API or local outbox).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT_DIR } from './config.js';

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function fill(template, vars) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));
}

/**
 * Render the delivery e-mail.
 * @param items [{name, access_url}] - all purchased products; the first one is the primary button.
 */
export function renderDeliveryEmail({ name, items, siteName, baseUrl, templatesDir = path.join(ROOT_DIR, 'emails') }) {
  const html = fs.readFileSync(path.join(templatesDir, 'delivery.html'), 'utf8');
  const text = fs.readFileSync(path.join(templatesDir, 'delivery.txt'), 'utf8');
  const firstName = (name || '').trim().split(/\s+/)[0] || '';
  const accessUrl = items[0]?.access_url || baseUrl;
  const common = {
    site_name: siteName,
    base_url: baseUrl,
    year: String(new Date().getFullYear()),
    greeting: firstName ? `Cześć, ${firstName}!` : 'Cześć!',
  };
  const htmlVars = {
    ...Object.fromEntries(Object.entries(common).map(([k, v]) => [k, escapeHtml(v)])),
    name: escapeHtml(firstName),
    access_url: escapeHtml(accessUrl),
    items: items.map((it) => `<li style="margin:0 0 10px"><a href="${escapeHtml(it.access_url)}" style="color:#1a56db;font-weight:600">${escapeHtml(it.name)}</a><br><span style="font-size:13px;color:#555">${escapeHtml(it.access_url)}</span></li>`).join(''),
  };
  const textVars = { ...common, name: firstName, access_url: accessUrl, items: items.map((it) => `- ${it.name}: ${it.access_url}`).join('\n') };
  return {
    subject: `Twój dostęp: ${items.map((i) => i.name).join(' + ')} – ${siteName}`,
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
