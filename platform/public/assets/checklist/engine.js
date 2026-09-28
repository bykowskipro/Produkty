/* Odhacz – generic checklist engine (vanilla JS, no build step).
 * Renders any content JSON in the Odhacz schema (meta, quick_start, phases/sections/items, seller_call_script,
 * summary_rules, contract_template, deadlines, glossary, sources) as a mobile-first tool with per-car state,
 * red-flag counter, negotiation list, print/PDF, .ics deadlines, local photos (IndexedDB) and cross-device
 * progress sync via window.Access (platform contract, README §b).
 *
 * Usage: Checklist.mount({ root:'#app', content:'/app/content/auto.json', product:'auto', kind:'main', sw:'/app/sw.js', shopUrl:'/' })
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ utils */
  const $ = (sel, root) => (root || document).querySelector(sel);
  function el(tag, props) {
    const e = document.createElement(tag);
    if (props) for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'style') e.style.cssText = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (let i = 2; i < arguments.length; i++) append(e, arguments[i]);
    return e;
  }
  function append(parent, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach((k) => append(parent, k)); return; }
    parent.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nowIso = () => new Date().toISOString();
  const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
  const pad = (n) => (n < 10 ? '0' : '') + n;
  const isoDate = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const todayStr = () => isoDate(new Date());
  function parseDate(s) { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function addDays(s, n) { const d = parseDate(s) || new Date(); d.setDate(d.getDate() + (n | 0)); return isoDate(d); }
  function daysBetween(a, b) { const da = parseDate(a), db = parseDate(b); return Math.round((db - da) / 86400000); }
  function fmtPl(s, opts) { const d = parseDate(s); if (!d) return ''; try { return d.toLocaleDateString('pl-PL', opts || { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return s; } }
  function fmtTime(iso) { try { return new Date(iso).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
  function plural(n, one, few, many) { n = Math.abs(n | 0); if (n === 1) return one; const m10 = n % 10, m100 = n % 100; if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few; return many; }
  function download(name, mime, text) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: name }); document.body.append(a); a.click();
    setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 1500);
  }
  function track(name, props) { try { if (typeof window.track === 'function') window.track(name, props || {}); } catch (e) { /* ignore */ } }
  function readFileText(file) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = () => rej(r.error); r.readAsText(file); }); }

  /* ------------------------------------------------------------------ icons */
  const svg = (paths, vb) => '<svg viewBox="' + (vb || '0 0 24 24') + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  const ICON = {
    back: svg('<path d="M15 18l-6-6 6-6"/>'),
    chev: svg('<path d="M6 9l6 6 6-6"/>'),
    flag: svg('<path d="M4 22V4a1 1 0 0 1 1-1h10l1 2h4v11h-9l-1-2H4"/>'),
    camera: svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
    note: svg('<path d="M4 4h12l4 4v12H4z"/><path d="M8 12h8M8 16h5"/>'),
    phone: svg('<path d="M5 4h4l2 5-3 2a10 10 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
    book: svg('<path d="M4 4h7v16H4zM13 4h7v16h-7z"/>'),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    check: svg('<path d="M5 12l5 5L20 7"/>'),
    calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    doc: svg('<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6M9 8h2"/>'),
    copy: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
    share: svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>'),
    print: svg('<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    car: svg('<path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v5H3z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/><path d="M5 13h14"/>'),
    warn: svg('<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17h.01"/>'),
    list: svg('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    pin: svg('<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>'),
    download: svg('<path d="M12 3v12M6 11l6 6 6-6M4 21h16"/>'),
    upload: svg('<path d="M12 21V9M6 13l6-6 6 6M4 3h16"/>'),
    trash: svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>'),
    edit: svg('<path d="M4 20h4l11-11-4-4L4 16z"/>'),
    home: svg('<path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/>'),
    bolt: svg('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
    alert: svg('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>'),
  };

  /* ------------------------------------------------------------------ mascot (Hacz) */
  // Placeholder: rounded lime check-mark character with eyes and a headlamp (Auto version). Replaced by /assets/brand/hacz.svg when present.
  const HACZ_SVG = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hacz – asystent AI marki Odhacz">'
    + '<circle cx="60" cy="60" r="56" fill="#0B0F19"/>'
    + '<path d="M28 62 L50 84 L94 38" fill="none" stroke="#C6F135" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<circle cx="52" cy="51" r="6.5" fill="#0B0F19"/><circle cx="68" cy="43" r="6.5" fill="#0B0F19"/>'
    + '<circle cx="54" cy="49.5" r="2.4" fill="#fff"/><circle cx="70" cy="41.5" r="2.4" fill="#fff"/>'
    + '<rect x="74" y="20" width="16" height="10" rx="4" fill="#6D28D9"/><path d="M90 25 L108 18 L108 32 Z" fill="#EDE9FE" opacity=".9"/>'
    + '<path d="M44 66 q6 6 12 0" fill="none" stroke="#0B0F19" stroke-width="3" stroke-linecap="round"/>'
    + '</svg>';
  let haczReady = null; // null = unknown, true = external svg exists, false = use placeholder
  let haczSrc = '/assets/brand/hacz.svg'; // overridable per product via mount({ mascot })
  const haczWaiters = [];
  function probeHacz() {
    if (haczReady !== null) return;
    const img = new Image();
    img.onload = () => { haczReady = true; haczWaiters.splice(0).forEach((fn) => fn()); };
    img.onerror = () => { haczReady = false; haczWaiters.length = 0; };
    img.src = haczSrc;
  }
  function mascot(cls) {
    const wrap = el('span', { class: 'mascot ' + (cls || ''), html: HACZ_SVG });
    const swap = () => { wrap.innerHTML = ''; wrap.append(el('img', { src: haczSrc, alt: 'Hacz – asystent AI marki Odhacz' })); };
    if (haczReady === true) swap(); else if (haczReady === null) { haczWaiters.push(swap); probeHacz(); }
    return wrap;
  }

  /* ------------------------------------------------------------------ photos (IndexedDB, local only) */
  const Photos = (() => {
    let dbp = null;
    function open() {
      if (dbp) return dbp;
      dbp = new Promise((res, rej) => {
        try {
          if (!('indexedDB' in window)) return rej(new Error('no indexedDB'));
          const r = indexedDB.open('odhacz-photos', 1);
          r.onupgradeneeded = () => { r.result.createObjectStore('photos'); };
          r.onsuccess = () => res(r.result);
          r.onerror = () => rej(r.error);
        } catch (e) { rej(e); }
      });
      return dbp;
    }
    function tx(mode, fn) {
      return open().then((db) => new Promise((res, rej) => {
        const t = db.transaction('photos', mode);
        const req = fn(t.objectStore('photos'));
        t.oncomplete = () => res(req ? req.result : undefined);
        t.onerror = () => rej(t.error);
        t.onabort = () => rej(t.error);
      }));
    }
    return {
      get: (k) => tx('readonly', (s) => s.get(k)).then((v) => (Array.isArray(v) ? v : [])).catch(() => []),
      set: (k, v) => tx('readwrite', (s) => (v && v.length ? s.put(v, k) : s.delete(k))).catch(() => {}),
      keys: (prefix) => tx('readonly', (s) => s.getAllKeys(IDBKeyRange.bound(prefix, prefix + '\uffff'))).then((k) => k || []).catch(() => []),
      async delPrefix(prefix) { const keys = await this.keys(prefix); for (const k of keys) await tx('readwrite', (s) => s.delete(k)).catch(() => {}); },
      async map(prefix) { const keys = await this.keys(prefix); const out = {}; for (const k of keys) out[k] = await this.get(k); return out; },
    };
  })();
  function loadImage(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file); const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); res(img); }; img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('image')); }; img.src = url;
    });
  }
  async function compressImage(file, maxBytes) {
    let bmp;
    try { bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) { bmp = await loadImage(file); }
    const w = bmp.width, h = bmp.height;
    const canvas = document.createElement('canvas');
    let max = 1280;
    for (let attempt = 0; attempt < 7; attempt++) {
      const scale = Math.min(1, max / Math.max(w, h));
      canvas.width = Math.max(1, Math.round(w * scale)); canvas.height = Math.max(1, Math.round(h * scale));
      const ctx = canvas.getContext('2d'); ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      for (const q of [0.82, 0.72, 0.62, 0.52]) { const url = canvas.toDataURL('image/jpeg', q); if (url.length * 0.75 <= maxBytes) return url; }
      max = Math.round(max * 0.72);
    }
    return canvas.toDataURL('image/jpeg', 0.4);
  }

  /* ------------------------------------------------------------------ content */
  const STATE_LABEL = { ok: 'OK', uwaga: 'Uwaga', problem: 'Problem', pomin: 'Pomiń' };
  const DEFAULT_STATES = ['ok', 'uwaga', 'problem', 'pomin'];
  function normalize(raw) {
    const c = Object.assign({}, raw);
    c.meta = c.meta || {};
    c.answer_states = Array.isArray(c.answer_states) && c.answer_states.length ? c.answer_states : DEFAULT_STATES;
    c.phases = (Array.isArray(c.phases) ? c.phases.slice() : []).sort((a, b) => (a.order || 0) - (b.order || 0));
    c.items = []; c.itemById = {}; c.phaseOfItem = {};
    c.phases.forEach((ph, pi) => {
      ph.index = pi; ph.sections = Array.isArray(ph.sections) ? ph.sections : []; ph.items = [];
      ph.sections.forEach((sec) => {
        sec.items = Array.isArray(sec.items) ? sec.items : [];
        sec.items.forEach((it) => {
          if (!it.id) it.id = ph.id + '-' + (ph.items.length + 1);
          if (!it.severity) it.severity = 'yellow';
          it.tags = Array.isArray(it.tags) ? it.tags : [];
          ph.items.push(it); c.items.push(it); c.itemById[it.id] = it; c.phaseOfItem[it.id] = ph;
        });
      });
    });
    if (c.quick_start && Array.isArray(c.quick_start.steps)) c.quick_start.steps = c.quick_start.steps.map((s) => (typeof s === 'string' ? { text: s } : (s || {})));
    // Deadlines: top-level entries (days_from_purchase | date_from_input(+remind_days_before) | days_from_input(+days)) and
    // item-level ones (days_from_purchase | days_before_input+input_ref | days_from_input+input_ref). Item rows duplicating a
    // top-level rule (same anchor, same "who", same hardness) are dropped – the top-level entry carries the richer info.
    c.deadlineRows = [];
    const whoNorm = (w) => { w = String(w || 'kupujący').toLowerCase(); return /sprzeda/.test(w) ? 's' : (/kupuj|^ty$|nabyw/.test(w) ? 'k' : 'o'); };
    const rowKey = (r) => (r.anchor === 'pd' ? 'pd|' + r.days + '|' + whoNorm(r.who) + '|' + (r.soft ? 1 : 0) : 'in|' + r.ref + '|' + whoNorm(r.who));
    (Array.isArray(c.deadlines) ? c.deadlines : []).forEach((d, i) => {
      if (!d || typeof d !== 'object') return;
      const base = { id: d.id || 'dl' + i, label: d.label || '', who: d.who, how: d.how, applies_if: d.applies_if, source: d.source, soft: d.hard === false || d.soft === true, confidence: d.confidence, remind: typeof d.remind_days_before === 'number' ? d.remind_days_before : null, top: true };
      if (typeof d.days_from_purchase === 'number') c.deadlineRows.push(Object.assign(base, { anchor: 'pd', days: d.days_from_purchase }));
      else if (typeof d.date_from_input === 'string') c.deadlineRows.push(Object.assign(base, { anchor: 'input', ref: d.date_from_input, days: 0 }));
      else if (typeof d.days_from_input === 'string') c.deadlineRows.push(Object.assign(base, { anchor: 'input', ref: d.days_from_input, days: typeof d.days === 'number' ? d.days : 0 }));
      else if (typeof d.input_ref === 'string' && typeof d.days_from_input === 'number') c.deadlineRows.push(Object.assign(base, { anchor: 'input', ref: d.input_ref, days: d.days_from_input }));
      else if (typeof d.input_ref === 'string' && typeof d.days_before_input === 'number') c.deadlineRows.push(Object.assign(base, { anchor: 'input', ref: d.input_ref, days: -d.days_before_input }));
    });
    const keys = new Set(c.deadlineRows.map(rowKey));
    c.items.forEach((it) => {
      const d = it.deadline; if (!d || typeof d !== 'object') return;
      const base = { id: 'item-' + it.id, label: d.label || it.text, who: d.who, how: it.how, soft: !!d.soft, itemId: it.id, top: false };
      let row = null;
      if (typeof d.days_from_purchase === 'number') row = Object.assign(base, { anchor: 'pd', days: d.days_from_purchase });
      else if (typeof d.input_ref === 'string' && typeof d.days_before_input === 'number') row = Object.assign(base, { anchor: 'input', ref: d.input_ref, days: -d.days_before_input });
      else if (typeof d.input_ref === 'string' && typeof d.days_from_input === 'number') row = Object.assign(base, { anchor: 'input', ref: d.input_ref, days: d.days_from_input });
      if (!row) return;
      it.deadlineRow = row;
      const k = rowKey(row); if (keys.has(k)) return; keys.add(k);
      c.deadlineRows.push(row);
    });
    c.deadlineRows.sort((a, b) => (a.anchor === b.anchor ? a.days - b.days : a.anchor === 'pd' ? -1 : 1));
    return c;
  }
  const HEAVY_RE = /silnik|mask|jazd|prób|napęd|naped|skrzyn|engine|drive|gearbox|turbo|rozrz|sprzęg|sprzeg|głowic|glowic/i;
  const DATE_TYPES = { date: 1, datetime: 1 };
  /** Short display of an input value (badges). */
  function fmtInput(it, v) {
    if (v == null || v === '') return '';
    const t = it.input && it.input.type;
    if (Array.isArray(v)) return v.length + ' ' + plural(v.length, 'wpis', 'wpisy', 'wpisów');
    if (t === 'date') return fmtPl(String(v)) || String(v);
    if (t === 'datetime') { const str = String(v); return parseDate(str) ? fmtPl(str) + (str.length > 10 ? ' ' + str.slice(11, 16) : '') : str; }
    if (t === 'number') return v + (it.input && it.input.unit ? ' ' + it.input.unit : '');
    const str = String(v); return str.length > 60 ? str.slice(0, 57) + '…' : str;
  }
  /** Full text of an input value (lists, print, clipboard). */
  function inputText(it, v) {
    if (Array.isArray(v)) return v.map((e) => fmtPl(e.d, { day: 'numeric', month: 'short' }) + ': ' + e.t).join('; ');
    if (it.input && (it.input.type === 'text' || it.input.type === 'choice')) return String(v == null ? '' : v);
    return fmtInput(it, v);
  }

  /* ------------------------------------------------------------------ mount */
  const Checklist = {
    mount(opts) { const app = new App(opts); app.init(); Checklist.app = app; window.OdhaczApp = app; return app; },
    version: '1.0.0',
  };
  window.Checklist = Checklist;

  function App(opts) {
    this.opts = Object.assign({ root: '#app', product: 'auto', kind: 'main', shopUrl: '/', content: '', sw: null, mascot: null }, opts || {});
    if (this.opts.mascot) haczSrc = this.opts.mascot;
    this.root = typeof this.opts.root === 'string' ? $(this.opts.root) : this.opts.root;
    this.key = 'odhacz:' + this.opts.product + ':v1';
    this.state = null; this.content = null; this.route = { view: 'home' };
    this.hasAccess = typeof window.Access === 'object' && window.Access && typeof window.Access.saveProgress === 'function';
    this.syncStatus = 'idle'; this.syncTimer = null; this.syncInflight = false; this.syncPending = false;
    this.access = null; this.installEvt = null; this.printRoot = null;
    this.openItems = {}; // itemId -> expanded (per session)
  }

  App.prototype.init = async function () {
    const self = this;
    this.state = this.loadState();
    this.applyTheme();
    this.root.innerHTML = '';
    this.root.append(el('div', { class: 'app' }, el('div', { class: 'empty' }, 'Ładuję checklistę…')));
    this.printRoot = el('div', { id: 'print-root' }); document.body.append(this.printRoot);
    window.addEventListener('hashchange', () => this.render());
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && self.syncTimer) self.flushSync(); });
    window.addEventListener('pagehide', () => { if (self.syncTimer) self.flushSync(); });
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); self.installEvt = e; if (self.route.view === 'home') self.render(); });
    if (this.opts.sw && 'serviceWorker' in navigator) { try { navigator.serviceWorker.register(this.opts.sw).catch(() => {}); } catch (e) { /* ignore */ } }
    try {
      const res = await fetch(this.opts.content, { credentials: 'same-origin' });
      if (res.status === 401 || res.status === 403) throw Object.assign(new Error('locked'), { locked: true });
      if (!res.ok) throw new Error('http ' + res.status);
      const ct = res.headers.get('content-type') || '';
      if (ct.indexOf('json') < 0 && res.redirected) throw Object.assign(new Error('locked'), { locked: true });
      this.content = normalize(await res.json());
    } catch (err) {
      this.renderLoadError(err); return;
    }
    this.ensureCar();
    this.render();
    track('app_open', { product: this.opts.product, content_version: this.content.meta.version || '', cars: Object.keys(this.state.cars).length });
    this.verifyAccess();
    this.pullRemote();
    if (!this.state.ui.onb) this.showOnboarding();
  };

  /* ------------------------------------------------------------------ state */
  App.prototype.loadState = function () {
    let s = null;
    try { const raw = localStorage.getItem(this.key); if (raw) { s = JSON.parse(raw); if (!s || s.v !== 1 || typeof s.cars !== 'object') s = null; } } catch (e) { s = null; }
    if (!s) s = { v: 1, t: null, active: null, cars: {}, ui: {} };
    s.ui = s.ui || {}; s.cars = s.cars || {};
    return s;
  };
  App.prototype.persist = function (touch) {
    if (touch !== false) { this.state.t = nowIso(); this.state.dirty = 1; }
    try { localStorage.setItem(this.key, JSON.stringify(this.state)); } catch (e) { /* quota / private mode */ }
    if (touch !== false) this.scheduleSync();
  };
  App.prototype.ensureCar = function () {
    const ids = Object.keys(this.state.cars);
    if (!ids.length) { const id = uid(); this.state.cars[id] = { name: this.opts.kind === 'upsell' ? 'Moje auto' : 'Auto 1', created: nowIso(), a: {} }; this.state.active = id; this.persist(false); }
    if (!this.state.active || !this.state.cars[this.state.active]) { this.state.active = Object.keys(this.state.cars)[0]; this.persist(false); }
    const car = this.state.cars[this.state.active]; car.a = car.a || {};
  };
  App.prototype.car = function () { this.ensureCar(); return this.state.cars[this.state.active]; };
  App.prototype.ans = function (itemId) { return this.car().a[itemId] || null; };
  App.prototype.setAnswer = function (itemId, patch) {
    const car = this.car(); const cur = car.a[itemId] || [null, null, null];
    if ('state' in patch) cur[0] = patch.state; if ('input' in patch) cur[1] = patch.input; if ('note' in patch) cur[2] = patch.note;
    while (cur.length && (cur[cur.length - 1] == null || cur[cur.length - 1] === '')) cur.pop();
    if (!cur.length) delete car.a[itemId]; else car.a[itemId] = cur;
    car.u = nowIso();
    this.persist();
  };
  App.prototype.stateOf = function (itemId) { const a = this.ans(itemId); return a && a[0] ? a[0] : null; };

  App.prototype.counts = function (carId) {
    const car = carId ? this.state.cars[carId] : this.car(); const a = (car && car.a) || {};
    const c = { ok: 0, uwaga: 0, problem: 0, pomin: 0, answered: 0, total: this.content.items.length, db: 0, phases: {}, dbItems: [], problems: [], uwagi: [] };
    this.content.phases.forEach((ph) => { c.phases[ph.id] = { answered: 0, total: ph.items.length, problem: 0, uwaga: 0, db: 0 }; });
    this.content.items.forEach((it) => {
      const st = a[it.id] && a[it.id][0]; if (!st) return;
      const ph = c.phases[this.content.phaseOfItem[it.id].id];
      c.answered++; ph.answered++;
      if (c[st] !== undefined) c[st]++;
      if (st === 'problem') { ph.problem++; c.problems.push(it); if (it.dealbreaker) { c.db++; ph.db++; c.dbItems.push(it); } }
      if (st === 'uwaga') { ph.uwaga++; c.uwagi.push(it); }
    });
    return c;
  };

  /* ------------------------------------------------------------------ sync (Access.*) */
  App.prototype.buildPayload = function (limit) {
    const cars = {}; const s = this.state;
    // Synced blob = ids, states, inputs, notes only (+ car name, creation time, purchase date, call-script ticks). Never photos or UI flags.
    const order = Object.keys(s.cars).sort((x, y) => String(s.cars[y].u || s.cars[y].created || '').localeCompare(String(s.cars[x].u || s.cars[x].created || '')));
    const shrinkInput = (v, lvl) => {
      if (Array.isArray(v)) { const keep = lvl >= 2 ? 3 : 10; return v.slice(-keep).map((e) => ({ d: e.d, t: String(e.t || '').slice(0, lvl >= 2 ? 60 : 120) })); }
      if (typeof v === 'string' && v.length > 200) return v.slice(0, lvl >= 1 ? 80 : 200);
      return v;
    };
    const make = (noteLen, maxCars, lvl) => {
      const out = { v: 1, t: s.t, active: s.active, cars: {} };
      order.slice(0, maxCars).forEach((id) => {
        const car = s.cars[id]; const a = {};
        Object.keys(car.a || {}).forEach((k) => {
          const v = car.a[k].slice();
          if (v[1] != null && lvl >= 1) v[1] = shrinkInput(v[1], lvl);
          if (v[2] && noteLen >= 0) v[2] = noteLen === 0 ? undefined : String(v[2]).slice(0, noteLen);
          while (v.length && (v[v.length - 1] == null || v[v.length - 1] === '')) v.pop();
          if (v.length) a[k] = v;
        });
        const row = { name: car.name, created: car.created, a: a };
        if (car.q && Object.keys(car.q).length) row.q = car.q;
        if (car.pd) row.pd = car.pd;
        out.cars[id] = row;
      });
      return out;
    };
    const plans = [[-1, 99, 0], [200, 99, 1], [80, 99, 2], [0, 99, 2], [0, 5, 2], [0, 3, 2], [0, 1, 2]];
    for (const [noteLen, maxCars, lvl] of plans) {
      const p = make(noteLen, maxCars, lvl); const bytes = new Blob([JSON.stringify(p)]).size;
      if (bytes <= limit) { if (lvl > 0) p.trunc = 1; return p; }
    }
    return make(0, 1, 2);
  };
  App.prototype.scheduleSync = function () {
    if (!this.hasAccess) return;
    clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => this.flushSync(), 3000);
  };
  App.prototype.flushSync = async function () {
    clearTimeout(this.syncTimer); this.syncTimer = null;
    if (!this.hasAccess) return;
    if (this.syncInflight) { this.syncPending = true; return; }
    this.syncInflight = true; this.syncStatus = 'saving'; this.renderSyncStatus();
    try {
      const payload = this.buildPayload(30 * 1024);
      const r = await window.Access.saveProgress(payload);
      if (r && r.ok) { this.state.synced = r.updated_at || nowIso(); this.state.dirty = 0; this.syncStatus = payload.trunc ? 'trunc' : 'ok'; this.persist(false); }
      else { this.syncStatus = 'error'; this.syncError = (r && r.error) || 'błąd'; }
    } catch (e) { this.syncStatus = 'offline'; }
    finally { this.syncInflight = false; this.renderSyncStatus(); if (this.syncPending) { this.syncPending = false; this.scheduleSync(); } }
  };
  App.prototype.pullRemote = async function () {
    if (!this.hasAccess) return;
    try {
      const remote = await window.Access.loadProgress();
      if (!remote || remote.v !== 1 || typeof remote.cars !== 'object') { if (this.state.dirty || (Object.keys(this.car().a).length && !this.state.synced)) this.scheduleSync(); return; }
      const localT = this.state.t || ''; const remoteT = remote.t || '';
      if (remoteT && remoteT > localT) {
        const merged = {}; let keptLocal = false;
        Object.keys(remote.cars).forEach((id) => { const rc = remote.cars[id]; merged[id] = { name: rc.name || 'Auto', created: rc.created || remoteT, a: rc.a || {}, q: rc.q, pd: rc.pd }; });
        Object.keys(this.state.cars).forEach((id) => { const lc = this.state.cars[id]; if (!merged[id] && lc.created && lc.created > remoteT && Object.keys(lc.a || {}).length) { merged[id] = lc; keptLocal = true; } });
        this.state.cars = merged; this.state.t = remoteT; this.state.dirty = keptLocal ? 1 : 0;
        if (remote.active && merged[remote.active]) this.state.active = remote.active;
        this.ensureCar(); this.persist(false); this.render();
        if (keptLocal) this.scheduleSync();
        this.toast('Wczytano postęp z innego urządzenia');
      } else if (this.state.dirty) this.scheduleSync();
    } catch (e) { /* offline or 401 (helper redirects) */ }
  };
  App.prototype.verifyAccess = async function () {
    if (!this.hasAccess || typeof window.Access.verify !== 'function') return;
    try { this.access = await window.Access.verify(); } catch (e) { this.access = { ok: false, offline: true }; }
    const st = $('[data-testid="access-status"]', this.root);
    if (st) st.textContent = this.accessText();
    if (this.route.view === 'home') { const slot = $('#upsell-slot', this.root); if (slot) { slot.innerHTML = ''; append(slot, this.upsellCard()); } }
  };
  App.prototype.accessText = function () {
    if (!this.hasAccess) return 'tryb podglądu (bez synchronizacji)';
    if (!this.access) return 'sprawdzam…';
    if (this.access.offline) return 'offline – postęp zapisany lokalnie';
    return this.access.ok ? 'aktywny (' + (this.access.products_owned || []).join(', ') + ')' : 'brak';
  };
  App.prototype.renderSyncStatus = function () {
    const n = $('#sync-status', this.root); if (!n) return;
    n.textContent = this.syncText();
  };
  App.prototype.syncText = function () {
    if (!this.hasAccess) return 'tylko lokalnie';
    switch (this.syncStatus) {
      case 'saving': return 'zapisuję…';
      case 'ok': return 'zsynchronizowano ' + (this.state.synced ? fmtTime(this.state.synced) : '');
      case 'trunc': return 'zsynchronizowano (skrócone notatki – limit 32 KB)';
      case 'error': return 'błąd synchronizacji: ' + (this.syncError || '');
      case 'offline': return 'offline – wyślę, gdy wróci sieć';
      default: return this.state.synced ? 'ostatnio ' + fmtTime(this.state.synced) : 'jeszcze nie synchronizowano';
    }
  };

  /* ------------------------------------------------------------------ theme */
  App.prototype.applyTheme = function () {
    const t = this.state.ui.theme || 'auto';
    if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
  };

  /* ------------------------------------------------------------------ router / render */
  App.prototype.parseRoute = function () {
    const h = (location.hash || '#/').replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    const view = parts[0] || 'home';
    return { view: view, id: parts[1] ? decodeURIComponent(parts[1]) : null };
  };
  App.prototype.go = function (path) { const target = '#/' + path.replace(/^\/+/, ''); if (location.hash === target) this.render(); else location.hash = target; };
  App.prototype.render = function () {
    if (!this.content) return;
    const prev = this.route; this.route = this.parseRoute();
    const wrap = el('div', { class: 'app' });
    let body;
    switch (this.route.view) {
      case 'phase': body = this.viewPhase(this.route.id); break;
      case 'summary': body = this.viewSummary(); break;
      case 'call': body = this.viewCall(); break;
      case 'glossary': body = this.viewGlossary(); break;
      case 'sources': body = this.viewSources(); break;
      case 'settings': body = this.viewSettings(); break;
      case 'quick': body = this.viewQuick(); break;
      case 'deadlines': body = this.viewDeadlines(); break;
      case 'contract': body = this.viewContract(); break;
      default: this.route.view = 'home'; body = this.viewHome();
    }
    append(wrap, body);
    this.root.innerHTML = ''; this.root.append(wrap);
    if (this.route.view !== 'settings' && this.route.view !== 'sources' && this.route.view !== 'glossary') this.root.append(this.flagbar());
    if (prev.view !== this.route.view || prev.id !== this.route.id) window.scrollTo(0, 0);
    document.title = (this.content.meta.title || 'Odhacz') + (this.route.view === 'home' ? '' : ' – ' + this.routeTitle());
  };
  App.prototype.routeTitle = function () {
    const r = this.route;
    if (r.view === 'phase') { const ph = this.content.phases.find((p) => p.id === r.id); return ph ? ph.title : 'Etap'; }
    return { summary: 'Podsumowanie', call: 'Skrypt rozmowy', glossary: 'Słowniczek', sources: 'Skąd to wiemy', settings: 'Ustawienia', quick: 'Quick start', deadlines: 'Terminy', contract: 'Wzór umowy' }[r.view] || '';
  };
  App.prototype.topbar = function (title, back, right) {
    const self = this;
    return el('header', { class: 'topbar' },
      back ? el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Wstecz', onclick: () => self.go(back) }, el('span', { html: ICON.back })) : el('span', { class: 'mascot', style: 'width:36px;height:36px;margin:0 6px', html: HACZ_SVG }),
      el('div', { class: 'topbar__title' }, title),
      right === false ? null : (right || this.carChip()));
  };
  App.prototype.carChip = function () {
    const self = this; const car = this.car();
    return el('button', { class: 'carchip', type: 'button', 'aria-label': 'Zmień auto: ' + car.name, onclick: () => self.sheetCars() }, el('span', { html: ICON.car }), el('span', { text: car.name }), el('span', { html: ICON.chev, style: 'width:16px;height:16px;display:inline-flex' }));
  };
  App.prototype.flagbar = function () {
    const self = this; const c = this.counts();
    const bar = el('div', { class: 'flagbar', role: 'status' });
    const inner = el('div', { class: 'flagbar__in' });
    const fc = (cls, icon, n, word, aria) => el('span', { class: 'fc fc--' + cls + (n ? ' is-on' : ''), role: 'img', 'aria-label': aria, title: aria }, el('span', { class: 'fc__i', html: icon }), el('b', { text: String(n) }), el('small', { text: word }));
    inner.append(el('div', { class: 'flagbar__counts' },
      fc('bad', ICON.flag, c.problem, plural(c.problem, 'flaga', 'flagi', 'flag'), c.problem + ' ' + plural(c.problem, 'czerwona flaga', 'czerwone flagi', 'czerwonych flag')),
      fc('warn', ICON.alert, c.uwaga, plural(c.uwaga, 'uwaga', 'uwagi', 'uwag'), c.uwaga + ' ' + plural(c.uwaga, 'uwaga', 'uwagi', 'uwag')),
      c.db ? fc('db', ICON.warn, c.db, 'dealbreaker', c.db + ' ' + plural(c.db, 'dealbreaker', 'dealbreakery', 'dealbreakerów')) : null));
    if (this.route.view !== 'summary') inner.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('summary') }, 'Podsumowanie', el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
    else inner.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('') }, el('span', { html: ICON.home }), 'Start'));
    bar.append(inner);
    return bar;
  };
  App.prototype.updateFlagbar = function () { const old = $('.flagbar', this.root); if (old) old.replaceWith(this.flagbar()); };
  App.prototype.disclaimer = function () { const d = this.content.meta.disclaimer; return d ? el('p', { class: 'disclaimer' }, d) : null; };

  /* ------------------------------------------------------------------ view: home */
  App.prototype.viewHome = function () {
    const self = this; const c = this.content; const cnt = this.counts(); const car = this.car();
    const out = [];
    out.push(this.topbar(c.meta.title || 'Odhacz', null));
    // A2HS hint
    const standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone;
    if (!standalone && !this.state.ui.a2hs && this.opts.kind === 'main') {
      out.push(el('div', { class: 'a2hs' },
        el('div', { class: 'grow' }, this.installEvt ? 'Zainstaluj na telefonie – działa offline przy aucie.' : 'Dodaj do ekranu głównego (menu przeglądarki), żeby mieć checklistę offline przy aucie.'),
        this.installEvt ? el('button', { class: 'btn btn--small btn--primary', type: 'button', onclick: () => { try { self.installEvt.prompt(); } catch (e) { /* ignore */ } self.state.ui.a2hs = 1; self.persist(false); self.render(); } }, 'Zainstaluj') : null,
        el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Zamknij', onclick: () => { self.state.ui.a2hs = 1; self.persist(false); self.render(); } }, el('span', { html: ICON.close }))));
    }
    out.push(el('div', { class: 'hero' }, mascot(), el('div', null, el('h1', { text: c.meta.title || 'Odhacz' }), el('p', { class: 'tagline' }, 'Odhaczasz punkt po punkcie. Zero zgadywania.'))));
    const total = c.meta.est_minutes_total;
    const haczLine = cnt.answered === 0 ? 'Cześć, tu Hacz. Zacznij od Quick startu – 3 minuty i wiesz, jak to działa. Potem etapy po kolei, najlepiej w tej kolejności.'
      : cnt.answered < cnt.total ? 'Masz ' + cnt.answered + ' z ' + cnt.total + ' punktów. ' + (cnt.problem ? 'Już ' + cnt.problem + ' ' + plural(cnt.problem, 'czerwona flaga', 'czerwone flagi', 'czerwonych flag') + ' – zapisuj notatki, przydadzą się w negocjacji.' : 'Na razie czysto. Nie zwalniaj przy silniku i jeździe próbnej.')
        : 'Wszystko odhaczone. Sprawdź podsumowanie i zabierz listę uwag do rozmowy.';
    out.push(el('div', { class: 'bubble' }, el('b', null, 'Hacz: '), haczLine, el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz')));
    // Quick start
    if (c.quick_start && c.quick_start.steps && c.quick_start.steps.length) {
      const done = !!this.state.ui.qs;
      out.push(el('div', { class: 'card quick' },
        el('div', { class: 'card__title' }, el('span', { class: 'quick__meta' }, el('span', { html: ICON.bolt, style: 'width:16px;height:16px;display:inline-flex' }), done ? 'zrobione' : '3 minuty'), el('h2', { class: 'grow', text: c.quick_start.title || 'Quick start' })),
        el('p', { class: 'muted' }, done ? 'Wiesz już, jak to działa. Możesz wrócić do Quick startu w każdej chwili.' : 'Zacznij tu. Szybki przegląd, żeby pierwszy postęp był natychmiast.'),
        el('button', { class: 'btn ' + (done ? '' : 'btn--primary') + ' btn--block', type: 'button', onclick: () => self.go('quick') }, done ? 'Otwórz Quick start' : 'Zacznij (3 min)')));
    }
    // Continue
    const next = c.phases.find((ph) => cnt.phases[ph.id].answered < cnt.phases[ph.id].total);
    if (cnt.answered > 0 && next) out.push(el('button', { class: 'btn btn--lime btn--block', type: 'button', onclick: () => self.go('phase/' + encodeURIComponent(next.id)) }, 'Kontynuuj: ' + next.title));
    // Phases
    out.push(el('div', { class: 'row', style: 'justify-content:space-between;margin:18px 0 8px' }, el('h2', { style: 'margin:0' }, 'Etapy'), total ? el('span', { class: 'chip' }, el('span', { html: ICON.clock }), '~' + total + ' min łącznie') : null));
    const list = el('ul', { class: 'phases' });
    c.phases.forEach((ph, i) => {
      const p = cnt.phases[ph.id]; const done = p.total > 0 && p.answered === p.total;
      const meta = el('div', { class: 'phase-row__meta' }, el('span', { text: p.answered + '/' + p.total }), ph.est_minutes ? el('span', { text: '~' + ph.est_minutes + ' min' }) : null, p.problem ? el('span', { class: 'phase-row__flags', text: p.problem + ' ' + plural(p.problem, 'flaga', 'flagi', 'flag') }) : null);
      const row = el('button', { class: 'phase-row' + (done ? ' is-done' : ''), type: 'button', onclick: () => self.go('phase/' + encodeURIComponent(ph.id)) },
        el('span', { class: 'phase-row__n', html: done ? ICON.check : String(i + 1) }),
        el('span', null, el('span', { class: 'phase-row__t', text: ph.title }), ph.subtitle ? el('span', { class: 'phase-row__s', text: ph.subtitle }) : null),
        meta,
        el('span', { class: 'progress' }, el('i', { style: 'width:' + (p.total ? Math.round(100 * p.answered / p.total) : 0) + '%' })));
      list.append(el('li', null, row));
    });
    out.push(list);
    // Tiles
    const tiles = el('div', { class: 'grid2 mt' });
    const tile = (icon, label, path) => el('button', { class: 'tile', type: 'button', onclick: () => self.go(path) }, el('span', { html: icon }), el('span', { text: label }));
    tiles.append(tile(ICON.list, 'Podsumowanie i negocjacja', 'summary'));
    if (c.seller_call_script) tiles.append(tile(ICON.phone, 'Skrypt rozmowy ze sprzedawcą', 'call'));
    if (c.deadlineRows.length) tiles.append(tile(ICON.calendar, 'Terminy po zakupie', 'deadlines'));
    if (c.contract_template) tiles.append(tile(ICON.doc, c.contract_template.title || 'Wzór umowy', 'contract'));
    if (c.glossary && c.glossary.length) tiles.append(tile(ICON.book, 'Słowniczek', 'glossary'));
    if (c.sources && c.sources.length) tiles.append(tile(ICON.info, 'Skąd to wiemy', 'sources'));
    tiles.append(tile(ICON.gear, 'Ustawienia i kopia', 'settings'));
    out.push(tiles);
    out.push(el('div', { id: 'upsell-slot', class: 'mt' }, this.upsellCard()));
    out.push(this.disclaimer());
    out.push(el('p', { class: 'small muted center', style: 'margin-top:12px' }, 'Auto: ' + car.name + ' · treść v' + (c.meta.version || '1') + ' · ilustracje i awatar wygenerowane cyfrowo'));
    return out;
  };
  App.prototype.upsellCard = function () {
    if (this.opts.kind !== 'main' || !this.access) return null;
    const owned = (this.access.products_owned || []).indexOf('upsell') >= 0;
    if (owned) return el('div', { class: 'card card--soft' }, el('h3', null, 'Masz też dodatek „Po zakupie”'), el('p', { class: 'muted' }, 'Umowa, PCC-3, rejestracja, OC, pierwsze 30 dni – z terminami do kalendarza.'), el('a', { class: 'btn btn--block', href: '/dodatek/' }, 'Otwórz dodatek'), el('p', { class: 'small muted', style: 'margin:8px 0 0' }, 'Jeśli się nie otworzy na tym urządzeniu, użyj linku do dodatku z e-maila.'));
    return el('div', { class: 'card card--soft' }, el('h3', null, 'Kupujesz to auto? Jest dodatek „Po zakupie”'), el('p', { class: 'muted' }, 'Co zrobić po „biorę”: umowa z objaśnieniami, PCC-3, rejestracja, OC, przypomnienia do kalendarza (.ics).'), el('a', { class: 'btn btn--block', href: this.opts.shopUrl }, 'Zobacz w sklepie'));
  };

  /* ------------------------------------------------------------------ view: quick start */
  App.prototype.viewQuick = function () {
    const self = this; const q = this.content.quick_start;
    if (!q) return [this.topbar('Quick start', ''), this.lockedCard('Ta wersja nie ma Quick startu.')];
    const out = [this.topbar(q.title || 'Quick start', '')];
    out.push(el('div', { class: 'bubble bubble--inline' }, mascot(), el('div', null, el('b', null, 'Hacz: '), 'Trzy minuty, żeby oswoić narzędzie. Odhacz kroki, a potem wchodzisz w pierwszy etap.', el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz'))));
    const card = el('div', { class: 'card' });
    const list = el('ol', { class: 'steps' });
    const done = this.state.ui.qsSteps || {};
    q.steps.forEach((s, i) => {
      const id = 'qs-' + i;
      const cb = el('input', { type: 'checkbox', id: id, checked: !!done[i] });
      const li = el('li', { class: 'check' + (done[i] ? ' is-done' : ''), style: 'border-top:0' }, cb, el('label', { for: id, class: 'grow check__text' }, el('span', { class: 'num', style: 'display:inline-flex;margin-right:8px;width:26px;height:26px;font-size:16px' }, String(i + 1)), s.text || ''));
      cb.addEventListener('change', () => { done[i] = cb.checked ? 1 : 0; self.state.ui.qsSteps = done; self.persist(false); li.classList.toggle('is-done', cb.checked); });
      list.append(li);
    });
    card.append(list);
    out.push(card);
    const first = this.content.phases[0];
    out.push(el('div', { class: 'btnrow' },
      el('button', { class: 'btn btn--primary', type: 'button', onclick: () => { if (!self.state.ui.qs) { self.state.ui.qs = 1; self.persist(false); track('quick_start_done', { steps: q.steps.length }); } self.toast('Quick start odhaczony'); if (first) self.go('phase/' + encodeURIComponent(first.id)); else self.go(''); } }, 'Gotowe – zaczynam' + (first ? ': ' + first.title : ''))));
    return out;
  };

  /* ------------------------------------------------------------------ view: phase */
  App.prototype.viewPhase = function (id) {
    const self = this; const c = this.content;
    const ph = c.phases.find((p) => p.id === id);
    if (!ph) return [this.topbar('Etap', ''), this.lockedCard('Nie ma takiego etapu.')];
    const cnt = this.counts(); const p = cnt.phases[ph.id];
    const out = [this.topbar(ph.title, '')];
    out.push(el('h1', { style: 'font-size:26px;margin-top:4px' }, ph.title));
    if (ph.subtitle) out.push(el('p', { class: 'muted' }, ph.subtitle));
    const chips = el('div', { class: 'chips' });
    if (ph.est_minutes) chips.append(el('span', { class: 'chip' }, el('span', { html: ICON.clock }), '~' + ph.est_minutes + ' min'));
    chips.append(el('span', { class: 'chip', id: 'phase-progress' }, p.answered + '/' + p.total + ' odhaczone'));
    out.push(chips);
    if (ph.when) out.push(el('p', { class: 'when' }, el('span', { html: ICON.pin }), el('span', null, el('b', null, 'Kiedy: '), ph.when)));
    if (ph.intro) out.push(el('div', { class: 'phase-intro' }, mascot(), el('div', { class: 'bubble' }, el('b', null, 'Hacz: '), ph.intro, el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz'))));
    ph.sections.forEach((sec) => {
      if (sec.title) out.push(el('div', { class: 'section-title' }, sec.title));
      sec.items.forEach((it) => out.push(this.itemRow(it)));
    });
    // nav
    const nav = el('div', { class: 'phasenav' });
    const prevPh = c.phases[ph.index - 1], nextPh = c.phases[ph.index + 1];
    if (prevPh) nav.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('phase/' + encodeURIComponent(prevPh.id)) }, el('span', { html: ICON.back }), el('span', { class: 'grow', style: 'text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap', text: prevPh.title })));
    if (nextPh) nav.append(el('button', { class: 'btn btn--primary', type: 'button', onclick: () => self.go('phase/' + encodeURIComponent(nextPh.id)) }, el('span', { class: 'grow', style: 'text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap', text: nextPh.title }), el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
    else nav.append(el('button', { class: 'btn btn--primary', type: 'button', onclick: () => self.go('summary') }, 'Podsumowanie i negocjacja', el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
    out.push(nav);
    return out;
  };
  /** Item row element by id (attribute comparison – content ids are never interpolated into selectors). */
  App.prototype.itemEl = function (itemId) {
    const rows = this.root.querySelectorAll('.item[data-item]');
    for (let i = 0; i < rows.length; i++) if (rows[i].getAttribute('data-item') === itemId) return rows[i];
    return null;
  };
  App.prototype.photoKey = function (itemId) { return this.opts.product + '|' + this.state.active + '|' + itemId; };
  App.prototype.itemRow = function (it) {
    const self = this; const a = this.ans(it.id) || [];
    const row = el('article', { class: 'item' + (a[0] ? ' is-' + a[0] : '') + (this.openItems[it.id] ? ' is-open' : ''), 'data-item': it.id });
    // head
    const badges = el('div', { class: 'item__badges' });
    if (it.dealbreaker) badges.append(el('span', { class: 'badge badge--db' }, el('span', { html: ICON.warn, style: 'width:16px;height:16px;display:inline-flex' }), 'dealbreaker'));
    if (it.severity === 'red' && !it.dealbreaker) badges.append(el('span', { class: 'badge badge--red' }, 'czerwona flaga'));
    if (it.severity === 'info') badges.append(el('span', { class: 'badge badge--info' }, 'info'));
    if (it.input && a[1] != null && a[1] !== '') badges.append(el('span', { class: 'badge badge--val' }, fmtInput(it, a[1])));
    if (a[2]) badges.append(el('span', { class: 'badge badge--note' }, el('span', { html: ICON.note, style: 'width:14px;height:14px;display:inline-flex' }), el('span', { text: a[2] })));
    const thumbs = el('span', { class: 'row', style: 'gap:4px;display:inline-flex' });
    badges.append(thumbs);
    const head = el('button', { class: 'item__head', type: 'button', 'aria-expanded': this.openItems[it.id] ? 'true' : 'false', onclick: () => { self.openItems[it.id] = !self.openItems[it.id]; row.classList.toggle('is-open', !!self.openItems[it.id]); head.setAttribute('aria-expanded', self.openItems[it.id] ? 'true' : 'false'); if (self.openItems[it.id]) self.loadPhotos(it, row); } },
      el('span', null, el('span', { class: 'item__text', text: it.text }), badges), el('span', { class: 'chev', html: ICON.chev }));
    row.append(head);
    // body (how/why/hint, input, note, photos)
    const body = el('div', { class: 'item__body' });
    const hw = el('div', { class: 'howwhy' });
    if (it.how) hw.append(el('p', null, el('b', null, 'Jak sprawdzić: '), it.how));
    if (it.why) hw.append(el('p', null, el('b', null, 'Dlaczego: '), it.why));
    if (it.flag_label && it.severity !== 'info') hw.append(el('p', null, el('b', null, 'Czerwona flaga: '), it.flag_label));
    if (it.deadlineRow) { const dtxt = this.deadlineText(it.deadlineRow); if (dtxt) hw.append(el('p', { class: 'dl-inline' }, el('b', null, 'Termin: '), dtxt)); }
    if (hw.childNodes.length) body.append(hw);
    row.append(body);
    // input (number | text | date | datetime | choice | log; unknown -> text)
    if (it.input && typeof it.input === 'object') row.append(this.inputField(it, a, row));
    // answers
    const answers = el('div', { class: 'answers' });
    this.content.answer_states.forEach((st) => {
      const b = el('button', { class: 'ans ans--' + st + (a[0] === st ? ' is-on' : ''), type: 'button', 'aria-pressed': a[0] === st ? 'true' : 'false', text: STATE_LABEL[st] || st });
      b.addEventListener('click', () => self.tapState(it, st, row));
      answers.append(b);
    });
    row.append(answers);
    // tools
    const tools = el('div', { class: 'item__tools' });
    const noteBox = el('div', { class: 'note', hidden: !a[2] });
    const ta = el('textarea', { placeholder: 'Notatka: co widzisz, co powiedział sprzedawca…', 'aria-label': 'Notatka' }); ta.value = a[2] || '';
    ta.addEventListener('input', () => { self.setAnswer(it.id, { note: ta.value.trim() }); self.refreshBadges(it, row); });
    noteBox.append(ta);
    tools.append(el('button', { class: 'toolbtn', type: 'button', onclick: () => { noteBox.hidden = !noteBox.hidden; if (!noteBox.hidden) ta.focus(); } }, el('span', { html: ICON.note }), a[2] ? 'Notatka' : 'Dodaj notatkę'));
    const photosBox = el('div', { class: 'photos', hidden: true });
    if (it.photo) {
      tools.append(el('button', { class: 'toolbtn', type: 'button', onclick: () => { photosBox.hidden = false; self.loadPhotos(it, row).then(() => { const inp = $('input[type=file]', photosBox); if (inp && !$('.thumb', photosBox)) inp.click(); }); } }, el('span', { html: ICON.camera }), 'Dodaj zdjęcie'));
    }
    row.append(tools, noteBox, photosBox);
    if (it.photo) this.loadPhotos(it, row, true);
    return row;
  };
  App.prototype.inputField = function (it, a, row) {
    const self = this; const inp = it.input; const type = inp.type || 'text'; const val = a[1];
    const wrap = el('div', { class: 'field' }); if (inp.label) wrap.append(el('label', { text: inp.label }));
    const save = (v) => { self.setAnswer(it.id, { input: v }); self.refreshBadges(it, row); if (DATE_TYPES[type]) self.refreshDeadlineTexts(); };
    if (type === 'choice' && Array.isArray(inp.options) && inp.options.length) {
      const box = el('div', { class: 'choices', role: 'group', 'aria-label': inp.label || 'Wybór' });
      inp.options.forEach((opt) => {
        const label = typeof opt === 'string' ? opt : (opt && (opt.label || opt.value)) || ''; const value = typeof opt === 'string' ? opt : (opt && (opt.value || opt.label)) || '';
        const b = el('button', { type: 'button', class: 'choice' + (val === value ? ' is-on' : ''), 'aria-pressed': val === value ? 'true' : 'false', 'data-value': value, text: label });
        b.addEventListener('click', () => { const cur = (self.ans(it.id) || [])[1]; const next = cur === value ? null : value; save(next); box.querySelectorAll('.choice').forEach((x) => { const on = next != null && x.getAttribute('data-value') === next; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); }); });
        box.append(b);
      });
      wrap.append(box);
    } else if (type === 'log') {
      wrap.append(this.logField(it, row));
    } else {
      const htmlType = type === 'number' ? 'number' : type === 'date' ? 'date' : type === 'datetime' ? 'datetime-local' : 'text';
      const field = el('input', { type: htmlType, inputmode: type === 'number' ? 'decimal' : null, step: type === 'number' ? 'any' : null, placeholder: type === 'number' ? '0' : null, value: val != null && !Array.isArray(val) ? val : '', 'aria-label': inp.label || 'Pomiar', maxlength: htmlType === 'text' ? '300' : null });
      let last = field.value;
      const onChange = () => { if (field.value === last) return; last = field.value; const v = field.value === '' ? null : (type === 'number' ? Number(field.value) : field.value); save(v); };
      field.addEventListener('input', onChange); field.addEventListener('change', onChange);
      wrap.append(el('div', { class: 'inwrap', style: 'grid-column:1/-1' }, field, inp.unit ? el('span', { class: 'unit', text: inp.unit }) : null));
    }
    if (inp.hint) wrap.append(el('span', { class: 'hint', text: inp.hint }));
    return wrap;
  };
  App.prototype.logField = function (it, row) {
    const self = this; const box = el('div', { class: 'log', style: 'grid-column:1/-1' });
    const render = () => {
      box.innerHTML = '';
      const cur = (self.ans(it.id) || [])[1]; const entries = Array.isArray(cur) ? cur : [];
      if (entries.length) {
        const ul = el('ul', { class: 'log__list' });
        entries.forEach((e, i) => ul.append(el('li', null, el('span', { class: 'log__d', text: fmtPl(e.d, { day: 'numeric', month: 'short' }) || e.d }), el('span', { class: 'grow', text: e.t }),
          el('button', { type: 'button', class: 'iconbtn', 'aria-label': 'Usuń wpis', onclick: () => { const arr = entries.slice(); arr.splice(i, 1); self.setAnswer(it.id, { input: arr.length ? arr : null }); render(); self.refreshBadges(it, row); } }, el('span', { html: ICON.close })))));
        box.append(ul);
      }
      const date = el('input', { type: 'date', value: todayStr(), 'aria-label': 'Data wpisu' });
      const txt = el('input', { type: 'text', placeholder: 'Np. 12 400 km – stuk z przodu na progach', 'aria-label': 'Treść wpisu', maxlength: '200' });
      const add = () => { const t = txt.value.trim(); if (!t) return; const arr = entries.concat([{ d: parseDate(date.value) ? date.value : todayStr(), t: t.slice(0, 200) }]); self.setAnswer(it.id, { input: arr }); render(); self.refreshBadges(it, row); };
      txt.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } });
      box.append(el('div', { class: 'log__add' }, date, txt, el('button', { type: 'button', class: 'btn btn--small btn--primary', onclick: add }, 'Dodaj wpis')));
    };
    render(); return box;
  };
  /** Date value typed in an item's date/datetime input (YYYY-MM-DD) or null. */
  App.prototype.dateInput = function (itemId) {
    const it = this.content.itemById[itemId]; const a = this.ans(itemId);
    if (!it || !a || a[1] == null || typeof a[1] !== 'string') return null;
    const m = /^(\d{4}-\d{2}-\d{2})/.exec(a[1]); return m && parseDate(m[1]) ? m[1] : null;
  };
  /** Purchase date: set by the user in Deadlines, or derived from a date/datetime item about the contract, or null. */
  App.prototype.purchaseDate = function () {
    const car = this.car(); if (car.pd) return car.pd;
    const it = this.content.items.find((x) => x.input && DATE_TYPES[x.input.type] && /umow|zakup|nabyc/i.test((x.input.label || '') + ' ' + x.text) && this.dateInput(x.id));
    return it ? this.dateInput(it.id) : null;
  };
  /** Rows with a computed `due` date (YYYY-MM-DD) or a `pendingRef` item whose date is still missing. */
  App.prototype.resolveDeadlines = function (pd) {
    return this.content.deadlineRows.map((r) => {
      let due = null, pendingRef = null;
      if (r.anchor === 'pd') due = pd ? addDays(pd, r.days) : null;
      else { const d = this.dateInput(r.ref); if (d) due = addDays(d, r.days); else pendingRef = this.content.itemById[r.ref] || { id: r.ref, text: r.ref }; }
      return Object.assign({}, r, { due: due, pendingRef: pendingRef });
    }).sort((x, y) => (x.due && y.due ? x.due.localeCompare(y.due) : x.due ? -1 : y.due ? 1 : 0));
  };
  App.prototype.deadlineText = function (r) {
    const abs = Math.abs(r.days); const dni = abs + ' ' + plural(abs, 'dzień', 'dni', 'dni');
    if (r.anchor === 'pd') { const pd = this.purchaseDate(); return dni + ' od zakupu' + (pd ? ' → ' + fmtPl(addDays(pd, r.days)) : ' (datę zakupu ustawisz w „Terminach”)'); }
    const ref = this.content.itemById[r.ref]; const refLabel = ref ? ((ref.input && ref.input.label) || ref.text) : r.ref; const d = this.dateInput(r.ref);
    const rel = r.days === 0 ? 'w dniu: ' + refLabel : dni + (r.days < 0 ? ' przed: ' : ' po: ') + refLabel;
    return rel + (d ? ' → ' + fmtPl(addDays(d, r.days)) : ' (wpisz tę datę, żeby policzyć)');
  };
  App.prototype.refreshDeadlineTexts = function () {
    const self = this;
    this.root.querySelectorAll('.item[data-item]').forEach((rowEl) => { const it = self.content.itemById[rowEl.getAttribute('data-item')]; const n = $('.dl-inline', rowEl); if (it && it.deadlineRow && n) { n.innerHTML = ''; n.append(el('b', null, 'Termin: '), self.deadlineText(it.deadlineRow)); } });
  };
  App.prototype.refreshBadges = function (it, row) {
    const fresh = this.itemRow(it); const oldB = $('.item__badges', row); const newB = $('.item__badges', fresh);
    // keep thumbs already loaded
    const oldThumbs = $('.item__badges > .row', row); const newThumbs = $('.item__badges > .row', fresh);
    if (oldThumbs && newThumbs) newThumbs.replaceWith(oldThumbs);
    if (oldB && newB) oldB.replaceWith(newB);
  };
  App.prototype.tapState = function (it, st, row) {
    const cur = this.stateOf(it.id); const next = cur === st ? null : st;
    const wasComplete = this.phaseComplete(it);
    this.setAnswer(it.id, { state: next });
    row.className = row.className.replace(/\bis-(ok|uwaga|problem|pomin)\b/g, '').trim(); if (next) row.classList.add('is-' + next);
    row.querySelectorAll('.ans').forEach((b) => { const on = next && b.classList.contains('ans--' + next); b.classList.toggle('is-on', !!on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    this.updateFlagbar();
    const cnt = this.counts(); const ph = this.content.phaseOfItem[it.id]; const p = cnt.phases[ph.id];
    const chip = $('#phase-progress', this.root); if (chip) chip.textContent = p.answered + '/' + p.total + ' odhaczone';
    if (next === 'problem' && it.dealbreaker) this.sheetDealbreaker(it, row);
    else if (next === 'problem' && navigator.vibrate) { try { navigator.vibrate(30); } catch (e) { /* ignore */ } }
    if (!wasComplete && p.total && p.answered === p.total) { this.toast('Etap odhaczony ✓'); track('phase_done', { phase_id: ph.id, answered: p.answered, problems: p.problem, uwagi: p.uwaga }); }
  };
  App.prototype.phaseComplete = function (it) { const ph = this.content.phaseOfItem[it.id]; const p = this.counts().phases[ph.id]; return p.total > 0 && p.answered === p.total; };
  App.prototype.loadPhotos = async function (it, row, quiet) {
    const self = this; const key = this.photoKey(it.id);
    const list = await Photos.get(key);
    const thumbs = $('.item__badges > .row', row); const box = $('.photos', row);
    if (!thumbs || !box) return;
    thumbs.innerHTML = ''; list.forEach((u) => thumbs.append(el('img', { src: u, alt: '', style: 'width:28px;height:28px;border-radius:6px;object-fit:cover;border:1px solid var(--card-border)' })));
    box.innerHTML = '';
    if (list.length && quiet) box.hidden = false;
    list.forEach((u, i) => {
      box.append(el('div', { class: 'thumb' }, el('img', { src: u, alt: 'Zdjęcie ' + (i + 1) }), el('button', { type: 'button', 'aria-label': 'Usuń zdjęcie', text: '×', onclick: async () => { const l = await Photos.get(key); l.splice(i, 1); await Photos.set(key, l); self.loadPhotos(it, row, true); } })));
    });
    if (list.length < 3) {
      const inp = el('input', { type: 'file', accept: 'image/*', capture: 'environment' });
      inp.addEventListener('change', async () => {
        const f = inp.files && inp.files[0]; if (!f) return;
        try { const url = await compressImage(f, 200 * 1024); const l = await Photos.get(key); l.push(url); await Photos.set(key, l); box.hidden = false; self.loadPhotos(it, row, true); self.toast('Zdjęcie zapisane w telefonie'); }
        catch (e) { self.toast('Nie udało się dodać zdjęcia', true); }
      });
      box.append(el('label', { class: 'addphoto' }, el('span', { html: ICON.camera }), el('span', { text: list.length ? 'dodaj' : 'zdjęcie' }), inp));
    }
  };

  /* ------------------------------------------------------------------ decision + negotiation list */
  App.prototype.decide = function (cnt) {
    const rules = this.content.summary_rules || {};
    const reasons = []; let kind, title, lead;
    const heavy = cnt.problems.filter((it) => { const ph = this.content.phaseOfItem[it.id]; return HEAVY_RE.test(ph.id + ' ' + ph.title) || it.tags.some((t) => HEAVY_RE.test(t)); });
    const redNonDb = cnt.problems.filter((it) => it.severity === 'red' && !it.dealbreaker);
    if (cnt.dbItems.length) {
      kind = 'walk'; title = 'Odpuść to auto'; lead = 'Masz ' + cnt.dbItems.length + ' ' + plural(cnt.dbItems.length, 'dealbreaker', 'dealbreakery', 'dealbreakerów') + ' ustawione na „Problem”. To zwykle koniec oglądania.';
      cnt.dbItems.forEach((it) => reasons.push(it.flag_label || it.text));
    } else if (heavy.length >= 2 || redNonDb.length >= 1 || cnt.problems.length >= 3) {
      kind = 'mech'; title = 'Zawołaj mechanika przed decyzją';
      if (heavy.length >= 2) reasons.push(heavy.length + ' problemy w obszarze silnik / skrzynia / jazda próbna – tego nie ocenisz bez podnośnika i diagnostyki.');
      if (redNonDb.length) reasons.push(redNonDb.length + ' ' + plural(redNonDb.length, 'problem', 'problemy', 'problemów') + ' oznaczone jako czerwona flaga: ' + redNonDb.map((it) => it.flag_label || it.text).slice(0, 3).join('; ') + (redNonDb.length > 3 ? '…' : ''));
      if (cnt.problems.length >= 3) reasons.push('Łącznie ' + cnt.problems.length + ' problemów – przy takiej liczbie nie kupuj „na oko”.');
      lead = 'Nie mówimy „nie”. Mówimy: nie płać, zanim ktoś z podnośnikiem i komputerem tego nie obejrzy (80–200 zł w stacji diagnostycznej).';
    } else if (cnt.problems.length || cnt.uwagi.length) {
      kind = 'nego'; title = 'Negocjuj';
      lead = 'Masz ' + (cnt.problems.length ? cnt.problems.length + ' ' + plural(cnt.problems.length, 'problem', 'problemy', 'problemów') + ' i ' : '') + cnt.uwagi.length + ' ' + plural(cnt.uwagi.length, 'uwagę', 'uwagi', 'uwag') + '. Nic z tego nie przekreśla auta, ale każda pozycja to argument w rozmowie o cenie.';
      reasons.push('Pokaż sprzedawcy listę poniżej – punkt po punkcie, bez wyceniania napraw.');
      if (cnt.answered < cnt.total) reasons.push('Dokończ pozostałe ' + (cnt.total - cnt.answered) + ' punktów, zanim podasz cenę.');
    } else if (cnt.answered < Math.max(1, Math.round(cnt.total * 0.5))) {
      kind = 'todo'; title = 'Za wcześnie na decyzję'; lead = 'Odhaczone ' + cnt.answered + ' z ' + cnt.total + ' punktów. Wróć tu, kiedy przejdziesz przynajmniej silnik i jazdę próbną.';
    } else {
      kind = 'ok'; title = 'Wygląda dobrze'; lead = cnt.answered + ' ' + plural(cnt.answered, 'punkt', 'punkty', 'punktów') + ' bez problemów i uwag.' + (cnt.answered < cnt.total ? ' Zostało ' + (cnt.total - cnt.answered) + ' – dokończ przed decyzją.' : ' Trzymaj się zasad bezpiecznej transakcji poniżej.');
    }
    const ruleText = kind === 'walk' ? rules.walk_away_if : kind === 'mech' ? rules.get_mechanic_if : kind === 'nego' ? rules.negotiate_if : null;
    return { kind: kind, title: title, lead: lead, reasons: reasons, rules: Array.isArray(ruleText) ? ruleText : [] };
  };
  App.prototype.negoGroups = function () {
    const a = this.car().a; const groups = [];
    this.content.phases.forEach((ph) => {
      const rows = [];
      ph.items.forEach((it) => { const v = a[it.id]; if (v && (v[0] === 'uwaga' || v[0] === 'problem')) rows.push({ item: it, state: v[0], input: v[1], note: v[2] }); });
      if (rows.length) groups.push({ phase: ph, rows: rows });
    });
    return groups;
  };
  App.prototype.listTitle = function () { return this.content.meta.list_title || (this.opts.kind === 'upsell' ? 'Lista uwag i braków' : 'Lista uwag do negocjacji'); };
  App.prototype.negoText = function () {
    const c = this.content; const car = this.car(); const cnt = this.counts(); const groups = this.negoGroups(); const rules = c.summary_rules || {};
    const lines = [this.listTitle() + ' – ' + car.name + ' (' + fmtPl(todayStr()) + ')', 'Problemy: ' + cnt.problem + ' · Uwagi: ' + cnt.uwaga + ' · Dealbreakery: ' + cnt.db, ''];
    groups.forEach((g) => {
      lines.push(g.phase.title.toUpperCase());
      g.rows.forEach((r) => {
        let l = '- [' + (STATE_LABEL[r.state] || r.state).toUpperCase() + '] ' + (r.item.flag_label && r.state === 'problem' ? r.item.flag_label : r.item.text);
        if (r.item.dealbreaker && r.state === 'problem') l += ' (DEALBREAKER)';
        if (r.input != null && r.input !== '') l += ' – ' + inputText(r.item, r.input);
        if (r.note) l += ' – ' + r.note;
        lines.push(l);
      });
      lines.push('');
    });
    if (!groups.length) lines.push('Brak uwag i problemów.', '');
    if (Array.isArray(rules.negotiation_phrases) && rules.negotiation_phrases.length) { lines.push('ZDANIA DO ROZMOWY'); rules.negotiation_phrases.forEach((p) => lines.push('- ' + p)); lines.push(''); }
    if (Array.isArray(rules.safe_deal_rules) && rules.safe_deal_rules.length) { lines.push('BEZPIECZNA TRANSAKCJA'); rules.safe_deal_rules.forEach((p) => lines.push('- ' + p)); lines.push(''); }
    lines.push('Wygenerowano w ' + (c.meta.title || 'Odhacz') + '. Narzędzie nie zastępuje mechanika i nie wycenia napraw.');
    return lines.join('\n');
  };

  /* ------------------------------------------------------------------ view: summary */
  App.prototype.viewSummary = function () {
    const self = this; const c = this.content; const cnt = this.counts(); const car = this.car(); const d = this.decide(cnt); const groups = this.negoGroups(); const rules = c.summary_rules || {};
    track('summary_viewed', { ok: cnt.ok, uwaga: cnt.uwaga, problem: cnt.problem, db: cnt.db, answered: cnt.answered, total: cnt.total, decision: d.kind });
    const out = [this.topbar('Podsumowanie i negocjacja', '')];
    out.push(el('h1', { style: 'font-size:26px;margin-top:4px' }, 'Podsumowanie'));
    out.push(el('p', { class: 'muted' }, car.name + ' · ' + cnt.answered + '/' + cnt.total + ' punktów odhaczonych'));
    out.push(el('div', { class: 'counts' },
      el('div', { class: 'count count--ok' }, el('b', { text: String(cnt.ok) }), el('span', null, 'OK')),
      el('div', { class: 'count count--uwaga' }, el('b', { text: String(cnt.uwaga) }), el('span', null, 'Uwaga')),
      el('div', { class: 'count count--problem' }, el('b', { text: String(cnt.problem) }), el('span', null, 'Problem')),
      el('div', { class: 'count count--db' }, el('b', { text: String(cnt.db) }), el('span', null, 'Dealbreakery'))));
    const dec = el('section', { class: 'decision decision--' + d.kind, 'aria-label': 'Decyzja' }, el('div', { class: 'decision__label' }, 'Co z tym zrobić'), el('h2', { text: d.title }), el('p', null, d.lead));
    if (d.reasons.length) dec.append(el('p', { style: 'margin:8px 0 0;font-weight:600' }, 'Dlaczego:'), el('ul', null, d.reasons.map((r) => el('li', null, r))));
    if (d.rules.length) dec.append(el('p', { style: 'margin:10px 0 0;font-weight:600' }, d.kind === 'walk' ? 'Zasada: odpuść, gdy…' : d.kind === 'mech' ? 'Zasada: mechanik, gdy…' : 'Zasada: negocjuj, gdy…'), el('ul', null, d.rules.map((r) => el('li', null, r))));
    out.push(dec);
    // list
    const listCard = el('div', { class: 'card' }, el('h2', null, this.listTitle()));
    if (!groups.length) listCard.append(el('p', { class: 'empty' }, 'Jeszcze pusto. Każdy punkt oznaczony „Uwaga” lub „Problem” trafi tu automatycznie.'));
    else {
      const ul = el('ul', { class: 'negolist' });
      groups.forEach((g) => {
        const li = el('li', null, el('div', { class: 'ph', text: g.phase.title }));
        g.rows.forEach((r) => {
          const meta = [];
          if (r.input != null && r.input !== '') meta.push((r.item.input && r.item.input.label ? r.item.input.label : 'pomiar') + ': ' + inputText(r.item, r.input));
          if (r.note) meta.push(r.note);
          li.append(el('div', { class: 'negoitem s-' + r.state }, el('span', { class: 'dot' }), el('div', null,
            el('div', null, el('b', { text: (STATE_LABEL[r.state] || r.state) + ': ' }), r.state === 'problem' && r.item.flag_label ? r.item.flag_label : r.item.text, r.item.dealbreaker && r.state === 'problem' ? el('span', { class: 'db' }, ' · dealbreaker') : null),
            meta.length ? el('div', { class: 'meta', text: meta.join(' · ') }) : null,
            el('button', { class: 'linkbtn', style: 'min-height:32px;padding:2px 0;font-size:16px', type: 'button', onclick: () => { self.openItems[r.item.id] = true; self.go('phase/' + encodeURIComponent(g.phase.id)); setTimeout(() => { const n = self.itemEl(r.item.id); if (n) n.scrollIntoView({ block: 'center' }); }, 50); } }, 'otwórz punkt'))));
        });
        ul.append(li);
      });
      listCard.append(ul);
    }
    const actions = el('div', { class: 'btnrow mt' });
    actions.append(el('button', { class: 'btn btn--primary', type: 'button', onclick: async () => { const t = self.negoText(); let ok = false; try { await navigator.clipboard.writeText(t); ok = true; } catch (e) { ok = fallbackCopy(t); } self.toast(ok ? 'Lista skopiowana' : 'Nie udało się skopiować', !ok); if (ok) track('list_copied', { items: groups.reduce((n, g) => n + g.rows.length, 0) }); } }, el('span', { html: ICON.copy }), 'Kopiuj listę'));
    if (navigator.share) actions.append(el('button', { class: 'btn', type: 'button', onclick: async () => { try { await navigator.share({ title: 'Lista uwag – ' + car.name, text: self.negoText() }); track('list_shared', { items: groups.reduce((n, g) => n + g.rows.length, 0) }); } catch (e) { /* cancelled */ } } }, el('span', { html: ICON.share }), 'Udostępnij'));
    actions.append(el('button', { class: 'btn', type: 'button', onclick: async () => { await self.preparePrint('summary'); track('pdf_printed', { items: groups.reduce((n, g) => n + g.rows.length, 0) }); window.print(); } }, el('span', { html: ICON.print }), 'Pobierz PDF'));
    listCard.append(actions);
    listCard.append(el('p', { class: 'photo-warn' }, el('span', { html: ICON.camera, style: 'width:18px;height:18px;display:inline-flex;flex:none;margin-top:3px' }), el('span', null, 'Zdjęcia zostają tylko w tym telefonie (Safari może wyczyścić dane strony po ok. 7 dniach bez otwierania) – pobierz PDF albo skopiuj listę od razu po oględzinach.')));
    out.push(listCard);
    if (Array.isArray(rules.negotiation_phrases) && rules.negotiation_phrases.length) {
      const card = el('div', { class: 'card' }, el('h2', null, 'Gotowe zdania do rozmowy'), el('p', { class: 'muted' }, 'Bez wyceniania napraw – mówisz o faktach, sprzedawca mówi o cenie.'));
      rules.negotiation_phrases.forEach((p) => card.append(el('blockquote', { class: 'phrase' }, p)));
      out.push(card);
    }
    if (Array.isArray(rules.safe_deal_rules) && rules.safe_deal_rules.length) out.push(el('div', { class: 'card' }, el('h2', null, 'Zasady bezpiecznej transakcji'), el('ul', { class: 'rules' }, rules.safe_deal_rules.map((r) => el('li', null, r)))));
    out.push(this.disclaimer());
    return out;
  };
  function fallbackCopy(text) {
    try { const ta = el('textarea', { style: 'position:fixed;opacity:0;top:0;left:0' }); ta.value = text; document.body.append(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok; } catch (e) { return false; }
  }

  /* ------------------------------------------------------------------ print */
  App.prototype.preparePrint = async function (what) {
    const c = this.content; const car = this.car(); const root = this.printRoot; root.innerHTML = '';
    if (what === 'contract' && c.contract_template) {
      root.append(this.contractDom(true)); return;
    }
    const cnt = this.counts(); const d = this.decide(cnt); const groups = this.negoGroups(); const rules = c.summary_rules || {};
    root.append(el('h1', { text: (c.meta.title || 'Odhacz') + ' – ' + this.listTitle().toLowerCase() }));
    root.append(el('div', { class: 'p-meta' }, car.name + ' · ' + fmtPl(todayStr()) + ' · ' + cnt.answered + '/' + cnt.total + ' punktów'));
    root.append(el('div', { class: 'p-counts' }, el('span', null, el('b', { text: String(cnt.ok) }), ' OK'), el('span', null, el('b', { text: String(cnt.uwaga) }), ' Uwaga'), el('span', null, el('b', { text: String(cnt.problem) }), ' Problem'), el('span', null, el('b', { text: String(cnt.db) }), ' Dealbreakery')));
    root.append(el('div', { class: 'p-decision' }, el('b', { text: d.title }), el('div', null, d.lead), d.reasons.length ? el('ul', null, d.reasons.map((r) => el('li', null, r))) : null));
    const photos = await Photos.map(this.opts.product + '|' + this.state.active + '|');
    if (!groups.length) root.append(el('p', null, 'Brak uwag i problemów.'));
    groups.forEach((g) => {
      root.append(el('h2', { text: g.phase.title }));
      g.rows.forEach((r) => {
        const it = r.item; const box = el('div', { class: 'p-item' });
        box.append(el('div', null, el('span', { class: 'p-state s-' + r.state, text: (STATE_LABEL[r.state] || r.state).toUpperCase() + ': ' }), r.state === 'problem' && it.flag_label ? it.flag_label + ' (' + it.text + ')' : it.text, it.dealbreaker && r.state === 'problem' ? ' · DEALBREAKER' : ''));
        const meta = []; if (r.input != null && r.input !== '') meta.push((it.input && it.input.label ? it.input.label : 'pomiar') + ': ' + inputText(it, r.input)); if (r.note) meta.push('notatka: ' + r.note);
        if (meta.length) box.append(el('div', null, meta.join(' · ')));
        const ph = photos[this.photoKey(it.id)];
        if (ph && ph.length) box.append(el('div', { class: 'p-photos' }, ph.map((u) => el('img', { src: u, alt: '' }))));
        root.append(box);
      });
    });
    if (Array.isArray(rules.negotiation_phrases) && rules.negotiation_phrases.length) root.append(el('h2', null, 'Zdania do rozmowy'), el('ul', null, rules.negotiation_phrases.map((p) => el('li', null, p))));
    if (Array.isArray(rules.safe_deal_rules) && rules.safe_deal_rules.length) root.append(el('h2', null, 'Bezpieczna transakcja'), el('ul', null, rules.safe_deal_rules.map((p) => el('li', null, p))));
    root.append(el('div', { class: 'p-foot' }, (c.meta.disclaimer || '') + ' Wygenerowano w ' + (c.meta.title || 'Odhacz') + ' (Odhacz).'));
  };

  /* ------------------------------------------------------------------ view: call script */
  App.prototype.viewCall = function () {
    const self = this; const s = this.content.seller_call_script;
    if (!s) return [this.topbar('Skrypt rozmowy', ''), this.lockedCard('Ta wersja nie zawiera skryptu rozmowy.')];
    const car = this.car(); car.q = car.q || {};
    const out = [this.topbar('Skrypt rozmowy', '')];
    out.push(el('h1', { style: 'font-size:26px;margin-top:4px' }, 'Zadzwoń, zanim pojedziesz'));
    if (s.intro) out.push(el('div', { class: 'bubble bubble--inline' }, mascot(), el('div', null, el('b', null, 'Hacz: '), s.intro, el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz'))));
    const card = el('div', { class: 'card' });
    (s.questions || []).forEach((q, i) => {
      const id = 'q-' + i; const cb = el('input', { type: 'checkbox', id: id, checked: !!car.q[i] });
      const watch = el('div', { class: 'watch', hidden: true }, el('b', null, 'Uważaj na: '), q.watch_for || '');
      const wrap = el('div', { class: 'q' },
        el('div', { class: 'check' + (car.q[i] ? ' is-done' : '') }, cb, el('label', { for: id, class: 'grow check__text', text: q.q || '' })),
        q.watch_for ? el('button', { class: 'toolbtn', type: 'button', style: 'margin-left:34px', onclick: () => { watch.hidden = !watch.hidden; } }, el('span', { html: ICON.warn }), 'Na co uważać w odpowiedzi') : null,
        watch);
      cb.addEventListener('change', () => { if (cb.checked) car.q[i] = 1; else delete car.q[i]; $('.check', wrap).classList.toggle('is-done', cb.checked); self.persist(); });
      card.append(wrap);
    });
    out.push(card);
    out.push(el('button', { class: 'btn btn--ghost btn--block', type: 'button', onclick: () => { car.q = {}; self.persist(); self.render(); } }, 'Wyczyść odpowiedzi'));
    return out;
  };

  /* ------------------------------------------------------------------ view: glossary / sources */
  App.prototype.viewGlossary = function () {
    const g = this.content.glossary || [];
    const out = [this.topbar('Słowniczek', '')];
    if (!g.length) out.push(this.lockedCard('Brak słowniczka w tej wersji.'));
    else { const dl = el('dl', { class: 'dl' }); g.forEach((e) => dl.append(el('dt', { text: e.term }), el('dd', { text: e.def }))); out.push(el('div', { class: 'card' }, dl)); }
    return out;
  };
  App.prototype.viewSources = function () {
    const s = this.content.sources || [];
    const out = [this.topbar('Skąd to wiemy', '')];
    out.push(el('p', { class: 'muted' }, 'Źródła, na których oparliśmy punkty checklisty. Treść ma charakter edukacyjny.'));
    if (!s.length) out.push(this.lockedCard('Brak listy źródeł w tej wersji.'));
    else out.push(el('div', { class: 'card' }, el('ul', { class: 'sources' }, s.map((x) => el('li', null, x.claim ? el('div', null, x.claim) : null, x.url ? el('a', { href: x.url, target: '_blank', rel: 'noopener noreferrer', text: x.url }) : null)))));
    out.push(this.disclaimer());
    return out;
  };

  /* ------------------------------------------------------------------ view: deadlines (upsell) */
  App.prototype.viewDeadlines = function () {
    const self = this; const car = this.car();
    const out = [this.topbar('Terminy po zakupie', '')];
    if (!this.content.deadlineRows.length) { out.push(this.lockedCard('Moduł terminów jest częścią dodatku „Odhacz Auto: Po zakupie”.', true)); return out; }
    const derived = !car.pd && this.purchaseDate(); const pd = this.purchaseDate() || todayStr();
    out.push(el('h1', { style: 'font-size:26px;margin-top:4px' }, 'Twoje terminy'));
    const dateInp = el('input', { type: 'date', value: pd, 'aria-label': 'Data zakupu' });
    dateInp.addEventListener('change', () => { if (parseDate(dateInp.value)) { car.pd = dateInp.value; self.persist(); self.render(); } });
    out.push(el('div', { class: 'card' }, el('label', { class: 'muted', style: 'display:block;margin-bottom:6px', text: 'Data zakupu (z umowy)' }), el('div', { class: 'dateinput' }, dateInp, el('button', { class: 'btn btn--small', type: 'button', onclick: () => { car.pd = todayStr(); self.persist(); self.render(); } }, 'dzisiaj')),
      el('p', { class: 'small muted', style: 'margin:8px 0 0' }, derived ? 'Wzięta z punktu z datą umowy. Zmień tutaj, jeśli inna.' : (car.pd ? 'Od tej daty liczymy terminy poniżej.' : 'Domyślnie dziś – ustaw datę z umowy.'))));
    const rows = this.resolveDeadlines(pd); const today = todayStr(); const ready = rows.filter((r) => r.due); const pending = rows.filter((r) => !r.due);
    const card = el('div', { class: 'card' });
    ready.forEach((r) => {
      const left = daysBetween(today, r.due);
      const when = el('div', { class: 'when' + (left < 0 ? ' is-past' : left <= 3 ? ' is-soon' : '') }, fmtPl(r.due, { day: 'numeric', month: 'short' }), el('small', null, left < 0 ? 'po terminie' : left === 0 ? 'dziś' : 'za ' + left + ' ' + plural(left, 'dzień', 'dni', 'dni')));
      const tags = el('div', { class: 'row', style: 'gap:6px;margin-top:4px' });
      if (r.soft) tags.append(el('span', { class: 'badge' }, 'zalecenie')); else if (r.top) tags.append(el('span', { class: 'badge badge--red' }, 'termin'));
      if (r.who && /sprzeda/i.test(r.who)) tags.append(el('span', { class: 'badge badge--info' }, 'po stronie sprzedającego'));
      if (r.remind) tags.append(el('span', { class: 'badge' }, 'przypomnienie ' + r.remind + ' dni wcześniej'));
      const details = el('div', { class: 'details' });
      if (r.who && !/sprzeda/i.test(r.who)) details.append(el('span', null, el('b', null, 'Kto: '), r.who, ' · '));
      if (r.how) details.append(el('span', null, el('b', null, 'Jak: '), r.how));
      if (r.applies_if) details.append(el('div', null, el('b', null, 'Dotyczy, gdy: '), r.applies_if));
      if (r.confidence && !/wysok|n\/d/i.test(String(r.confidence))) details.append(el('div', null, el('b', null, 'Pewność: '), r.confidence, ' – potwierdź w urzędzie.'));
      if (r.source) details.append(el('div', null, el('a', { href: r.source, target: '_blank', rel: 'noopener noreferrer', text: 'źródło' })));
      if (r.itemId) details.append(el('div', null, el('button', { class: 'linkbtn', style: 'min-height:32px;padding:2px 0;font-size:16px', type: 'button', onclick: () => self.openItem(r.itemId) }, 'otwórz punkt')));
      card.append(el('div', { class: 'dl-row' }, el('div', null, el('b', { text: r.label }), el('div', { class: 'muted small', text: self.deadlineText(r).replace(/ → .*$/, '') }), tags), when, details));
    });
    if (!ready.length) card.append(el('p', { class: 'empty' }, 'Brak terminów do policzenia.'));
    out.push(card);
    if (pending.length) {
      const pc = el('div', { class: 'card card--soft' }, el('h3', null, 'Do policzenia po wpisaniu daty'), el('p', { class: 'muted' }, 'Te terminy zależą od dat, które wpisujesz w punktach checklisty.'));
      pending.forEach((r) => pc.append(el('div', { class: 'dl-row' }, el('div', null, el('b', { text: r.label }), el('div', { class: 'muted small', text: self.deadlineText(r) })), el('div', null, el('button', { class: 'btn btn--small', type: 'button', onclick: () => self.openItem(r.pendingRef.id) }, 'Wpisz datę')))));
      out.push(pc);
    }
    out.push(el('button', { class: 'btn btn--primary btn--block', type: 'button', disabled: !ready.length, onclick: () => { download('odhacz-terminy.ics', 'text/calendar;charset=utf-8', self.buildIcs(ready)); track('ics_downloaded', { events: ready.length }); self.toast('Plik .ics pobrany – otwórz go w kalendarzu'); } }, el('span', { html: ICON.calendar }), 'Dodaj do kalendarza (.ics)' + (ready.length ? ' – ' + ready.length + ' ' + plural(ready.length, 'termin', 'terminy', 'terminów') : '')));
    out.push(el('p', { class: 'small muted', style: 'margin-top:8px' }, 'Każdy termin ma przypomnienie dzień wcześniej o 9:00 i w dniu terminu' + (ready.some((r) => r.remind) ? ' (a gdzie trzeba – kilka dni wcześniej)' : '') + '. Terminy z brakującą datą dojdą, gdy ją wpiszesz i pobierzesz plik ponownie.'));
    out.push(this.disclaimer());
    return out;
  };
  App.prototype.openItem = function (itemId) {
    const ph = this.content.phaseOfItem[itemId]; if (!ph) return;
    this.openItems[itemId] = true; this.go('phase/' + encodeURIComponent(ph.id));
    setTimeout(() => { const n = this.itemEl(itemId); if (n) n.scrollIntoView({ block: 'center' }); }, 60);
  };
  App.prototype.buildIcs = function (rows) {
    const c = this.content; const stamp = nowIso().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Odhacz//' + (c.meta.title || 'Odhacz') + '//PL', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:' + icsEsc((c.meta.title || 'Odhacz') + ' – terminy')];
    rows.forEach((r) => {
      if (!r.due) return;
      const due = r.due.replace(/-/g, ''); const next = addDays(r.due, 1).replace(/-/g, '');
      const desc = [r.who ? 'Kto: ' + r.who : '', r.how ? 'Jak: ' + r.how : '', r.applies_if ? 'Dotyczy, gdy: ' + r.applies_if : '', r.soft ? 'Zalecenie (nie termin ustawowy).' : '', r.source || '', 'Z aplikacji ' + (c.meta.title || 'Odhacz') + '.'].filter(Boolean).join('\n');
      L.push('BEGIN:VEVENT', 'UID:' + r.id + '-' + due + '@odhacz', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + due, 'DTEND;VALUE=DATE:' + next, 'SUMMARY:' + icsEsc('Odhacz: ' + r.label), 'DESCRIPTION:' + icsEsc(desc), 'TRANSP:TRANSPARENT');
      if (r.remind && r.remind > 1) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER;VALUE=DURATION:-P' + (r.remind - 1) + 'DT15H', 'DESCRIPTION:' + icsEsc('Za ' + r.remind + ' dni: ' + r.label), 'END:VALARM');
      L.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER;VALUE=DURATION:-PT15H', 'DESCRIPTION:' + icsEsc('Jutro: ' + r.label), 'END:VALARM',
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER;VALUE=DURATION:PT9H', 'DESCRIPTION:' + icsEsc('Dziś: ' + r.label), 'END:VALARM', 'END:VEVENT');
    });
    L.push('END:VCALENDAR');
    return L.map(icsFold).join('\r\n') + '\r\n';
  };
  function icsEsc(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
  function icsFold(line) {
    const enc = new TextEncoder(); const out = []; let cur = '', bytes = 0;
    for (const ch of line) { const b = enc.encode(ch).length; if (bytes + b > 74) { out.push(cur); cur = ' ' + ch; bytes = 1 + b; } else { cur += ch; bytes += b; } }
    out.push(cur); return out.join('\r\n');
  }

  /* ------------------------------------------------------------------ view: contract (upsell) */
  App.prototype.viewContract = function () {
    const self = this; const t = this.content.contract_template;
    const out = [this.topbar(t ? (t.title || 'Wzór umowy') : 'Wzór umowy', '')];
    if (!t) { out.push(this.lockedCard('Wzór umowy jest częścią dodatku „Odhacz Auto: Po zakupie”.', true)); return out; }
    out.push(el('div', { class: 'bubble bubble--inline' }, mascot(), el('div', null, el('b', null, 'Hacz: '), 'Wydrukuj dwa egzemplarze albo przepisz do dokumentu. Pola z kropkami wypełniasz długopisem przy sprzedawcy. To wzór edukacyjny, nie porada prawna.', el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz'))));
    out.push(el('button', { class: 'btn btn--primary btn--block mb', type: 'button', onclick: async () => { await self.preparePrint('contract'); track('contract_printed', {}); window.print(); } }, el('span', { html: ICON.print }), 'Drukuj wzór umowy'));
    out.push(el('div', { class: 'card' }, this.contractDom(false)));
    out.push(this.disclaimer());
    return out;
  };
  App.prototype.contractDom = function (forPrint) {
    const t = this.content.contract_template; const wrap = el('div', { class: 'contract' });
    wrap.append(el(forPrint ? 'h1' : 'h2', { text: t.title || 'Umowa kupna-sprzedaży pojazdu' }));
    if (!forPrint && t.intro) wrap.append(el('p', { class: 'muted' }, t.intro));
    if (forPrint) wrap.append(el('div', { class: 'p-meta' }, 'zawarta dnia ………………… w …………………………'));
    (t.sections || []).forEach((s) => {
      wrap.append(el('h3', { text: s.heading || '' }));
      if (Array.isArray(s.fields) && s.fields.length) wrap.append(el('ul', { class: 'fields' }, s.fields.map((f) => el('li', { text: typeof f === 'string' ? f : (f.label || '') }))));
      if (s.note) wrap.append(el('p', { class: 'note' }, s.note));
    });
    if (Array.isArray(t.clauses) && t.clauses.length) {
      wrap.append(el('h3', null, 'Postanowienia'));
      const hasIds = t.clauses.some((cl) => cl && typeof cl === 'object' && cl.id);
      wrap.append(el('ol', { class: 'clauses' + (hasIds ? ' clauses--ids' : '') }, t.clauses.map((cl) => el('li', null, el('div', null, cl && cl.id ? el('b', null, cl.id + '. ') : null, typeof cl === 'string' ? cl : (cl.text || '')), cl && cl.note && !forPrint ? el('p', { class: 'note' }, cl.note) : null))));
    }
    if (forPrint) wrap.append(el('div', { class: 'sig' }, el('div', null, 'Sprzedający'), el('div', null, 'Kupujący')), el('div', { class: 'p-foot' }, (this.content.meta.disclaimer || '') + ' Wzór edukacyjny z ' + (this.content.meta.title || 'Odhacz') + '.'));
    return wrap;
  };

  /* ------------------------------------------------------------------ view: settings */
  App.prototype.viewSettings = function () {
    const self = this; const car = this.car(); const c = this.content;
    const out = [this.topbar('Ustawienia', '', false)];
    const theme = this.state.ui.theme || 'auto';
    const seg = el('div', { class: 'seg', role: 'group', 'aria-label': 'Motyw' });
    [['auto', 'Auto'], ['light', 'Jasny'], ['dark', 'Ciemny']].forEach(([v, l]) => seg.append(el('button', { type: 'button', class: theme === v ? 'is-on' : '', onclick: () => { self.state.ui.theme = v; self.persist(false); self.applyTheme(); self.render(); } }, l)));
    const card1 = el('div', { class: 'card' },
      el('div', { class: 'setrow' }, el('span', null, 'Motyw'), seg),
      el('div', { class: 'setrow' }, el('span', null, 'Dostęp'), el('strong', { 'data-testid': 'access-status', text: this.accessText() })),
      el('div', { class: 'setrow' }, el('span', null, 'Synchronizacja'), el('span', { id: 'sync-status', class: 'muted', style: 'text-align:right', text: this.syncText() })),
      el('div', { class: 'setrow' }, el('span', null, 'Treść'), el('span', { class: 'muted', text: 'v' + (c.meta.version || '1') + ' · ' + c.items.length + ' punktów' })));
    out.push(card1);
    const card2 = el('div', { class: 'card' }, el('h3', null, 'To auto: ' + car.name),
      el('div', { class: 'btnrow' },
        el('button', { class: 'btn', type: 'button', onclick: () => self.sheetRename(car) }, el('span', { html: ICON.edit }), 'Zmień nazwę'),
        el('button', { class: 'btn btn--danger', type: 'button', onclick: () => self.sheetConfirm('Wyzerować „' + car.name + '”?', 'Usuniesz odpowiedzi, pomiary, notatki i zdjęcia tego auta. Inne auta zostają.', 'Wyzeruj', async () => { car.a = {}; car.q = {}; delete car.pd; car.u = nowIso(); await Photos.delPrefix(self.opts.product + '|' + self.state.active + '|'); self.persist(); self.toast('Wyzerowano'); self.render(); }) }, el('span', { html: ICON.trash }), 'Wyzeruj to auto')),
      el('button', { class: 'btn btn--ghost btn--block mt', type: 'button', onclick: () => self.sheetCars() }, el('span', { html: ICON.car }), 'Zarządzaj autami'));
    out.push(card2);
    const fileInp = el('input', { type: 'file', accept: 'application/json,.json', style: 'display:none' });
    fileInp.addEventListener('change', async () => {
      const f = fileInp.files && fileInp.files[0]; if (!f) return;
      try {
        const data = JSON.parse(await readFileText(f));
        if (!data || data.v !== 1 || typeof data.cars !== 'object') throw new Error('format');
        self.sheetConfirm('Wczytać kopię?', 'Zastąpi bieżące auta i odpowiedzi (' + Object.keys(data.cars).length + ' ' + plural(Object.keys(data.cars).length, 'auto', 'auta', 'aut') + ' w pliku). Zdjęcia nie są częścią kopii.', 'Wczytaj', () => { self.state.cars = data.cars; self.state.active = data.active && data.cars[data.active] ? data.active : Object.keys(data.cars)[0]; self.ensureCar(); self.persist(); self.toast('Kopia wczytana'); self.render(); });
      } catch (e) { self.toast('To nie jest kopia Odhacz (JSON)', true); }
    });
    const card3 = el('div', { class: 'card' }, el('h3', null, 'Kopia zapasowa'), el('p', { class: 'muted' }, 'Odpowiedzi, pomiary i notatki wszystkich aut jako plik JSON. Zdjęcia zostają tylko w tym telefonie.'),
      el('div', { class: 'btnrow' },
        el('button', { class: 'btn', type: 'button', onclick: () => { download('odhacz-' + self.opts.product + '-kopia-' + todayStr() + '.json', 'application/json', JSON.stringify({ v: 1, t: self.state.t, active: self.state.active, cars: self.state.cars, product: self.opts.product, exported: nowIso() }, null, 1)); self.toast('Kopia pobrana'); } }, el('span', { html: ICON.download }), 'Eksport JSON'),
        el('button', { class: 'btn', type: 'button', onclick: () => fileInp.click() }, el('span', { html: ICON.upload }), 'Import JSON')), fileInp);
    out.push(card3);
    out.push(el('div', { class: 'card card--soft' }, el('p', { class: 'small', style: 'margin:0' }, 'Hacz to asystent AI marki Odhacz – nie mechanik, nie rzeczoznawca. Ilustracje i awatar wygenerowane cyfrowo. ', el('a', { href: '/legal/regulamin.html' }, 'Regulamin'), ' · ', el('a', { href: '/legal/polityka-prywatnosci.html' }, 'Prywatność'), ' · ', el('a', { href: this.opts.shopUrl }, 'Sklep'))));
    out.push(this.disclaimer());
    return out;
  };

  /* ------------------------------------------------------------------ locked / error cards */
  App.prototype.lockedCard = function (msg, shop) {
    return el('div', { class: 'card locked' }, mascot(), el('h2', null, 'Tego tu nie ma'), el('p', { class: 'muted' }, msg), shop ? el('a', { class: 'btn btn--primary', href: this.opts.shopUrl }, 'Wróć do sklepu') : el('button', { class: 'btn', type: 'button', onclick: () => this.go('') }, 'Wróć na start'));
  };
  App.prototype.renderLoadError = function (err) {
    const self = this; this.root.innerHTML = '';
    const locked = err && err.locked;
    this.root.append(el('div', { class: 'app' }, el('header', { class: 'topbar' }, el('span', { class: 'mascot', style: 'width:36px;height:36px;margin:0 6px', html: HACZ_SVG }), el('div', { class: 'topbar__title' }, 'Odhacz')),
      el('div', { class: 'card locked' }, mascot(), el('h2', null, locked ? 'Ten obszar jest dostępny po zakupie' : 'Nie udało się wczytać treści'),
        el('p', { class: 'muted' }, locked ? 'Jeśli już kupiłeś/aś, otwórz link z e-maila – ustawi dostęp na tym urządzeniu.' : 'Sprawdź połączenie z internetem i spróbuj jeszcze raz. Po pierwszym otwarciu treść działa też offline.'),
        el('div', { class: 'btnrow' }, locked ? el('a', { class: 'btn btn--primary', href: this.opts.shopUrl }, 'Wróć do sklepu') : el('button', { class: 'btn btn--primary', type: 'button', onclick: () => self.init() }, 'Spróbuj ponownie'), el('a', { class: 'btn', href: this.opts.shopUrl }, 'Strona główna')))));
  };

  /* ------------------------------------------------------------------ sheets, toasts, onboarding */
  App.prototype.sheet = function (build) {
    const self = this;
    const back = el('div', { class: 'backdrop', onclick: (e) => { if (e.target === back) close(); } });
    const sh = el('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true' }, el('div', { class: 'sheet__grip' }));
    function close() { back.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    build(sh, close);
    back.append(sh); document.body.append(back);
    const first = sh.querySelector('input,button'); if (first) setTimeout(() => first.focus(), 30);
    return close;
  };
  App.prototype.sheetDealbreaker = function (it, row) {
    const self = this;
    if (navigator.vibrate) { try { navigator.vibrate([40, 40, 40]); } catch (e) { /* ignore */ } }
    this.sheet((sh, close) => {
      sh.append(el('div', { class: 'row' }, el('span', { class: 'badge badge--db' }, el('span', { html: ICON.warn, style: 'width:16px;height:16px;display:inline-flex' }), 'dealbreaker')), el('h2', null, 'To zwykle koniec oglądania.'), el('p', null, 'Chcesz zobaczyć dlaczego?'), el('p', { class: 'muted' }, it.text),
        el('div', { class: 'btnrow' },
          el('button', { class: 'btn btn--primary', type: 'button', onclick: () => { close(); self.openItems[it.id] = true; row.classList.add('is-open'); const h = $('.item__head', row); if (h) h.setAttribute('aria-expanded', 'true'); self.loadPhotos(it, row); row.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }, 'Pokaż dlaczego'),
          el('button', { class: 'btn', type: 'button', onclick: close }, 'Wiem, idę dalej')));
    });
  };
  App.prototype.sheetConfirm = function (title, text, label, onYes) {
    this.sheet((sh, close) => {
      sh.append(el('h2', { text: title }), el('p', { class: 'muted' }, text), el('div', { class: 'btnrow' }, el('button', { class: 'btn btn--danger', type: 'button', onclick: () => { close(); onYes(); } }, label), el('button', { class: 'btn', type: 'button', onclick: close }, 'Anuluj')));
    });
  };
  App.prototype.sheetRename = function (car, onDone) {
    const self = this;
    this.sheet((sh, close) => {
      const inp = el('input', { type: 'text', maxlength: '40', value: car.name, 'aria-label': 'Nazwa auta', placeholder: 'np. Octavia 2016, srebrna' });
      const save = () => { const v = inp.value.trim().slice(0, 40); if (v) { car.name = v; car.u = nowIso(); self.persist(); } close(); if (onDone) onDone(); else self.render(); };
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') save(); });
      sh.append(el('h2', null, 'Nazwa auta'), el('p', { class: 'muted' }, 'Np. „Auto 1 – Octavia 2016”. Pojawi się na liście uwag i w PDF.'), inp, el('div', { class: 'btnrow' }, el('button', { class: 'btn btn--primary', type: 'button', onclick: save }, 'Zapisz'), el('button', { class: 'btn', type: 'button', onclick: close }, 'Anuluj')));
      setTimeout(() => { inp.focus(); inp.select(); }, 40);
    });
  };
  App.prototype.sheetCars = function () {
    const self = this;
    this.sheet((sh, close) => {
      const render = () => {
        sh.innerHTML = ''; sh.append(el('div', { class: 'sheet__grip' }), el('h2', null, 'Twoje auta'), el('p', { class: 'muted' }, 'Każde auto ma własne odpowiedzi, zdjęcia i listę uwag.'));
        const ul = el('ul', { class: 'carlist' });
        Object.keys(self.state.cars).forEach((id) => {
          const car = self.state.cars[id]; const n = Object.keys(car.a || {}).length; const cnt = self.counts(id);
          ul.append(el('li', null,
            el('button', { class: 'name' + (id === self.state.active ? ' is-active' : ''), type: 'button', onclick: () => { self.state.active = id; self.persist(); close(); self.render(); } }, el('span', { html: id === self.state.active ? ICON.check : ICON.car, style: 'width:22px;height:22px;display:inline-flex;flex:none' }), el('span', { class: 'grow' }, car.name, el('span', { class: 'sub', text: n + ' ' + plural(n, 'odpowiedź', 'odpowiedzi', 'odpowiedzi') + (cnt.problem ? ' · ' + cnt.problem + ' ' + plural(cnt.problem, 'flaga', 'flagi', 'flag') : '') }))),
            el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Zmień nazwę', onclick: () => { close(); self.sheetRename(car, () => self.sheetCars()); } }, el('span', { html: ICON.edit })),
            el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Usuń auto', onclick: () => { close(); self.sheetConfirm('Usunąć „' + car.name + '”?', 'Znikną odpowiedzi, notatki i zdjęcia tego auta.', 'Usuń', async () => { await Photos.delPrefix(self.opts.product + '|' + id + '|'); delete self.state.cars[id]; if (self.state.active === id) self.state.active = null; self.ensureCar(); self.persist(); self.toast('Usunięto'); self.render(); }); } }, el('span', { html: ICON.trash }))));
        });
        sh.append(ul);
        sh.append(el('div', { class: 'btnrow' }, el('button', { class: 'btn btn--primary', type: 'button', onclick: () => { const id = uid(); const n = Object.keys(self.state.cars).length + 1; self.state.cars[id] = { name: 'Auto ' + n, created: nowIso(), a: {} }; self.state.active = id; self.persist(); close(); self.sheetRename(self.state.cars[id]); } }, el('span', { html: ICON.plus }), 'Dodaj auto'), el('button', { class: 'btn', type: 'button', onclick: close }, 'Zamknij')));
      };
      render();
    });
  };
  App.prototype.toast = function (msg, isError) {
    const old = $('.toast'); if (old) old.remove();
    const t = el('div', { class: 'toast' + (isError ? ' is-error' : ''), role: 'status', text: msg }); document.body.append(t);
    setTimeout(() => { if (t.parentNode) t.remove(); }, 2600);
  };
  App.prototype.showOnboarding = function () {
    const self = this; let step = 0;
    const phs = this.content.phases; const upsell = this.opts.kind === 'upsell';
    const path = phs.length > 1 ? 'od „' + phs[0].title + '” po „' + phs[phs.length - 1].title + '”' : '';
    const screens = [
      { title: 'Jak to działa', text: phs.length + ' ' + plural(phs.length, 'etap', 'etapy', 'etapów') + ' po kolei' + (path ? ', ' + path : '') + '. Każdy punkt mówi, co sprawdzić i jak' + (upsell ? ' – bez prawnika.' : ' – bez bycia mechanikiem.'), demo: 'phases' },
      { title: 'Odpowiadasz jednym tapnięciem', text: 'OK, Uwaga, Problem albo Pomiń. Dealbreakery są oznaczone – gdy trafisz, powiemy, że to zwykle koniec' + (upsell ? ' rozmowy o zakupie.' : ' oglądania.'), demo: 'answers' },
      upsell && this.content.deadlineRows.length
        ? { title: 'Terminy liczą się same', text: 'Wpisujesz datę z umowy, dostajesz daty PCC-3, rejestracji i końca OC – z plikiem do kalendarza. Na końcu lista braków do skopiowania lub PDF.', demo: 'flags' }
        : { title: 'Na końcu dostajesz listę', text: 'Licznik czerwonych flag cały czas na dole. W podsumowaniu: decyzja z uzasadnieniem i gotowa lista uwag do negocjacji – do skopiowania lub PDF.', demo: 'flags' },
    ];
    const ov = el('div', { class: 'onb', role: 'dialog', 'aria-modal': 'true' });
    // Returning user on a new device (progress pulled from the server): land on Home, not Quick start.
    const finish = () => { self.state.ui.onb = 1; self.persist(false); ov.remove(); self.go(self.counts().answered > 0 ? '' : 'quick'); };
    const render = () => {
      const s = screens[step]; ov.innerHTML = '';
      ov.append(el('button', { class: 'onb__skip', type: 'button', onclick: finish }, 'Pomiń'));
      let demo = null;
      if (s.demo === 'answers') { demo = el('div', { class: 'onb__demo' }); ['ok', 'uwaga', 'problem', 'pomin'].forEach((st) => { const b = el('button', { class: 'ans ans--' + st + (st === 'ok' ? ' is-on' : ''), type: 'button', text: STATE_LABEL[st] }); b.addEventListener('click', () => { demo.querySelectorAll('.ans').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); }); demo.append(b); }); }
      if (s.demo === 'flags') demo = el('div', { class: 'mockflag' }, el('b', null, '3'), el('span', null, 'czerwone flagi · 1 dealbreaker'));
      ov.append(el('div', { class: 'onb__body' }, mascot(), el('h2', { text: s.title }), el('p', null, s.text), demo));
      ov.append(el('div', { class: 'onb__dots' }, screens.map((x, i) => el('i', { class: i === step ? 'is-on' : '' }))));
      ov.append(el('button', { class: 'btn btn--lime', type: 'button', onclick: () => { if (step < screens.length - 1) { step++; render(); } else finish(); } }, step < screens.length - 1 ? 'Dalej' : 'Zaczynam'));
    };
    render(); document.body.append(ov);
  };
})();
