/* Odhacz – generic checklist engine (vanilla JS, no build step).
 * Renders any content JSON in the Odhacz schema (meta, quick_start, phases/sections/items, seller_call_script,
 * summary_rules, contract_template, deadlines, glossary, sources) as a mobile-first tool with per-car state,
 * red-flag counter, negotiation list, print/PDF, .ics deadlines, local photos (IndexedDB) and cross-device
 * progress sync via window.Access (platform contract, README §b). v1.1: quick filter (#/filtr), paint map (SVG),
 * inspection report (#/raport/<carId>), car comparison (#/porownaj), extended seller call script.
 * v1.2: phase 1 becomes the wizard „Zanim pojedziesz” (#/start, one screen per step) with the seller call script embedded
 * in the „Rozmowa” step (seller type, one opening line per type, 12 answerable questions counted as the group
 * „Rozmowa ze sprzedawcą”, agreements with `say` lines); home = one „Kontynuuj” card + phase list + „Więcej” sheet.
 * Everything wizard/script-related is conditional on the content (`seller_call_script`), so the upsell app keeps the classic views.
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
    ext: svg('<path d="M14 4h6v6M20 4l-9 9M19 14v6H4V5h6"/>'),
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

  /* ------------------------------------------------------------------ paint map: body panels */
  // Top view, front up. `panel` on a numeric item maps it to one of these keys; Auto content without the field falls back to ids.
  const PANELS = [
    { key: 'roof', label: 'Dach' }, { key: 'hood', label: 'Maska' }, { key: 'trunk', label: 'Klapa bagażnika' },
    { key: 'fl_fender', label: 'Błotnik przedni lewy' }, { key: 'fr_fender', label: 'Błotnik przedni prawy' },
    { key: 'fl_door', label: 'Drzwi przednie lewe' }, { key: 'fr_door', label: 'Drzwi przednie prawe' },
    { key: 'rl_door', label: 'Drzwi tylne lewe' }, { key: 'rr_door', label: 'Drzwi tylne prawe' },
    { key: 'rl_quarter', label: 'Ćwiartka tylna lewa' }, { key: 'rr_quarter', label: 'Ćwiartka tylna prawa' },
    { key: 'sills', label: 'Słupki i progi' },
  ];
  const PANEL_INDEX = {}; PANELS.forEach((p) => { PANEL_INDEX[p.key] = p; });
  const PANEL_FALLBACK = { p3s2i1: 'roof', p3s2i2: 'hood', p3s2i3: 'fl_fender', p3s2i4: 'fl_door', p3s2i5: 'rl_door', p3s2i6: 'rl_quarter', p3s2i7: 'trunk', p3s2i8: 'rr_quarter', p3s2i9: 'rr_door', p3s2i10: 'fr_door', p3s2i11: 'fr_fender', p3s2i12: 'sills' };
  const PAINT_LEVEL = { ok: 'w normie', warn: 'podwyższony', bad: 'wyraźnie wyższy', none: 'brak odczytu', na: 'nie dotyczy' };
  // viewBox 0 0 240 440 – [x, y, w, h] per panel (sills = two strips, value drawn on the left one).
  const PANEL_GEOM = {
    hood: [[68, 26, 104, 86]], roof: [[68, 154, 104, 108]], trunk: [[68, 300, 104, 92]],
    fl_fender: [[42, 26, 24, 100]], fr_fender: [[174, 26, 24, 100]],
    fl_door: [[42, 128, 24, 84]], fr_door: [[174, 128, 24, 84]],
    rl_door: [[42, 214, 24, 84]], rr_door: [[174, 214, 24, 84]],
    rl_quarter: [[42, 300, 24, 92]], rr_quarter: [[174, 300, 24, 92]],
    sills: [[30, 128, 10, 170], [200, 128, 10, 170]],
  };
  const fmtNum = (n) => { const r = Math.round(n * 10) / 10; try { return r.toLocaleString('pl-PL'); } catch (e) { return String(r); } };
  const ratioText = (r) => fmtNum(r) + '×';
  const NO_FLAGBAR = ['settings', 'sources', 'glossary', 'raport', 'porownaj'];

  /* ------------------------------------------------------------------ content */
  const STATE_LABEL = { ok: 'OK', uwaga: 'Uwaga', problem: 'Problem', pomin: 'Pomiń' };
  const DEFAULT_STATES = ['ok', 'uwaga', 'problem', 'pomin'];
  const fmtKm = (n) => { try { return Math.round(n).toLocaleString('pl-PL') + ' km'; } catch (e) { return Math.round(n) + ' km'; } };
  /** Automatic evaluation of typed values. Each rule gets (app, item, car, carId) and returns { state, text, force?, setVin? } or null (no input yet).
   * state null = cannot decide yet (text explains what is missing). `force` = a mixed (choice + auto) item is overridden regardless of the tap. */
  const AUTO_RULES = {
    vin_present: function (app, it, car) {
      const vin = String(car.vin || '');
      if (vin.length === 17) return { state: 'ok', text: 'VIN masz: ' + vin + '. Sprawdzisz go w Historii pojazdu (krok 2) i na aucie w trzech miejscach (etap 2).' };
      const m = app.intakeStatus(car, 'vin');
      return { state: null, text: m === 'refused' ? 'Sprzedawca odmówił podania VIN — zaznacz „Odmówił podania”.' : m === 'missing' ? 'VIN zaznaczony jako „nie ma” — dostaniesz gotowe zdanie w kroku „Rozmowa”.' : 'Wpisz VIN w „Danych z ogłoszenia” wyżej albo zaznacz tam „nie ma”.' };
    },
    km_per_year: function (app, it, car) {
      const odo = app.intakeNum(car, 'odo_ad'); const year = app.intakeNum(car, 'year');
      if (odo == null || year == null) return { state: null, text: 'Wpisz przebieg i rocznik w „Danych z ogłoszenia” wyżej — policzę kilometry na rok.' };
      const now = new Date(); const nowY = now.getFullYear() + now.getMonth() / 12;
      if (year < 1950 || year > now.getFullYear() + 1) return { state: null, text: 'Sprawdź rocznik (' + year + ') — wygląda na literówkę.' };
      const age = Math.max(0.5, nowY - year - 0.5); const kpy = Math.round(odo / age / 100) * 100; const k = fmtKm(kpy) + '/rok';
      if (kpy < 7000) return { state: 'uwaga', text: '≈ ' + k + ' — bardzo mało jak na wiek. Jutro porównaj z zużyciem kierownicy, fotela i pedałów (etap 4) i z odczytami w Historii pojazdu.' };
      if (kpy > 25000) return { state: 'uwaga', text: '≈ ' + k + ' — dużo. Zapytaj o flotę, taxi, przedstawiciela handlowego; poproś o faktury serwisowe z przebiegami.' };
      return { state: 'ok', text: '≈ ' + k + ' — typowo jak na wiek auta.' };
    },
    price_vs_market: function (app, it, car) {
      const m = app.numInput(it.id, car); if (m == null) return null;
      const price = app.intakeNum(car, 'price'); if (price == null) return { state: null, text: 'Wpisz cenę z ogłoszenia w „Danych z ogłoszenia”, żeby porównać.' };
      const r = price / m; const pct = Math.round(Math.abs(1 - r) * 100);
      if (r <= 0.75) return { state: 'uwaga', text: 'Ok. ' + pct + '% taniej niż podobne oferty. Tak duża różnica ma powód — jutro szukasz go w dokumentach, lakierze i historii.' };
      if (r <= 0.88) return { state: 'uwaga', text: 'Ok. ' + pct + '% taniej niż podobne oferty. Zapytaj wprost o powód.' };
      if (r >= 1.15) return { state: 'ok', text: 'Ok. ' + pct + '% drożej niż podobne oferty — argument w negocjacji, nie wada.' };
      return { state: 'ok', text: 'Cena w rynku (różnica ok. ' + pct + '%).' };
    },
    odo_registry: function (app, it, car) {
      const r = app.numInput(it.id, car); if (r == null) return null;
      const ad = app.intakeNum(car, 'odo_ad');
      if (ad != null && ad + 500 < r) return { state: 'problem', force: true, text: 'W ogłoszeniu ' + fmtKm(ad) + ', a przy ostatnim badaniu już ' + fmtKm(r) + ' — ogłoszenie podaje mniej niż rejestr. To wygląda na cofnięty licznik: zapytaj i nie jedź bez wyjaśnienia.' };
      return { state: null, text: 'Zapisane: ' + fmtKm(r) + '. Jutro licznik musi pokazać co najmniej tyle' + (ad != null ? '; ogłoszenie (' + fmtKm(ad) + ') się z tym zgadza.' : '.') };
    },
    odo_dashboard: function (app, it, car) {
      const v = app.numInput(it.id, car); if (v == null) return null;
      const reg = app.registryOdo(car); const ad = app.intakeNum(car, 'odo_ad');
      if (reg != null && v < reg) return { state: 'problem', text: 'Licznik ' + fmtKm(v) + ' pokazuje MNIEJ niż ostatni odczyt z badania w Historii pojazdu (' + fmtKm(reg) + '). To cofnięty licznik — kończysz oględziny.' };
      if (ad != null && v + 300 < ad) return { state: 'problem', text: 'Licznik ' + fmtKm(v) + ' pokazuje mniej niż ogłoszenie (' + fmtKm(ad) + '). Auto nie jeździ do tyłu — pytaj, skąd różnica, i nie kupuj bez wyjaśnienia.' };
      if (ad != null && v > ad + 3000) return { state: 'uwaga', text: 'Licznik ' + fmtKm(v) + ' — o ' + fmtKm(v - ad) + ' więcej niż w ogłoszeniu. Ogłoszenie nieaktualne albo auto dużo jeździ; zapytaj.' };
      if (reg == null && ad == null) return { state: 'uwaga', text: 'Zapisane ' + fmtKm(v) + ', ale nie mam z czym porównać: brak przebiegu z ogłoszenia (krok 1) i odczytu z Historii pojazdu (krok 2). Bez tego cofniętego licznika nie wykryjesz.' };
      return { state: 'ok', text: 'Licznik ' + fmtKm(v) + (reg != null ? ' ≥ ostatnie badanie (' + fmtKm(reg) + ')' : '') + (ad != null ? (reg != null ? ', ' : ' — ') + 'zgodny z ogłoszeniem (' + fmtKm(ad) + ')' : '') + '.' };
    },
    vin_doc: function (app, it, car) {
      const v = app.strInput(it.id, car); if (!v) return null;
      if (v.length !== 17) return { state: null, text: v.length + '/17 znaków — VIN ma dokładnie 17 (bez liter I, O, Q).' };
      const seller = String(car.vin || '');
      if (seller.length === 17) return seller === v ? { state: 'ok', text: 'Zgodny z VIN-em od sprzedawcy. Teraz ten sam ciąg na aucie: podszybie, tabliczka, nadwozie.' } : { state: 'problem', text: 'INNY niż VIN podany przed spotkaniem (' + seller + '). Zapytaj dlaczego; bez prostego wyjaśnienia (literówka w SMS-ie) kończysz.' };
      return { state: 'ok', text: 'Zapisany. Porównasz go z autem w następnej sekcji.', setVin: v };
    },
    inspection_valid: function (app, it, car) {
      const ds = app.dateInputOf(it.id, car); if (!ds) return null; const left = daysBetween(todayStr(), ds);
      if (left < 0) return { state: 'problem', text: 'Badanie nieważne od ' + Math.abs(left) + ' ' + plural(Math.abs(left), 'dnia', 'dni', 'dni') + '. Auto nie powinno wyjechać na jazdę próbną; to koszt i pytanie, dlaczego stało.' };
      if (left <= 60) return { state: 'uwaga', text: 'Badanie kończy się za ' + left + ' ' + plural(left, 'dzień', 'dni', 'dni') + ' (' + fmtPl(ds) + ') — świeże badanie przed odbiorem to dobry punkt do negocjacji.' };
      return { state: 'ok', text: 'Badanie ważne do ' + fmtPl(ds) + '.' };
    },
    oc_valid: function (app, it, car) {
      const ds = app.dateInputOf(it.id, car); if (!ds) return null; const left = daysBetween(todayStr(), ds);
      if (left < 0) return { state: 'problem', text: 'OC nieważne od ' + Math.abs(left) + ' ' + plural(Math.abs(left), 'dnia', 'dni', 'dni') + ' — jazda próbna wyłącznie na Twoje ryzyko; nie jedź.' };
      if (left <= 14) return { state: 'uwaga', text: 'OC kończy się za ' + left + ' ' + plural(left, 'dzień', 'dni', 'dni') + ' — po zakupie od razu nowa polisa.' };
      return { state: 'ok', text: 'OC ważne do ' + fmtPl(ds) + '.' };
    },
    prod_year: function (app, it, car) {
      const y = app.numInput(it.id, car); if (y == null) return null; const ad = app.intakeNum(car, 'year');
      if (ad == null) return { state: 'ok', text: 'Zapisany rok ' + y + '. Nie mam rocznika z ogłoszenia (krok 1) do porównania.' };
      if (y < ad) { const n = ad - y; return { state: 'problem', text: 'W dowodzie ' + y + ', w ogłoszeniu ' + ad + ' — rocznik zawyżony o ' + n + ' ' + plural(n, 'rok', 'lata', 'lat') + '. To inne auto (i inna cena) niż obiecywane.' }; }
      if (y > ad) return { state: 'ok', text: 'W dowodzie ' + y + ' — nowszy niż w ogłoszeniu (' + ad + ').' };
      return { state: 'ok', text: 'Rok produkcji ' + y + ' zgodny z ogłoszeniem.' };
    },
    keys: function (app, it, car) {
      const n = app.numInput(it.id, car); if (n == null) return null;
      if (n >= 2) return { state: 'ok', text: n + ' ' + plural(n, 'kluczyk', 'kluczyki', 'kluczyków') + ' — komplet. Sprawdź każdy: zamek, pilot, rozruch.' };
      if (n >= 1) return { state: 'uwaga', text: 'Jeden kluczyk: koszt dorobienia i pytanie, gdzie jest drugi. Punkt do negocjacji.' };
      return { state: 'problem', text: 'Bez sprawnego kluczyka nie odbierzesz auta.' };
    },
    dot_year: function (app, it, car) {
      const y = app.numInput(it.id, car); if (y == null) return null; const age = new Date().getFullYear() - y;
      if (y < 1990 || age < 0) return { state: null, text: 'Sprawdź rok: DOT to 4 cyfry, dwie ostatnie to rok (np. 2319 = 2019).' };
      if (age >= 10) return { state: 'problem', text: 'Najstarsza opona ma ' + age + ' lat — do wymiany od razu, niezależnie od bieżnika (producenci mówią o ok. 10 latach jako granicy).' };
      if (age >= 6) return { state: 'uwaga', text: 'Najstarsza opona ma ' + age + ' lat — obejrzyj pęknięcia boków i planuj wymianę.' };
      return { state: 'ok', text: 'Najstarsza opona z ' + y + ' r. (' + age + ' ' + plural(age, 'rok', 'lata', 'lat') + ').' };
    },
    tread_mm: function (app, it, car) {
      const t = app.numInput(it.id, car); if (t == null) return null;
      if (t < 1.6) return { state: 'problem', text: fmtNum(t) + ' mm — poniżej prawnego minimum 1,6 mm. Opony do wymiany przed jazdą.' };
      if (t < 3) return { state: 'uwaga', text: fmtNum(t) + ' mm — blisko minimum; planuj wymianę (letnie ok. 3 mm, zimowe ok. 4 mm).' };
      if (t < 4) return { state: 'ok', text: fmtNum(t) + ' mm — w porządku dla letnich; zimowe poniżej 4 mm już do wymiany.' };
      return { state: 'ok', text: fmtNum(t) + ' mm — dobry bieżnik.' };
    },
    paint_panel: function (app, it, car, carId) {
      const v = app.numInput(it.id, car); if (v == null) return null;
      const key = app.content.panelOfItem[it.id]; const pd = app.paintData(carId); const p = PANEL_INDEX[key]; const name = p ? p.label : 'element';
      if (key === 'roof') return { state: 'ok', text: 'Dach ' + fmtNum(v) + ' µm — to Twoja baza. Pozostałe elementy porównuję z nią.' };
      if (pd.baseSrc !== 'roof' && pd.count < 3) return { state: null, text: 'Zmierz też dach — bez bazy nie ocenię ' + fmtNum(v) + ' µm.' };
      const lv = pd.levels[key]; const base = pd.baseline; const ratio = base ? ratioText(v / base) : '';
      const bs = pd.baseSrc === 'roof' ? 'dachu' : 'mediany';
      if (lv === 'bad') return { state: 'problem', text: name + ': ' + fmtNum(v) + ' µm, ' + ratio + ' ' + bs + ' (' + fmtNum(base) + ' µm) — wyraźnie wyższy: szpachla lub naprawa. Zrób zdjęcie i zapytaj, co tu było.' };
      if (lv === 'warn') return { state: 'uwaga', text: name + ': ' + fmtNum(v) + ' µm, ' + ratio + ' ' + bs + ' (' + fmtNum(base) + ' µm) — podwyższony: element lakierowany. Argument w rozmowie o cenie.' };
      return { state: 'ok', text: name + ': ' + fmtNum(v) + ' µm, ' + ratio + ' ' + bs + ' — w normie.' };
    },
  };
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
          it.ctrl = normCtrl(it.ctrl, c.answer_states);
          ph.items.push(it); c.items.push(it); c.itemById[it.id] = it; c.phaseOfItem[it.id] = ph;
        });
      });
    });
    // Quick filter („Szybki filtr”): items flagged `quick`; without any, the dealbreakers. One source of truth: same ids, same answers.
    c.quickExplicit = c.items.some((it) => it.quick === true);
    c.quickItems = c.quickExplicit ? c.items.filter((it) => it.quick === true) : c.items.filter((it) => it.dealbreaker);
    c.isQuick = {}; c.quickItems.forEach((it) => { c.isQuick[it.id] = true; });
    c.quickByPhase = c.phases.map((ph) => ({ phase: ph, items: ph.items.filter((it) => c.isQuick[it.id]) })).filter((g) => g.items.length);
    // Paint map: numeric items mapped to body panels (`panel`, fallback by well-known Auto ids). First item wins per panel.
    c.panelItem = {}; c.panelOfItem = {}; c.paintSection = null;
    c.items.forEach((it) => {
      if (!it.input || it.input.type !== 'number') return;
      const key = PANEL_INDEX[it.panel] ? it.panel : PANEL_FALLBACK[it.id];
      if (!key || c.panelItem[key]) return;
      c.panelItem[key] = it; c.panelOfItem[it.id] = key;
    });
    c.hasPaint = Object.keys(c.panelItem).length > 0;
    if (c.hasPaint) {
      const first = c.panelItem.roof || c.panelItem[Object.keys(c.panelItem)[0]];
      c.phases.some((ph) => ph.sections.some((sec) => { if (sec.items.indexOf(first) >= 0) { c.paintSection = sec; return true; } return false; }));
    }
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
    // Seller call script → virtual items `call:qN` (one per question). They are answered like any item, live in car.a, and are
    // counted/reported as the group „Rozmowa ze sprzedawcą”. Not in c.items (no inputs, no photos, no quick filter).
    c.callItems = []; c.callById = {};
    const scr = c.seller_call_script && typeof c.seller_call_script === 'object' ? c.seller_call_script : null;
    if (scr && Array.isArray(scr.questions)) {
      scr.questions.forEach((q, i) => {
        if (!q || typeof q.q !== 'string' || !q.q.trim()) return;
        const it = { id: 'call:q' + (i + 1), n: c.callItems.length + 1, call: true, text: q.q, watch_for: q.watch_for || '', if_dodges: q.if_dodges || '', flag_label: q.flag_label || ('Rozmowa: ' + q.q), severity: 'yellow', tags: ['rozmowa'], photo: false, input: null, ctrl: normCtrl(q.ctrl, c.answer_states), ref: Array.isArray(q.ref) ? q.ref : [] };
        c.callItems.push(it); c.callById[it.id] = it; c.itemById[it.id] = it;
        if (c.phases[0]) c.phaseOfItem[it.id] = c.phases[0];
      });
    }
    c.callPhase = { id: 'call', title: 'Rozmowa ze sprzedawcą', items: c.callItems, virtual: true };
    // Intake („Dane z ogłoszenia”): typed fields kept per car in car.d (VIN in car.vin); missing ones become sentences in the call step.
    const ik = c.intake && typeof c.intake === 'object' ? c.intake : null;
    c.intake = ik && Array.isArray(ik.fields) && ik.fields.length ? Object.assign({}, ik, { fields: ik.fields.filter((f) => f && f.id && f.type), byId: {} }) : null;
    if (c.intake) c.intake.fields.forEach((f) => { c.intake.byId[f.id] = f; });
    c.autoItems = c.items.filter((it) => it.ctrl.auto);
    c.wizard = buildWizard(c, scr);
    return c;
  }
  /** Per-item control: `choice` (options → states, optional `auto` rule and skip label) or `auto` (state computed from the input by a rule).
   * Without `ctrl` an item keeps the classic OK / Uwaga / Problem / Pomiń bar. */
  function normCtrl(raw, states) {
    const skipDefault = 'Pomiń';
    if (!raw || typeof raw !== 'object') return { type: 'choice', options: states.filter((st) => st !== 'pomin').map((st) => ({ label: STATE_LABEL[st] || st, state: st, v: st })), skip: states.indexOf('pomin') >= 0 ? skipDefault : false, auto: null, generic: true };
    const type = raw.type === 'auto' ? 'auto' : 'choice';
    const opts = type === 'choice' && Array.isArray(raw.options) ? raw.options.filter((o) => o && typeof o.label === 'string' && states.indexOf(o.state) >= 0).map((o, i) => ({ label: o.label, state: o.state, v: typeof o.v === 'string' && o.v ? o.v : o.state + (i ? String(i) : '') })) : [];
    if (type === 'choice' && !opts.length) return normCtrl(null, states);
    return { type: type, options: opts, skip: raw.skip === false ? false : (typeof raw.skip === 'string' && raw.skip.trim() ? raw.skip.trim() : skipDefault), auto: typeof raw.auto === 'string' && AUTO_RULES[raw.auto] ? raw.auto : null, generic: false };
  }
  /** Wizard „Zanim pojedziesz”: phase 1 split into one screen per section; the call-script section merges with the agreements
   * section into the „Rozmowa” step. Content without a call script (the upsell) gets no wizard and keeps the classic phase view. */
  function buildWizard(c, scr) {
    const ph = c.phases[0];
    if (!scr || !ph || !ph.sections.length) return null;
    const agreeIds = (Array.isArray(scr.agreements) ? scr.agreements : []).filter((id) => typeof id === 'string' && c.itemById[id]);
    const agreeSec = ph.sections.find((sec) => sec.items.some((it) => agreeIds.indexOf(it.id) >= 0)) || null;
    const callSec = ph.sections.find((sec) => sec !== agreeSec && /telefon|rozmow|zadzwo/i.test(sec.title || ''))
      || ph.sections.find((sec) => sec !== agreeSec && sec.items.some((it) => /skrypt|zadzwo/i.test(it.text || ''))) || null;
    const shortTitle = (sec) => { const t = String(sec.title || '').replace(/\s*[(:—–].*$/, '').trim(); return /\bVIN\b/i.test(t) ? 'VIN i historia' : (/^Historia pojazdu/i.test(t) ? 'Historia' : (t || 'Krok')); };
    const steps = []; const stepOfItem = {};
    const isAgree = (it) => agreeIds.indexOf(it.id) >= 0;
    ph.sections.forEach((sec) => {
      if (sec === agreeSec && callSec && sec !== callSec) return; // merged into the call step
      const st = { sections: [sec], title: shortTitle(sec), hint: sec.hint || '', items: sec.items.slice(), call: sec === callSec, intake: !!c.intake && steps.length === 0, history: /histori|\bVIN\b/i.test(sec.title || '') };
      if (st.call) {
        st.title = 'Rozmowa';
        st.scriptItem = sec.items.find((it) => /skrypt/i.test(it.text || '')) || null; // represented by the embedded script itself
        st.afterItems = sec.items.filter((it) => it !== st.scriptItem && !isAgree(it)); // „Po rozmowie oceń”
        st.agreeItems = agreeIds.map((id) => c.itemById[id]);
        st.agreeSec = agreeSec && agreeSec !== sec ? agreeSec : null;
        if (st.agreeSec) { st.sections.push(agreeSec); st.items = st.items.concat(agreeSec.items); }
        st.items = st.items.concat(c.callItems);
      }
      steps.push(st);
    });
    if (!callSec) steps.push({ sections: [], title: 'Rozmowa', hint: scr.intro || '', items: c.callItems.slice(), call: true, scriptItem: null, afterItems: [], agreeItems: agreeSec ? [] : agreeIds.map((id) => c.itemById[id]), agreeSec: null });
    steps.forEach((st, i) => { st.n = i + 1; st.items.forEach((it) => { stepOfItem[it.id] = st; }); });
    return { phase: ph, steps: steps, callStep: steps.find((st) => st.call) || null, stepOfItem: stepOfItem, script: scr };
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
    if (!it.input && it.ctrl && Array.isArray(it.ctrl.options) && typeof v === 'string') { const o = it.ctrl.options.find((x) => x.v === v); return o ? o.label : ''; }
    if (it.input && (it.input.type === 'text' || it.input.type === 'choice')) return String(v == null ? '' : v);
    return fmtInput(it, v);
  }

  /* ------------------------------------------------------------------ mount */
  const Checklist = {
    mount(opts) { const app = new App(opts); app.init(); Checklist.app = app; window.OdhaczApp = app; return app; },
    version: '1.3.0',
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
    this.appName = this.opts.appName || String(document.title || '').trim() || 'Odhacz'; // captured before render() rewrites the title
    this.reportTitle = this.opts.kind === 'upsell' ? 'Raport z checklisty' : 'Raport z oględzin';
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
    this.reevalAuto({ silent: true });
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
  App.prototype.setAnswer = function (itemId, patch) { return this.setAnswerFor(this.state.active, itemId, patch); };
  App.prototype.setAnswerFor = function (carId, itemId, patch) {
    const car = this.state.cars[carId] || this.car(); car.a = car.a || {}; const cur = car.a[itemId] || [null, null, null];
    if ('state' in patch) cur[0] = patch.state; if ('input' in patch) cur[1] = patch.input; if ('note' in patch) cur[2] = patch.note;
    if ('auto' in patch) { if (patch.auto) cur[3] = 'a'; else if (cur.length > 3) cur[3] = null; } // [3] = 'a' → state set by a rule (a tap clears it)
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
    // Call-script questions count like items: globally, in the wizard phase (phase 1) and in their own `call` bucket.
    const calls = this.content.callItems || []; const wph = this.content.phases[0];
    c.call = null;
    if (calls.length && wph) {
      const ph = c.phases[wph.id]; ph.total += calls.length; c.total += calls.length;
      c.call = { answered: 0, total: calls.length, ok: 0, uwaga: 0, problem: 0, pomin: 0 };
      calls.forEach((it) => {
        const st = a[it.id] && a[it.id][0]; if (!st) return;
        c.answered++; ph.answered++; c.call.answered++;
        if (c[st] !== undefined) c[st]++; if (c.call[st] !== undefined) c.call[st]++;
        if (st === 'problem') { ph.problem++; c.problems.push(it); }
        if (st === 'uwaga') { ph.uwaga++; c.uwagi.push(it); }
      });
    }
    return c;
  };
  /** Seller call state for a car: chosen seller type, whether the call started (type chosen or any answer) and whether all questions are answered. */
  App.prototype.callState = function (carId) {
    const car = carId ? this.state.cars[carId] : this.car(); const a = (car && car.a) || {}; const items = this.content.callItems || [];
    let answered = 0; items.forEach((it) => { if (a[it.id] && a[it.id][0]) answered++; });
    const type = car && (car.st === 'private' || car.st === 'dealer') ? car.st : null;
    return { type: type, started: !!type || answered > 0, answered: answered, total: items.length, done: items.length > 0 && answered === items.length };
  };
  /** Wizard progress per step + the step to resume at (first with an unanswered item). */
  App.prototype.wizardProgress = function (carId) {
    const w = this.content.wizard; if (!w) return null;
    const car = carId ? this.state.cars[carId] : this.car(); const a = (car && car.a) || {};
    const steps = w.steps.map((st) => { let answered = 0; st.items.forEach((it) => { if (a[it.id] && a[it.id][0]) answered++; }); return { step: st, answered: answered, total: st.items.length, done: st.items.length > 0 && answered === st.items.length }; });
    const next = steps.find((s) => !s.done) || null;
    return { steps: steps, next: next ? next.step : null, complete: !next, doneCount: steps.filter((s) => s.done).length, count: steps.length };
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
        if (car.st) row.st = car.st; // seller type (private | dealer)
        if (car.vin) row.vin = String(car.vin).slice(0, 17);
        if (car.d && typeof car.d === 'object' && Object.keys(car.d).length) row.d = car.d; // intake („Dane z ogłoszenia”) + miss/got/ref flags
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
        Object.keys(remote.cars).forEach((id) => { const rc = remote.cars[id]; merged[id] = { name: rc.name || 'Auto', created: rc.created || remoteT, a: rc.a || {}, q: rc.q, pd: rc.pd, st: rc.st, vin: rc.vin, d: rc.d && typeof rc.d === 'object' ? rc.d : undefined }; });
        Object.keys(this.state.cars).forEach((id) => { const lc = this.state.cars[id]; if (!merged[id] && lc.created && lc.created > remoteT && Object.keys(lc.a || {}).length) { merged[id] = lc; keptLocal = true; } });
        this.state.cars = merged; this.state.t = remoteT; this.state.dirty = keptLocal ? 1 : 0;
        if (remote.active && merged[remote.active]) this.state.active = remote.active;
        this.ensureCar(); this.reevalAuto({ silent: true }); this.persist(false); this.render();
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
    // Wizard content: the old entry points fold into #/start (quick start → step 1/resume, call script → the „Rozmowa” step, phase 1 → wizard).
    const w = this.content.wizard;
    if (w) {
      let to = null;
      if (this.route.view === 'quick') to = 'start';
      else if (this.route.view === 'call') to = 'start/' + (w.callStep ? w.callStep.n : 1);
      else if (this.route.view === 'phase' && this.route.id === w.phase.id) to = 'start';
      if (to) { try { history.replaceState(null, '', '#/' + to); } catch (e) { location.hash = '#/' + to; } this.route = this.parseRoute(); }
    }
    const wrap = el('div', { class: 'app' });
    let body;
    switch (this.route.view) {
      case 'phase': body = this.viewPhase(this.route.id); break;
      case 'summary': body = this.viewSummary(); break;
      case 'start': body = this.viewStart(this.route.id); break;
      case 'call': body = this.viewStart(null); break;
      case 'glossary': body = this.viewGlossary(); break;
      case 'sources': body = this.viewSources(); break;
      case 'settings': body = this.viewSettings(); break;
      case 'quick': body = this.viewQuick(); break;
      case 'deadlines': body = this.viewDeadlines(); break;
      case 'contract': body = this.viewContract(); break;
      case 'filtr': body = this.viewFilter(); break;
      case 'raport': body = this.viewReport(this.route.id); break;
      case 'porownaj': body = this.viewCompare(); break;
      default: this.route.view = 'home'; body = this.viewHome();
    }
    append(wrap, body);
    this.root.innerHTML = ''; this.root.append(wrap);
    if (NO_FLAGBAR.indexOf(this.route.view) < 0) this.root.append(this.flagbar());
    if (prev.view !== this.route.view || prev.id !== this.route.id) window.scrollTo(0, 0);
    document.title = (this.content.meta.title || 'Odhacz') + (this.route.view === 'home' ? '' : ' – ' + this.routeTitle());
  };
  App.prototype.routeTitle = function () {
    const r = this.route;
    if (r.view === 'phase') { const ph = this.content.phases.find((p) => p.id === r.id); return ph ? ph.title : 'Etap'; }
    if (r.view === 'start') { const w = this.content.wizard; return w ? w.phase.title + (r.id ? ' · krok ' + r.id : '') : 'Kreator'; }
    return { summary: 'Podsumowanie', call: 'Scenariusz rozmowy', glossary: 'Słowniczek', sources: 'Skąd to wiemy', settings: 'Ustawienia', quick: 'Quick start', deadlines: 'Terminy', contract: 'Wzór umowy', filtr: 'Szybki filtr', raport: this.reportTitle, porownaj: 'Porównaj auta' }[r.view] || '';
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
    const self = this; const c = this.counts(); const filt = this.route.view === 'filtr';
    const bar = el('div', { class: 'flagbar' + (filt ? ' flagbar--filtr' : ''), role: 'status' });
    const inner = el('div', { class: 'flagbar__in' });
    const fc = (cls, icon, n, word, aria) => el('span', { class: 'fc fc--' + cls + (n ? ' is-on' : ''), role: 'img', 'aria-label': aria, title: aria }, el('span', { class: 'fc__i', html: icon }), el('b', { text: String(n) }), el('small', { text: word }));
    inner.append(el('div', { class: 'flagbar__counts' },
      fc('bad', ICON.flag, c.problem, plural(c.problem, 'flaga', 'flagi', 'flag'), c.problem + ' ' + plural(c.problem, 'czerwona flaga', 'czerwone flagi', 'czerwonych flag')),
      fc('warn', ICON.alert, c.uwaga, plural(c.uwaga, 'uwaga', 'uwagi', 'uwag'), c.uwaga + ' ' + plural(c.uwaga, 'uwaga', 'uwagi', 'uwag')),
      (c.db || filt) ? fc('db', ICON.warn, c.db, plural(c.db, 'dealbreaker', 'dealbreakery', 'dealbreakerów'), c.db + ' ' + plural(c.db, 'dealbreaker', 'dealbreakery', 'dealbreakerów')) : null));
    if (filt) {
      // Quick filter: the bar tracks the filter itself – progress, then the verdict.
      const s = this.quickStats();
      inner.append(el('button', { class: 'btn', type: 'button', 'data-testid': 'filtr-bar-btn', 'aria-label': s.done ? 'Pokaż werdykt' : 'Następny punkt filtra (' + s.answered + ' z ' + s.total + ')', onclick: () => {
        if (s.done) { const v = $('#filtr-verdict', self.root); if (v) v.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
        const rows = self.root.querySelectorAll('.item[data-item]');
        for (let i = 0; i < rows.length; i++) { if (!/\bis-(ok|uwaga|problem|pomin)\b/.test(rows[i].className)) { rows[i].scrollIntoView({ block: 'center', behavior: 'smooth' }); return; } }
      } }, s.done ? 'Werdykt' : s.answered + '/' + s.total, el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
    } else if (this.route.view !== 'summary') inner.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('summary') }, 'Podsumowanie', el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
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
    out.push(el('div', { class: 'hero' }, mascot(), el('div', null, el('h1', { text: c.meta.title || 'Odhacz' }), el('p', { class: 'tagline' }, this.opts.kind === 'upsell' ? 'Odhaczasz punkt po punkcie. Zero zgadywania.' : 'Prowadzimy Cię przy aucie. Wychodzisz z raportem i argumentami.'))));
    const total = c.meta.est_minutes_total;
    const w = c.wizard; const wp = w ? this.wizardProgress() : null; const nextTarget = this.nextTarget(cnt, wp);
    let haczLine;
    if (cnt.answered === 0) haczLine = w ? 'Cześć, tu Hacz. Zacznij od kreatora „' + w.phase.title + '”: ' + wp.count + ' ' + plural(wp.count, 'krok', 'kroki', 'kroków') + ' wieczorem przed oględzinami — dane z ogłoszenia, historia, rozmowa ze sprzedawcą zdanie po zdaniu. Przy aucie odpalisz Szybki filtr.'
      : (c.quick_start && c.quick_start.steps && c.quick_start.steps.length ? 'Cześć, tu Hacz. Zacznij od „' + (c.quick_start.title || 'Zacznij tu') + '” – kilka minut i wiesz, jak to działa. Potem etapy po kolei.' : 'Cześć, tu Hacz. Etapy po kolei, najlepiej w tej kolejności.');
    else if (wp && !wp.complete) haczLine = 'Jesteś na kroku ' + nextTarget.stepN + '/' + wp.count + ' kreatora. ' + (cnt.problem ? 'Już ' + cnt.problem + ' ' + plural(cnt.problem, 'czerwona flaga', 'czerwone flagi', 'czerwonych flag') + ' – zapisuj notatki, przydadzą się w negocjacji.' : 'Dokończ go w domu – przy aucie nie będzie na to czasu.');
    else if (cnt.answered < cnt.total) haczLine = 'Masz ' + cnt.answered + ' z ' + cnt.total + ' punktów. ' + (cnt.problem ? 'Już ' + cnt.problem + ' ' + plural(cnt.problem, 'czerwona flaga', 'czerwone flagi', 'czerwonych flag') + ' – zapisuj notatki, przydadzą się w negocjacji.' : 'Na razie czysto. Nie zwalniaj przy silniku i jeździe próbnej.');
    else haczLine = 'Wszystko odhaczone. Sprawdź podsumowanie i zabierz listę uwag do rozmowy.';
    out.push(el('div', { class: 'bubble' }, el('b', null, 'Hacz: '), haczLine, el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz')));
    // ONE primary card: „Kontynuuj: <następny krok>” (wizard step → next phase with unanswered items → summary)
    const kont = el('div', { class: 'card kontynuuj', 'data-testid': 'kontynuuj' },
      el('div', { class: 'kontynuuj__eyebrow' }, nextTarget.eyebrow),
      el('h2', { text: 'Kontynuuj: ' + nextTarget.title }),
      nextTarget.sub ? el('p', { class: 'muted' }, nextTarget.sub) : null,
      el('button', { class: 'btn btn--primary btn--block', type: 'button', 'data-testid': 'kontynuuj-btn', onclick: () => self.go(nextTarget.path) }, nextTarget.label, el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
    if (!w && c.quick_start && c.quick_start.steps && c.quick_start.steps.length && !this.state.ui.qs) kont.append(el('p', { class: 'small muted center', style: 'margin:10px 0 0' }, 'Pierwszy raz? ', el('button', { class: 'linkbtn', type: 'button', style: 'min-height:32px;padding:2px 0;font-size:16px', onclick: () => self.go('quick') }, c.quick_start.title || 'Zacznij tu')));
    out.push(kont);
    // Quick filter („Szybki filtr”): odsiej, zanim zaczniesz pełne oględziny – useful at the car, stays between the primary card and the phases
    if (this.filterEnabled()) {
      const s = this.quickStats(); const pct = s.total ? Math.round(100 * s.answered / s.total) : 0;
      out.push(el('div', { class: 'card filtr', 'data-testid': 'filtr-card' },
        el('div', { class: 'card__title' }, el('span', { class: 'quick__meta filtr__meta' }, el('span', { html: ICON.bolt, style: 'width:16px;height:16px;display:inline-flex' }), s.done ? (s.verdict === 'walk' ? 'werdykt: odpuść' : 'zaliczony') : '10 minut'), el('h2', { class: 'grow', text: 'Szybki filtr' })),
        el('p', { class: 'muted' }, 'Przy aucie: najpierw odsiej, potem sprawdzaj dokładnie. ' + s.total + ' ' + plural(s.total, 'punkt, który najczęściej kończy', 'punkty, które najczęściej kończą', 'punktów, które najczęściej kończą') + ' oglądanie.'),
        el('div', { class: 'row', style: 'justify-content:space-between' }, el('span', { class: 'chip' }, s.answered + '/' + s.total + ' odhaczone'), s.db.length ? el('span', { class: 'filtr__db' }, s.db.length + ' ' + plural(s.db.length, 'dealbreaker', 'dealbreakery', 'dealbreakerów')) : null),
        el('div', { class: 'progress' }, el('i', { style: 'width:' + pct + '%' })),
        el('button', { class: 'btn btn--block', type: 'button', onclick: () => self.go('filtr') }, s.done ? 'Otwórz filtr' : s.answered ? 'Dokończ filtr (zostało ' + (s.total - s.answered) + ')' : 'Odsiej (10 min)')));
    }
    // Phases (row 1 = the wizard when the content has one)
    out.push(el('div', { class: 'row', style: 'justify-content:space-between;margin:18px 0 8px' }, el('h2', { style: 'margin:0' }, 'Etapy'), el('span', { class: 'chip' }, el('span', { html: ICON.list }), cnt.total + ' ' + plural(cnt.total, 'punkt', 'punkty', 'punktów') + (total ? ' · ~' + total + ' min' : ''))));
    const list = el('ul', { class: 'phases' });
    c.phases.forEach((ph, i) => {
      const p = cnt.phases[ph.id]; const done = p.total > 0 && p.answered === p.total; const isWiz = w && ph === w.phase;
      const meta = el('div', { class: 'phase-row__meta' }, el('span', { text: isWiz ? wp.doneCount + '/' + wp.count + ' ' + plural(wp.count, 'krok', 'kroki', 'kroków') : p.answered + '/' + p.total }), ph.est_minutes ? el('span', { text: '~' + ph.est_minutes + ' min' }) : null, p.problem ? el('span', { class: 'phase-row__flags', text: p.problem + ' ' + plural(p.problem, 'flaga', 'flagi', 'flag') }) : null);
      const row = el('button', { class: 'phase-row' + (done ? ' is-done' : '') + (isWiz ? ' phase-row--wiz' : ''), type: 'button', 'data-phase': ph.id, onclick: () => self.go(isWiz ? 'start' : 'phase/' + encodeURIComponent(ph.id)) },
        el('span', { class: 'phase-row__n', html: done ? ICON.check : String(i + 1) }),
        el('span', null, el('span', { class: 'phase-row__t', text: ph.title }), el('span', { class: 'phase-row__s', text: isWiz ? 'kreator, ' + wp.count + ' ' + plural(wp.count, 'krok', 'kroki', 'kroków') + (ph.when ? ' · ' + ph.when.toLowerCase() : '') : (ph.subtitle || '') })),
        meta,
        el('span', { class: 'progress' }, el('i', { style: 'width:' + (p.total ? Math.round(100 * p.answered / p.total) : 0) + '%' })));
      list.append(el('li', null, row));
    });
    out.push(list);
    // Two buttons + „Więcej” sheet instead of the tile grid
    const acts = el('div', { class: 'grid2 mt' });
    acts.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('raport/' + encodeURIComponent(this.state.active)) }, el('span', { html: ICON.doc }), 'Raport'));
    if (c.deadlineRows.length) acts.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('deadlines') }, el('span', { html: ICON.calendar }), 'Terminy'));
    if (c.contract_template) acts.append(el('button', { class: 'btn', type: 'button', onclick: () => self.go('contract') }, el('span', { html: ICON.doc }), c.contract_template.title && c.contract_template.title.length <= 14 ? c.contract_template.title : 'Wzór umowy'));
    acts.append(el('button', { class: 'btn', type: 'button', 'data-testid': 'home-compare', onclick: () => self.go('porownaj') }, el('span', { html: ICON.car }), 'Porównaj auta'));
    out.push(acts);
    out.push(el('button', { class: 'btn btn--ghost btn--block', type: 'button', style: 'margin-top:10px', 'data-testid': 'home-more', onclick: () => self.sheetMore() }, el('span', { html: ICON.list }), 'Więcej', el('span', { html: ICON.chev, style: 'display:inline-flex' })));
    out.push(el('div', { id: 'upsell-slot', class: 'mt' }, this.upsellCard()));
    out.push(this.disclaimer());
    out.push(el('p', { class: 'small muted center', style: 'margin-top:12px' }, 'Auto: ' + car.name + ' · treść v' + (c.meta.version || '1') + ' · ilustracje i awatar wygenerowane cyfrowo'));
    return out;
  };
  /** Where „Kontynuuj” leads: the wizard step to resume → the first later phase with unanswered items → the summary. */
  App.prototype.nextTarget = function (cnt, wp) {
    const c = this.content; const w = c.wizard;
    if (w && wp && !wp.complete) { const st = wp.next; return { kind: 'wizard', stepN: st.n, path: 'start/' + st.n, eyebrow: w.phase.title + ' · kreator', title: 'krok ' + st.n + '/' + wp.count + ' · ' + st.title, sub: st.hint || w.phase.when || '', label: 'Kontynuuj' }; }
    const next = c.phases.find((ph) => !(w && ph === w.phase) && cnt.phases[ph.id].answered < cnt.phases[ph.id].total);
    if (next) return { kind: 'phase', path: 'phase/' + encodeURIComponent(next.id), eyebrow: 'Etap ' + (next.index + 1) + ' z ' + c.phases.length, title: next.title, sub: next.when ? 'Kiedy: ' + next.when : (next.subtitle || ''), label: 'Kontynuuj' };
    return { kind: 'summary', path: 'summary', eyebrow: 'Ostatni krok', title: 'Podsumowanie', sub: 'Wszystko odhaczone: decyzja, lista uwag i raport z oględzin.', label: 'Zobacz podsumowanie' };
  };
  /** „Więcej” sheet: the secondary entries that used to be tiles. */
  App.prototype.sheetMore = function () {
    const self = this; const c = this.content; const w = c.wizard;
    this.sheet((sh, close) => {
      sh.append(el('h2', null, 'Więcej'));
      const ul = el('ul', { class: 'more-list' });
      const row = (icon, label, path, testid) => ul.append(el('li', null, el('button', { class: 'more-row', type: 'button', 'data-testid': testid || null, onclick: () => { close(); self.go(path); } }, el('span', { class: 'more-row__i', html: icon }), el('span', { class: 'grow', text: label }), el('span', { class: 'more-row__c', html: ICON.chev }))));
      if (w && w.callStep) row(ICON.phone, 'Scenariusz rozmowy ze sprzedawcą', 'start/' + w.callStep.n, 'more-call');
      if (!w && c.quick_start && c.quick_start.steps && c.quick_start.steps.length) row(ICON.bolt, c.quick_start.title || 'Zacznij tu', 'quick', 'more-quick');
      row(ICON.list, 'Podsumowanie i negocjacja', 'summary');
      if (c.deadlineRows.length) row(ICON.calendar, 'Terminy po zakupie', 'deadlines');
      if (c.contract_template) row(ICON.doc, c.contract_template.title || 'Wzór umowy', 'contract');
      if (c.glossary && c.glossary.length) row(ICON.book, 'Słowniczek', 'glossary');
      if (c.sources && c.sources.length) row(ICON.info, 'Skąd to wiemy', 'sources');
      row(ICON.gear, 'Ustawienia i kopia', 'settings', 'more-settings');
      sh.append(ul, el('div', { class: 'btnrow' }, el('button', { class: 'btn', type: 'button', onclick: close }, 'Zamknij')));
    });
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
      if (c.paintSection === sec) out.push(this.paintCard({ interactive: true, live: true }));
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
  /** opts.say: show the item's `say` sentence („Powiedz: …”) above the answer buttons (wizard „Rozmowa” step). */
  App.prototype.itemRow = function (it, opts) {
    if (it.call) return this.callCard(it);
    opts = opts || {};
    const self = this; const a = this.ans(it.id) || [];
    const row = el('article', { class: 'item' + (a[0] ? ' is-' + a[0] : '') + (this.openItems[it.id] ? ' is-open' : ''), 'data-item': it.id });
    if (opts.say) row._opts = opts;
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
    // „Powiedz: …” – the exact sentence for the seller (agreements in the wizard)
    if (opts.say && typeof it.say === 'string' && it.say.trim()) row.append(el('blockquote', { class: 'say' }, el('b', null, 'Powiedz:'), '„' + it.say.trim() + '”'));
    // automatic verdict (rule-driven items) + answers adapted to the question
    if (it.ctrl && it.ctrl.auto) { const v = this.verdictEl(it); if (v) row.append(v); }
    row.append(this.answerBar(it, a, row));
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
    let autoTimer = null;
    const save = (v, final) => { self.setAnswer(it.id, { input: v }); self.refreshBadges(it, row); if (DATE_TYPES[type]) self.refreshDeadlineTexts(); if (self.content.panelOfItem[it.id]) self.refreshPaintMaps(); if (it.ctrl && it.ctrl.auto) { clearTimeout(autoTimer); if (final) self.afterAutoInput(it, row, true); else autoTimer = setTimeout(() => self.afterAutoInput(it, row, false), 450); } };
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
      const field = el('input', { type: htmlType, inputmode: type === 'number' ? 'decimal' : null, step: type === 'number' ? 'any' : null, placeholder: type === 'number' ? '0' : type === 'vin' ? 'np. WVWZZZ1KZ5W000000' : null, value: val != null && !Array.isArray(val) ? val : '', 'aria-label': inp.label || 'Pomiar', maxlength: type === 'vin' ? '17' : htmlType === 'text' ? '300' : null, autocapitalize: type === 'vin' ? 'characters' : null, autocomplete: type === 'vin' ? 'off' : null, spellcheck: type === 'vin' ? 'false' : null, class: type === 'vin' ? 'vin-in' : null });
      let last = field.value;
      const cur = () => (field.value === '' ? null : (type === 'number' ? Number(field.value) : field.value));
      field.addEventListener('input', () => { if (type === 'vin') { const v = field.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17); if (v !== field.value) field.value = v; } if (field.value === last) return; last = field.value; save(cur(), false); });
      field.addEventListener('change', () => { if (field.value !== last) { last = field.value; save(cur(), true); } else if (it.ctrl && it.ctrl.auto) { clearTimeout(autoTimer); self.afterAutoInput(it, row, true); } });
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
  /* ------------------------------------------------------------------ controls adapted to the question, automatic evaluation, intake (v1.3) */
  App.prototype.numInput = function (itemId, car) { const a = car && car.a && car.a[itemId]; const v = a && a[1]; if (v == null || v === '' || Array.isArray(v)) return null; const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.')); return isFinite(n) ? n : null; };
  App.prototype.strInput = function (itemId, car) { const a = car && car.a && car.a[itemId]; const v = a && a[1]; return v == null || Array.isArray(v) ? '' : String(v); };
  App.prototype.dateInputOf = function (itemId, car) { const v = this.strInput(itemId, car); const m = /^(\d{4}-\d{2}-\d{2})/.exec(v); return m && parseDate(m[1]) ? m[1] : null; };
  /** Per-car intake data (VIN lives in car.vin; the rest in car.d with `miss` / `got` / `ref` flags per field). */
  App.prototype.carData = function (car) { car.d = car.d && typeof car.d === 'object' && !Array.isArray(car.d) ? car.d : {}; car.d.miss = car.d.miss || {}; car.d.got = car.d.got || {}; car.d.ref = car.d.ref || {}; return car.d; };
  App.prototype.intakeVal = function (car, fid) { if (!car) return null; if (fid === 'vin') return car.vin ? String(car.vin) : null; const d = car.d || {}; const v = d[fid]; return v == null || v === '' ? null : v; };
  App.prototype.intakeNum = function (car, fid) { const v = this.intakeVal(car, fid); if (v == null) return null; const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.')); return isFinite(n) ? n : null; };
  /** 'have' | 'missing' (empty or marked „nie ma”) | 'refused' (the seller would not give it). */
  App.prototype.intakeStatus = function (car, fid) {
    const d = (car && car.d) || {}; if (d.ref && d.ref[fid]) return 'refused';
    const f = this.content.intake && this.content.intake.byId[fid]; const v = this.intakeVal(car, fid);
    if (f && f.type === 'yesno') return v === 'yes' ? 'have' : 'missing';
    return v != null && v !== '' ? 'have' : 'missing';
  };
  App.prototype.intakeText = function (car, fid) {
    const f = this.content.intake && this.content.intake.byId[fid]; const v = this.intakeVal(car, fid); if (v == null) return '';
    if (!f) return String(v);
    if (f.type === 'date') return fmtPl(String(v)) || String(v);
    if (f.type === 'yesno') return v === 'yes' ? (f.yes || 'tak') : (f.no || 'nie');
    if (f.type === 'number') { const n = Number(v); if (!isFinite(n)) return String(v); if (f.unit === 'km') return fmtKm(n); if (f.unit === 'zł') { try { return n.toLocaleString('pl-PL') + ' zł'; } catch (e) { return n + ' zł'; } } return String(n); }
    return String(v);
  };
  App.prototype.intakeShortLabel = function (f) { return String(f.label || f.id).replace(/\s*\(.*$/, ''); };
  App.prototype.registryOdo = function (car) { const it = this.content.autoItems.find((x) => x.ctrl.auto === 'odo_registry'); return it ? this.numInput(it.id, car) : null; };
  App.prototype.evalAuto = function (it, carId) {
    const rule = it && it.ctrl && it.ctrl.auto && AUTO_RULES[it.ctrl.auto]; if (!rule) return null;
    const id = carId || this.state.active; const car = this.state.cars[id]; if (!car) return null;
    try { return rule(this, it, car, id); } catch (e) { return null; }
  };
  /** Apply a rule to the stored state. Pure `auto` items always follow the rule (a „Pomiń” survives until the input changes);
   * mixed items (choice + auto) only when their own input changed (`fromInput`) or the rule forces a verdict. */
  App.prototype.applyAuto = function (it, opts) {
    opts = opts || {}; const carId = opts.carId || this.state.active; const car = this.state.cars[carId]; if (!car || !it.ctrl || !it.ctrl.auto) return null;
    const res = this.evalAuto(it, carId); const tup = (car.a && car.a[it.id]) || []; const cur = tup[0] || null; const wasAuto = tup[3] === 'a'; const pure = it.ctrl.type === 'auto';
    let next = cur;
    if (pure) { if (!(cur === 'pomin' && !opts.fromInput)) next = res && res.state ? res.state : null; }
    else if (res && res.state) { if (opts.fromInput || res.force || wasAuto || cur == null) next = res.state; }
    else if (wasAuto) next = null; // the basis of the system's answer is gone – back to unanswered
    if (res && res.setVin && !car.vin) { car.vin = res.setVin; car.u = nowIso(); }
    if (next !== cur) { this.setAnswerFor(carId, it.id, { state: next, auto: !!next }); return { changed: true, state: next, prev: cur, res: res }; }
    return { changed: false, state: cur, prev: cur, res: res };
  };
  /** Re-evaluate every rule-driven item of a car (after intake, registry or paint changes) and refresh what is on screen. */
  App.prototype.reevalAuto = function (opts) {
    opts = opts || {}; const carId = opts.carId || this.state.active; const changed = [];
    (this.content.autoItems || []).forEach((it) => { if (opts.except === it.id) return; const r = this.applyAuto(it, { carId: carId }); if (r && r.changed) changed.push(it); });
    if (carId !== this.state.active || opts.silent || !this.root) return changed;
    changed.forEach((it) => this.refreshRow(it));
    if (changed.length) { this.updateFlagbar(); if (this.route.view === 'start') this.refreshWizard(); if (this.route.view === 'filtr') this.refreshFilter(); }
    if (this.content.hasPaint && (opts.paint || changed.some((it) => this.content.panelOfItem[it.id]))) this.refreshPaintMaps();
    return changed;
  };
  /** Re-render one item row in place (keeps the expanded state and loaded thumbnails). */
  App.prototype.refreshRow = function (it) {
    const row = this.itemEl(it.id); if (!row) return;
    const fresh = this.itemRow(it, row._opts); const oldThumbs = $('.item__badges > .row', row); const newThumbs = $('.item__badges > .row', fresh);
    if (oldThumbs && newThumbs) newThumbs.replaceWith(oldThumbs);
    row.replaceWith(fresh);
  };
  /** „Ocena: …” line under a rule-driven item. */
  App.prototype.verdictEl = function (it, carId) {
    if (!it.ctrl || !it.ctrl.auto) return null;
    const res = this.evalAuto(it, carId); const pure = it.ctrl.type === 'auto';
    if (!res || !res.text) { if (pure) return el('div', { class: 'autov autov--none', role: 'status' }, el('span', { class: 'autov__i', html: ICON.info }), el('span', null, 'Wpisz wartość — ocenię automatycznie.')); return el('div', { class: 'autov autov--none', hidden: true }); }
    const st = res.state || 'none'; const ic = st === 'problem' ? ICON.flag : st === 'uwaga' ? ICON.alert : st === 'ok' ? ICON.check : ICON.info;
    return el('div', { class: 'autov autov--' + st, role: 'status', 'data-testid': 'autov' }, el('span', { class: 'autov__i', html: ic }), el('span', null, el('b', null, st === 'none' ? 'Hacz: ' : 'Ocena: '), res.text));
  };
  /** Answer buttons for an item: the classic bar, options adapted to the question, or just the skip button of a rule-driven item. */
  App.prototype.answerBar = function (it, a, row) {
    const self = this; const ctrl = it.ctrl || normCtrl(null, this.content.answer_states); const opts = ctrl.type === 'auto' ? [] : ctrl.options;
    const hasV = !it.input && !ctrl.generic && typeof a[1] === 'string' && opts.some((o) => o.v === a[1]);
    const firstOf = (st) => opts.find((o) => o.state === st) || null;
    const cols = opts.length + (ctrl.skip ? 1 : 0); const longest = opts.reduce((m, o) => Math.max(m, o.label.length), 0);
    const stack = ctrl.type !== 'auto' && cols >= 3 && longest > 22;
    const bar = el('div', { class: 'answers' + (ctrl.generic ? '' : ' answers--custom') + (stack ? ' answers--stack' : '') + (ctrl.type === 'auto' ? ' answers--auto' : ''), style: '--cols:' + Math.max(1, stack ? 1 : cols) });
    opts.forEach((o) => {
      const on = a[0] === o.state && (hasV ? a[1] === o.v : firstOf(o.state) === o);
      const b = el('button', { class: 'ans ans--' + o.state + (on ? ' is-on' : ''), type: 'button', 'aria-pressed': on ? 'true' : 'false', 'data-v': o.v, text: o.label });
      b.addEventListener('click', () => self.tapOption(it, o, row)); bar.append(b);
    });
    if (ctrl.skip) { const on = a[0] === 'pomin'; const b = el('button', { class: 'ans ans--pomin' + (on ? ' is-on' : ''), type: 'button', 'aria-pressed': on ? 'true' : 'false', text: ctrl.skip }); b.addEventListener('click', () => self.tapState(it, 'pomin', row)); bar.append(b); }
    return bar;
  };
  App.prototype.tapOption = function (it, o, row) {
    const a = this.ans(it.id) || []; const storeV = !it.input && !it.ctrl.generic; const curV = storeV && typeof a[1] === 'string' ? a[1] : null;
    const same = a[0] === o.state && (curV ? curV === o.v : true);
    const patch = { state: same ? null : o.state }; if (storeV) patch.input = same ? null : o.v;
    this.applyState(it, patch, row);
  };
  App.prototype.tapState = function (it, st, row) { const cur = this.stateOf(it.id); const patch = { state: cur === st ? null : st }; if (!it.input && it.ctrl && !it.ctrl.generic) patch.input = null; this.applyState(it, patch, row); };
  App.prototype.applyState = function (it, patch, row) {
    const next = patch.state; const wasComplete = this.phaseComplete(it);
    this.setAnswer(it.id, Object.assign({ auto: false }, patch));
    if (it.call) this.afterCallAnswer();
    if (row) this.syncRowState(it, row);
    this.updateFlagbar();
    const cnt = this.counts(); const ph = this.content.phaseOfItem[it.id]; const p = cnt.phases[ph.id];
    const chip = $('#phase-progress', this.root); if (chip) chip.textContent = p.answered + '/' + p.total + ' odhaczone';
    if (this.route.view === 'filtr') this.refreshFilter();
    if (this.route.view === 'start') this.refreshWizard();
    if (next === 'problem' && it.dealbreaker) this.sheetDealbreaker(it, row);
    else if (next === 'problem' && navigator.vibrate) { try { navigator.vibrate(30); } catch (e) { /* ignore */ } }
    if (!wasComplete && p.total && p.answered === p.total) { this.toast('Etap odhaczony ✓'); track('phase_done', { phase_id: ph.id, answered: p.answered, problems: p.problem, uwagi: p.uwaga }); }
  };
  /** Row after a tap or an automatic verdict: left border, buttons, verdict line, badges — inputs stay untouched (focus survives). */
  App.prototype.syncRowState = function (it, row) {
    const a = this.ans(it.id) || []; const st = a[0] || null;
    row.className = row.className.replace(/\bis-(ok|uwaga|problem|pomin)\b/g, '').replace(/\s+/g, ' ').trim(); if (st) row.classList.add('is-' + st);
    const oldBar = $('.answers', row); if (oldBar) oldBar.replaceWith(this.answerBar(it, a, row));
    const oldV = $('.autov', row); const nv = this.verdictEl(it); if (oldV && nv) oldV.replaceWith(nv);
    this.refreshBadges(it, row);
  };
  /** After an input of a rule-driven item changed: verdict for this row, dependent rows, counters; the dealbreaker sheet only on a final change. */
  App.prototype.afterAutoInput = function (it, row, final) {
    if (!it.ctrl || !it.ctrl.auto) return;
    const r = this.applyAuto(it, { fromInput: true });
    if (row) this.syncRowState(it, row);
    this.reevalAuto({ except: it.id, paint: !!this.content.panelOfItem[it.id] });
    this.updateFlagbar();
    const ph = this.content.phaseOfItem[it.id]; const p = this.counts().phases[ph.id]; const chip = $('#phase-progress', this.root); if (chip) chip.textContent = p.answered + '/' + p.total + ' odhaczone';
    if (this.route.view === 'start') this.refreshWizard(); if (this.route.view === 'filtr') this.refreshFilter();
    if (final && r && r.changed && r.state === 'problem' && it.dealbreaker) this.sheetDealbreaker(it, row);
  };

  /* ------------------------------------------------------------------ intake („Dane z ogłoszenia”) */
  App.prototype.setIntake = function (fid, value, flags) {
    const car = this.car(); const d = this.carData(car); flags = flags || {};
    if (fid === 'vin') { const v = String(value == null ? '' : value).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17); if (v) car.vin = v; else delete car.vin; }
    else if (value == null || value === '') delete d[fid]; else d[fid] = value;
    if ('miss' in flags) { if (flags.miss) d.miss[fid] = 1; else delete d.miss[fid]; }
    if ('got' in flags) { if (flags.got) d.got[fid] = 1; else delete d.got[fid]; }
    if ('ref' in flags) { if (flags.ref) d.ref[fid] = 1; else delete d.ref[fid]; }
    const has = value != null && value !== '' && !(fid !== 'vin' && this.content.intake && this.content.intake.byId[fid] && this.content.intake.byId[fid].type === 'yesno' && value === 'no');
    if (has && !flags.keepMiss) delete d.miss[fid];
    if (has && !flags.ref) delete d.ref[fid];
    car.u = nowIso(); this.persist();
    this.reevalAuto();
  };
  /** One intake field (intake card or the call step's „zdobądź” card). onDone(typing) – typing=true while the user is still in the field. */
  App.prototype.intakeField = function (f, compact, onDone) {
    const self = this; const ik = this.content.intake; const car = this.car(); const d = this.carData(car); const cur = this.intakeVal(car, f.id);
    const wrap = el('div', { class: 'ikf' + (compact ? ' ikf--compact' : ''), 'data-field': f.id });
    const lab = el('div', { class: 'ikf__lab' }, el('span', { text: f.label }), d.got[f.id] && this.intakeStatus(car, f.id) === 'have' ? el('span', { class: 'chip chip--got' }, ik.got_label || 'z rozmowy') : null);
    wrap.append(lab);
    if (f.type === 'yesno') {
      const seg = el('div', { class: 'seg seg--wrap ikf__seg', role: 'group', 'aria-label': f.label });
      [['yes', f.yes || 'Tak'], ['no', f.no || 'Nie']].forEach((p) => seg.append(el('button', { type: 'button', class: cur === p[0] ? 'is-on' : '', 'aria-pressed': cur === p[0] ? 'true' : 'false', onclick: () => { const nv = cur === p[0] ? null : p[0]; self.setIntake(f.id, nv, { miss: nv === 'no', got: false, ref: false }); if (onDone) onDone(false); } }, p[1])));
      wrap.append(seg);
      if (cur === 'no') wrap.append(el('span', { class: 'ikf__hint' }, el('span', { class: 'chip chip--miss' }, ik.missing_hint || 'zapytasz w rozmowie')));
      return wrap;
    }
    if (!compact && d.miss[f.id] && cur == null) {
      wrap.append(el('div', { class: 'ikf__miss' }, el('span', { class: 'chip chip--miss' }, el('span', { html: ICON.phone, style: 'width:16px;height:16px;display:inline-flex' }), ik.missing_hint || 'zapytasz w rozmowie'), el('button', { class: 'linkbtn', type: 'button', style: 'min-height:32px;padding:0;font-size:15px', onclick: () => { self.setIntake(f.id, null, { miss: false }); if (onDone) onDone(false); } }, 'jednak mam')));
      return wrap;
    }
    const htmlType = f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text';
    const inp = el('input', { type: htmlType, inputmode: f.type === 'number' ? 'numeric' : null, step: f.type === 'number' ? '1' : null, value: cur != null ? cur : '', 'aria-label': f.label, maxlength: f.type === 'vin' ? '17' : (htmlType === 'text' ? '20' : null), autocapitalize: f.type === 'vin' || f.type === 'text' ? 'characters' : null, autocomplete: 'off', spellcheck: 'false', placeholder: f.type === 'vin' ? 'np. WVWZZZ1KZ5W000000' : f.type === 'number' ? '0' : null, 'data-testid': 'ik-' + f.id });
    let last = inp.value;
    const commit = (final) => {
      let v = inp.value;
      if (f.type === 'vin') { v = v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17); if (v !== inp.value) inp.value = v; }
      if (f.type === 'text') v = v.toUpperCase().replace(/\s+/g, ' ').trim();
      if (v !== last) { last = v; self.setIntake(f.id, v === '' ? null : (f.type === 'number' ? Number(v) : v), null); self.refreshIntakeDerived(); if (onDone) onDone(true); }
      if (final && v !== '' && onDone) onDone(false, true); // field completed (blur/enter) – the intake card ignores it, the call card moves the field to „done”
    };
    inp.addEventListener('input', () => commit(false)); inp.addEventListener('change', () => commit(true));
    const row = el('div', { class: 'ikf__row' + (compact ? ' ikf__row--single' : '') }, el('div', { class: 'inwrap' }, inp, f.unit ? el('span', { class: 'unit', text: f.unit }) : null),
      compact ? null : el('button', { class: 'missbtn', type: 'button', 'data-testid': 'ik-miss-' + f.id, 'aria-label': (ik.missing_label || 'nie ma') + ': ' + f.label, onclick: () => { self.setIntake(f.id, null, { miss: true }); if (onDone) onDone(false); } }, ik.missing_label || 'nie ma'));
    wrap.append(row);
    if (f.type === 'vin') { const st = el('span', { class: 'ikf__hint' }); const upd = () => { const v = String(inp.value || ''); const bad = /[IOQ]/i.test(v); st.textContent = !v ? '17 znaków z dowodu (pole E) albo z podszybia.' : v.length === 17 && !bad ? '17/17 – komplet' : v.length + '/17' + (bad ? ' · VIN nie zawiera liter I, O ani Q' : ''); }; inp.addEventListener('input', upd); upd(); wrap.append(st); }
    return wrap;
  };
  App.prototype.intakeCard = function () {
    const self = this; const ik = this.content.intake; if (!ik) return null;
    const card = el('div', { class: 'card intake', 'data-testid': 'intake' });
    const rerender = () => { const fresh = self.intakeCard(); if (fresh) card.replaceWith(fresh); };
    card.append(el('h2', null, ik.title || 'Dane z ogłoszenia'));
    if (ik.intro) card.append(el('p', { class: 'muted' }, ik.intro));
    const grid = el('div', { class: 'ikgrid' });
    ik.fields.forEach((f) => grid.append(this.intakeField(f, false, (typing, completed) => { if (!typing && !completed) rerender(); })));
    card.append(grid);
    card.append(el('div', { class: 'ikderived', id: 'ik-derived' }, this.intakeDerived()));
    return card;
  };
  /** What follows from the intake: km/year, first registration vs production year, refusals, what is still missing. */
  App.prototype.intakeDerived = function () {
    const car = this.car(); const ik = this.content.intake; const out = []; const lines = [];
    const odo = this.intakeNum(car, 'odo_ad'); const year = this.intakeNum(car, 'year'); const fr = this.intakeVal(car, 'first_reg');
    if (odo != null && year != null) { const r = AUTO_RULES.km_per_year(this, null, car); if (r && r.text) lines.push({ st: r.state || 'none', text: r.state ? r.text.split(' — ')[0] + (r.state === 'ok' ? ' — typowo jak na wiek' : /mało/.test(r.text) ? ' — mało jak na wiek: jutro licznik kontra zużycie' : ' — dużo: zapytaj o flotę, taxi, przedstawiciela') : r.text }); }
    if (year != null && fr) { const fy = parseInt(String(fr).slice(0, 4), 10); if (fy) { const diff = fy - year; if (diff < 0) lines.push({ st: 'problem', text: 'Pierwsza rejestracja (' + fy + ') wcześniejsza niż rok produkcji (' + year + ') — coś się nie zgadza, zapytaj.' }); else if (diff >= 2) lines.push({ st: 'uwaga', text: 'Pierwsza rejestracja ' + diff + ' ' + plural(diff, 'rok', 'lata', 'lat') + ' po roku produkcji — auto długo stało w salonie lub na placu albo rocznik jest naciągany. Zapytaj.' }); else lines.push({ st: 'ok', text: 'Pierwsza rejestracja (' + fy + ') zgodna z rocznikiem.' }); } }
    const refused = ik.fields.filter((f) => this.intakeStatus(car, f.id) === 'refused'); const miss = ik.fields.filter((f) => this.intakeStatus(car, f.id) === 'missing');
    refused.forEach((f) => lines.push({ st: 'problem', text: 'Sprzedawca odmówił: ' + this.intakeShortLabel(f) + '.' + (f.id === 'vin' ? ' Bez VIN nie sprawdzisz nic — to koniec tematu.' : '') }));
    if (lines.length) { out.push(el('div', { class: 'ikderived__t' }, ik.derived_intro || 'Co z tego wynika:')); lines.forEach((l) => out.push(el('div', { class: 'autov autov--' + l.st }, el('span', { class: 'autov__i', html: l.st === 'problem' ? ICON.flag : l.st === 'uwaga' ? ICON.alert : l.st === 'ok' ? ICON.check : ICON.info }), el('span', null, l.text)))); }
    if (miss.length) out.push(el('p', { class: 'ikmiss', 'data-testid': 'intake-missing' }, el('span', { html: ICON.phone }), el('span', null, el('b', null, 'Do zdobycia w rozmowie (krok 3): '), miss.map((f) => this.intakeShortLabel(f)).join(', ') + '. Dostaniesz tam gotowe zdania.')));
    else out.push(el('p', { class: 'ikmiss ikmiss--ok', 'data-testid': 'intake-complete' }, el('span', { html: ICON.check }), el('span', null, 'Komplet danych z ogłoszenia.')));
    return out;
  };
  App.prototype.refreshIntakeDerived = function () { const n = $('#ik-derived', this.root); if (n) { n.innerHTML = ''; append(n, this.intakeDerived()); } const nd = $('#intake-nudge', this.root); if (nd) { nd.innerHTML = ''; append(nd, this.intakeNudge()); } };
  /** Soft reminder under step 1 when price / year / mileage are neither typed nor marked „nie ma”. */
  App.prototype.intakeNudge = function () {
    const c = this.content; const car = this.car(); if (!c.intake) return null;
    const req = ['price', 'year', 'odo_ad'].filter((id) => c.intake.byId[id] && this.intakeStatus(car, id) === 'missing' && !(car.d && car.d.miss && car.d.miss[id]));
    if (!req.length) return null;
    return el('p', { class: 'small muted', 'data-testid': 'intake-nudge' }, 'Wpisz ' + req.map((id) => this.intakeShortLabel(c.intake.byId[id]).toLowerCase()).join(', ') + ' w danych z ogłoszenia (wyżej) albo tapnij „nie ma” — bez tego nie policzę kilometrów na rok i nie porównam licznika.');
  };
  /** Step „Historia”: the three data the free government report needs, with where to get the missing ones. */
  App.prototype.historyCard = function () {
    const self = this; const car = this.car(); const ik = this.content.intake;
    const need = ik ? ['vin', 'reg', 'first_reg'].filter((id) => ik.byId[id]) : ['vin'];
    const miss = need.filter((id) => this.intakeStatus(car, id) !== 'have');
    const card = el('div', { class: 'card hist', 'data-testid': 'history-card' });
    card.append(el('h2', null, 'Trzy dane do Historii pojazdu'));
    const ul = el('ul', { class: 'hist__list' });
    need.forEach((id) => { const f = ik ? ik.byId[id] : { label: 'VIN' }; const st = this.intakeStatus(car, id); ul.append(el('li', { class: 'hist__row is-' + st }, el('span', { class: 'hist__i', html: st === 'have' ? ICON.check : st === 'refused' ? ICON.flag : ICON.phone }), el('span', { class: 'grow' }, el('b', null, this.intakeShortLabel(f) + ': '), st === 'have' ? this.intakeText(car, id) : st === 'refused' ? 'sprzedawca odmówił' : 'brak — zapytasz w rozmowie'))); });
    card.append(ul);
    card.append(el('p', { class: 'muted' }, miss.length ? 'Bez kompletu raport się nie otworzy. Zdobądź brakujące dane w kroku 3 (dostaniesz gotowe zdania) i wróć tu — to 5 minut. Jeśli już je masz, wpisz je w kroku 1.' : 'Masz komplet. Otwórz raport, przepisz trzy dane, zapisz PDF i odhacz punkty niżej.'));
    const row = el('div', { class: 'btnrow' }, el('a', { class: 'btn' + (miss.length ? '' : ' btn--primary'), href: 'https://historiapojazdu.gov.pl/', target: '_blank', rel: 'noopener noreferrer', 'data-testid': 'vin-gov' }, 'Otwórz historiapojazdu.gov.pl', el('span', { html: ICON.ext, style: 'width:18px;height:18px;display:inline-flex' })));
    if (car.vin) row.append(el('button', { class: 'btn', type: 'button', onclick: async () => { const ok = await copyText(car.vin); self.toast(ok ? 'VIN skopiowany' : 'Nie udało się skopiować', !ok); } }, el('span', { html: ICON.copy }), 'Kopiuj VIN'));
    if (miss.length && this.content.wizard && this.content.wizard.callStep) row.append(el('button', { class: 'btn btn--primary', type: 'button', 'data-testid': 'hist-to-call', onclick: () => self.go('start/' + self.content.wizard.callStep.n) }, el('span', { html: ICON.phone }), 'Zdobądź w rozmowie'));
    card.append(row);
    return card;
  };
  /** Call step: the data missing from the listing, each as the sentence to say plus a field to type the answer (or mark a refusal). */
  App.prototype.getCard = function () {
    const self = this; const ik = this.content.intake; if (!ik) return null; const car = this.car(); this.carData(car);
    const pending = ik.fields.filter((f) => this.intakeStatus(car, f.id) === 'missing'); const refused = ik.fields.filter((f) => this.intakeStatus(car, f.id) === 'refused');
    const card = el('div', { class: 'card getcard' + (pending.length ? '' : ' getcard--done'), 'data-testid': 'getcard' });
    const rerender = () => { const fresh = self.getCard(); if (fresh) card.replaceWith(fresh); };
    if (!pending.length) {
      card.append(el('div', { class: 'row' }, el('span', { class: 'autov__i', html: ICON.check, style: 'color:var(--ok)' }), el('b', null, ik.call_done || 'Masz komplet danych.')));
      if (refused.length) card.append(el('div', { class: 'autov autov--problem', style: 'margin:10px 0 0' }, el('span', { class: 'autov__i', html: ICON.flag }), el('span', null, 'Odmowa: ' + refused.map((f) => self.intakeShortLabel(f)).join(', ') + '.')));
      return card;
    }
    card.append(el('h2', null, ik.call_title || 'Najpierw zdobądź brakujące dane'));
    if (ik.call_intro) card.append(el('p', { class: 'muted' }, ik.call_intro));
    pending.forEach((f) => {
      const box = el('div', { class: 'getrow', 'data-field': f.id });
      if (f.ask) box.append(el('blockquote', { class: 'say' }, el('b', null, 'Powiedz:'), '„' + f.ask + '”'));
      const refuse = f.refusable ? el('button', { class: 'linkbtn getrow__ref', type: 'button', 'data-testid': 'ik-ref-' + f.id, style: 'min-height:36px;padding:4px 0;font-size:15px', onclick: () => { self.setIntake(f.id, f.type === 'yesno' ? 'no' : null, { ref: true, keepMiss: true }); self.afterRefusal(f.id); rerender(); } }, ik.refused_label || 'Odmówił') : null;
      if (f.type === 'yesno') box.append(el('div', { class: 'btnrow' }, el('button', { class: 'btn btn--small btn--primary', type: 'button', onclick: () => { self.setIntake(f.id, 'yes', { got: true, keepMiss: true }); rerender(); } }, 'Zgodził się'), refuse));
      else box.append(this.intakeField(f, true, (typing) => { if (!typing) { const car2 = self.car(); if (self.intakeStatus(car2, f.id) === 'have') { self.setIntake(f.id, self.intakeVal(car2, f.id), { got: true, keepMiss: true }); } rerender(); } }), refuse);
      card.append(box);
    });
    return card;
  };
  App.prototype.afterRefusal = function (fid) {
    if (fid !== 'vin') return;
    const it = this.content.itemById.p1s1i2 && this.content.itemById.p1s1i2.ctrl && this.content.itemById.p1s1i2.ctrl.auto === 'vin_present' ? this.content.itemById.p1s1i2 : (this.content.autoItems || []).find((x) => x.ctrl.auto === 'vin_present');
    if (!it) return; const o = (it.ctrl.options || []).find((x) => x.state === 'problem');
    this.applyState(it, { state: 'problem', input: o ? o.v : null }, this.itemEl(it.id));
  };
  /** „Z ogłoszenia: …” chips under a call question that refers to intake fields. */
  App.prototype.refText = function (fid) {
    const car = this.car(); const f = this.content.intake && this.content.intake.byId[fid]; if (!f) return '';
    const st = this.intakeStatus(car, fid); const lab = this.intakeShortLabel(f);
    if (st === 'have') return lab + ': ' + this.intakeText(car, fid);
    if (st === 'refused') return lab + ': odmowa';
    return lab + ': brak (poproś wyżej)';
  };
  /** Intake rows for the report („Pomiary i dane”). */
  App.prototype.intakeRows = function (carId) {
    const car = this.state.cars[carId]; const ik = this.content.intake; if (!car || !ik) return [];
    const rows = [];
    ik.fields.forEach((f) => { const st = this.intakeStatus(car, f.id); if (st === 'have') rows.push({ label: this.intakeShortLabel(f) + (f.id === 'odo_ad' || f.id === 'price' ? ' (ogłoszenie)' : ''), value: this.intakeText(car, f.id) + (car.d && car.d.got && car.d.got[f.id] ? ' (z rozmowy)' : '') }); else if (st === 'refused') rows.push({ label: this.intakeShortLabel(f), value: 'sprzedawca odmówił' }); });
    return rows;
  };
  App.prototype.refreshBadges = function (it, row) {
    const fresh = this.itemRow(it, row._opts); const oldB = $('.item__badges', row); const newB = $('.item__badges', fresh);
    // keep thumbs already loaded
    const oldThumbs = $('.item__badges > .row', row); const newThumbs = $('.item__badges > .row', fresh);
    if (oldThumbs && newThumbs) newThumbs.replaceWith(oldThumbs);
    if (oldB && newB) oldB.replaceWith(newB);
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
    } else if (!cnt.problems.length && cnt.uwagi.length && cnt.answered < Math.max(8, Math.round(cnt.total * 0.25))) {
      kind = 'todo'; title = 'Za wcześnie na decyzję'; lead = 'Masz ' + cnt.uwagi.length + ' ' + plural(cnt.uwagi.length, 'uwagę', 'uwagi', 'uwag') + ', ale odhaczone dopiero ' + cnt.answered + ' z ' + cnt.total + ' punktów. Przejdź dokumenty, silnik i jazdę próbną, zanim zaczniesz rozmawiać o cenie.';
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
  App.prototype.negoGroups = function (carId) {
    const car = carId ? this.state.cars[carId] : this.car(); const a = (car && car.a) || {}; const groups = []; const c = this.content;
    const pick = (items) => { const rows = []; items.forEach((it) => { const v = a[it.id]; if (v && (v[0] === 'uwaga' || v[0] === 'problem')) rows.push({ item: it, state: v[0], input: v[1], note: v[2] }); }); return rows; };
    c.phases.forEach((ph, i) => {
      const rows = pick(ph.items);
      if (rows.length) groups.push({ phase: ph, rows: rows });
      if (i === 0 && c.callItems.length) { const cr = pick(c.callItems); if (cr.length) groups.push({ phase: c.callPhase, rows: cr }); } // „Rozmowa ze sprzedawcą” right after phase 1
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
        const itxt = r.input != null && r.input !== '' ? inputText(r.item, r.input) : ''; if (itxt) l += ' – ' + itxt;
        if (r.item.ctrl && r.item.ctrl.auto) { const res = this.evalAuto(r.item); if (res && res.text && res.state) l += ' – ' + res.text; }
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
    // Report CTA + paint map (the report is the shareable artefact; the list below stays)
    out.push(el('div', { class: 'card card--accent' }, el('div', { class: 'card__title' }, el('span', { class: 'reportcta__i', html: ICON.doc }), el('h2', { class: 'grow', style: 'margin:0' }, this.reportTitle)),
      el('p', { class: 'muted' }, 'Jeden dokument: decyzja, ' + (c.hasPaint ? 'mapa lakieru, ' : '') + 'wszystkie uwagi z pomiarami, notatkami i zdjęciami. Do PDF, do wysłania, do porównania.'),
      el('button', { class: 'btn btn--primary btn--block', type: 'button', 'data-testid': 'open-report', onclick: () => self.go('raport/' + encodeURIComponent(self.state.active)) }, 'Zobacz raport')));
    if (c.hasPaint && this.paintData().count) out.push(this.paintCard({ interactive: true, compact: true }));
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
            el('button', { class: 'linkbtn', style: 'min-height:32px;padding:2px 0;font-size:16px', type: 'button', onclick: () => self.openItem(r.item.id) }, 'otwórz punkt'))));
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
  async function copyText(text) { try { await navigator.clipboard.writeText(text); return true; } catch (e) { return fallbackCopy(text); } }

  /* ------------------------------------------------------------------ print */
  App.prototype.preparePrint = async function (what, carId) {
    const c = this.content; const car = this.car(); const root = this.printRoot; root.innerHTML = '';
    if (what === 'contract' && c.contract_template) {
      root.append(this.contractDom(true)); return;
    }
    if (what === 'report') {
      const id = carId && this.state.cars[carId] ? carId : this.state.active;
      const photos = await Photos.map(this.opts.product + '|' + id + '|');
      root.append(this.reportDom(id, { photos: photos, print: true })); return;
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

  /* ------------------------------------------------------------------ view: wizard „Zanim pojedziesz” (#/start, #/start/<k>) */
  // Phase 1 as one screen per step; #/phase/<phase1>, #/quick and #/call redirect here (render()). The „Rozmowa” step embeds the
  // seller call script: seller type → one opening line → dealer check / extra questions → 12 answerable questions → agreements
  // (with „Powiedz: …”) → closing → message templates → the remaining items of the call section („Po rozmowie oceń”).
  App.prototype.copyBtn = function (text, label, ev) {
    const self = this;
    return el('button', { class: 'copybtn', type: 'button', 'aria-label': label || 'Kopiuj', onclick: async () => { const ok = await copyText(text); self.toast(ok ? 'Skopiowane' : 'Nie udało się skopiować', !ok); if (ok && ev) track(ev.name, ev.props); } }, el('span', { html: ICON.copy }), 'Kopiuj');
  };
  App.prototype.viewStart = function (stepArg) {
    const self = this; const c = this.content; const w = c.wizard;
    if (!w) return [this.topbar('Kreator', ''), this.lockedCard('Ta wersja nie ma kreatora „Zanim pojedziesz”.')];
    const wp = this.wizardProgress(); const N = w.steps.length; const car = this.car();
    let n = parseInt(stepArg, 10);
    if (!(n >= 1 && n <= N)) n = wp.next ? wp.next.n : N; // #/start resumes at the first step with unanswered items
    const step = w.steps[n - 1]; const sp = wp.steps[n - 1];
    track('wizard_step_viewed', { step: n, answered: sp.answered, total: sp.total });
    const out = [this.topbar(w.phase.title, '')];
    const ind = el('div', { class: 'wiz-steps', role: 'group', 'aria-label': 'Kroki kreatora', style: '--n:' + N });
    wp.steps.forEach((s) => ind.append(el('button', { class: 'wiz-step' + (s.step.n === n ? ' is-on' : '') + (s.done ? ' is-done' : ''), type: 'button', 'aria-current': s.step.n === n ? 'step' : null, 'aria-label': 'Krok ' + s.step.n + ': ' + s.step.title + (s.done ? ' (gotowe)' : ''), 'data-step': String(s.step.n), onclick: () => self.go('start/' + s.step.n) }, s.done && s.step.n !== n ? el('span', { html: ICON.check }) : String(s.step.n))));
    out.push(ind);
    out.push(el('div', { class: 'wiz-head' }, el('h1', { 'data-testid': 'wiz-title' }, 'Krok ' + n + '/' + N + ' · ' + step.title), el('span', { class: 'chip', id: 'wiz-progress', 'aria-label': 'Odhaczone w tym kroku' }, sp.answered + '/' + sp.total)));
    out.push(el('div', { class: 'progress wiz-bar' }, el('i', { id: 'wiz-bar', style: 'width:' + (sp.total ? Math.round(100 * sp.answered / sp.total) : 0) + '%' })));
    if (n === 1 && w.phase.when) out.push(el('p', { class: 'when' }, el('span', { html: ICON.pin }), el('span', null, el('b', null, 'Kiedy: '), w.phase.when)));
    if (step.hint) out.push(el('div', { class: 'bubble bubble--inline', 'data-testid': 'wiz-hint' }, mascot(), el('div', null, el('b', null, 'Hacz: '), step.hint, el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz'))));
    if (step.call) this.callStepBody(step, out);
    else {
      if (step.intake && c.intake) out.push(this.intakeCard());
      if (step.history) out.push(this.historyCard());
      step.sections.forEach((sec) => { if (step.sections.length > 1 && sec.title) out.push(el('div', { class: 'section-title' }, sec.title)); sec.items.forEach((it) => out.push(this.itemRow(it))); });
      if (step.intake && c.intake) out.push(el('div', { id: 'intake-nudge' }, this.intakeNudge()));
    }
    const nav = el('div', { class: 'wiznav' });
    const nextPh = c.phases[w.phase.index + 1];
    if (n < N) {
      const nx = w.steps[n];
      nav.append(el('button', { class: 'btn btn--primary btn--block wiznav__next', type: 'button', 'data-testid': 'wiz-next', onclick: () => self.go('start/' + nx.n) }, el('span', null, 'Dalej'), el('small', null, 'Krok ' + nx.n + ': ' + nx.title)));
    } else {
      nav.append(el('button', { class: 'btn btn--primary btn--block wiznav__next', type: 'button', 'data-testid': 'wiz-next', onclick: () => { track('wizard_done', { answered: self.wizardProgress().steps.reduce((sum, x) => sum + x.answered, 0) }); self.go(nextPh ? 'phase/' + encodeURIComponent(nextPh.id) : 'summary'); } }, el('span', null, 'Jadę oglądać'), el('small', null, '→ ' + (nextPh ? nextPh.title : 'Podsumowanie'))));
    }
    if (n > 1) nav.append(el('button', { class: 'btn btn--ghost wiznav__back', type: 'button', onclick: () => self.go('start/' + (n - 1)) }, el('span', { html: ICON.back }), 'Wstecz: ' + w.steps[n - 2].title));
    else nav.append(el('button', { class: 'btn btn--ghost wiznav__back', type: 'button', onclick: () => self.go('') }, el('span', { html: ICON.home }), 'Start'));
    out.push(nav);
    return out;
  };
  /** The „Rozmowa” step body, appended to `out`. */
  App.prototype.callStepBody = function (step, out) {
    const self = this; const c = this.content; const s = c.wizard.script; const car = this.car(); car.q = car.q || {};
    const strList = (arr) => (Array.isArray(arr) ? arr.filter((x) => typeof x === 'string' && x.trim()) : []);
    const types = (Array.isArray(s.seller_types) ? s.seller_types : []).filter((t) => t && t.id);
    const cs = this.callState(); const type = types.find((t) => t.id === cs.type) || null;
    const ticks = car.q;
    const tickRow = (key, q, watch) => {
      const cb = el('input', { type: 'checkbox', checked: !!ticks[key], 'aria-label': 'Zadane' });
      const row = el('label', { class: 'chk' + (ticks[key] ? ' is-done' : ''), 'data-tick': key }, cb, el('span', { class: 'grow' }, el('span', { class: 'chk__q', text: q }), watch ? el('span', { class: 'watch' }, el('b', null, 'Uważaj na: '), watch) : null));
      cb.addEventListener('change', () => { if (cb.checked) ticks[key] = 1; else delete ticks[key]; row.classList.toggle('is-done', cb.checked); car.u = nowIso(); self.persist(); });
      return row;
    };
    // (a) seller type – nothing else shows until it is chosen
    const typeCard = el('div', { class: 'card typecard', 'data-testid': 'seller-type' });
    typeCard.append(el('h2', null, s.seller_type_prompt || 'Do kogo dzwonisz?'));
    if (types.length) {
      const seg = el('div', { class: 'seg seg--type', role: 'group', 'aria-label': s.seller_type_prompt || 'Typ sprzedawcy' });
      types.forEach((t) => seg.append(el('button', { type: 'button', class: cs.type === t.id ? 'is-on' : '', 'aria-pressed': cs.type === t.id ? 'true' : 'false', 'data-type': t.id, onclick: () => self.setSellerType(t.id) }, t.label || t.id)));
      typeCard.append(seg);
    }
    if (type && type.hint) typeCard.append(el('p', { class: 'typecard__hint' }, type.hint));
    if (!type && s.unknown_type_note) typeCard.append(el('p', { class: 'small muted', style: 'margin:10px 0 0' }, s.unknown_type_note));
    out.push(typeCard);
    if (!type) { out.push(el('p', { class: 'muted center', style: 'margin:16px 0' }, 'Wybierz, a poniżej pojawi się scenariusz: zdanie na start, dane do zdobycia, ' + (c.callItems.length || '') + ' pytań i ustalenia przed spotkaniem.')); return; }
    // (b) before the call – collapsed
    const before = strList(s.before);
    if (before.length || s.intro) out.push(this.foldCard('call:before', 'Zanim zadzwonisz', [s.intro ? el('p', { class: 'muted' }, s.intro) : null, before.length ? el('ul', { class: 'rules' }, before.map((t) => el('li', null, t))) : null]));
    // (c) exactly one opening line for the chosen type
    const opening = strList(type.opening)[0];
    if (opening) out.push(el('div', { class: 'card card--accent', 'data-testid': 'opening' }, el('h2', null, 'Powiedz:'), el('div', { class: 'line line--stack' }, el('blockquote', { class: 'phrase opening' }, opening), this.copyBtn(opening, 'Kopiuj zdanie na start', { name: 'script_opening_copied', props: { type: type.id } }))));
    // (c2) the data missing from the listing – sentence to say + field to type the answer
    const gc = this.getCard(); if (gc) out.push(gc);
    // (d) private → „czy to nie handlarz” (3 questions answered private/dealer + verdict + switch); dealer → 3 extra questions
    if (type.check && Array.isArray(type.check.questions) && type.check.questions.length) {
      const ch = type.check; const card = el('div', { class: 'card checkcard', 'data-testid': 'dealer-check' }, el('h2', null, ch.title || 'Sprawdź, czy to nie handlarz'));
      if (ch.intro) card.append(el('p', { class: 'muted' }, ch.intro));
      const qs = ch.questions.filter((q) => q && q.q);
      const verdictEl = el('p', { class: 'verdict', 'data-testid': 'dealer-verdict' });
      const dealer = types.find((t) => t.id === 'dealer') || types.find((t) => t !== type);
      const switchBtn = dealer ? el('button', { class: 'btn btn--block', type: 'button', 'data-testid': 'switch-dealer', onclick: () => self.setSellerType(dealer.id, true) }, 'To handlarz → przełącz') : null;
      const updVerdict = () => {
        let nd = 0, np = 0; qs.forEach((q, i) => { const v = ticks['c' + i]; if (v === 'd') nd++; else if (v === 'p') np++; });
        let cls = '', txt = ch.verdict || '';
        if (nd >= 2) { txt = ch.verdict_dealer || 'To brzmi jak handel — przełącz i pytaj jak firmę.'; cls = 'verdict--dealer'; }
        else if (nd + np === qs.length && qs.length) { txt = ch.verdict_private || 'Odpowiedzi brzmią jak osoba prywatna. Pytaj dalej.'; cls = 'verdict--private'; }
        verdictEl.textContent = txt; verdictEl.className = 'verdict' + (cls ? ' ' + cls : ''); if (switchBtn) switchBtn.classList.toggle('btn--primary', nd >= 2);
      };
      qs.forEach((q, i) => {
        const key = 'c' + i; const cur = ticks[key];
        const seg = el('div', { class: 'seg seg--wrap dc__seg', role: 'group', 'aria-label': q.q });
        [['p', q.a_private || 'Osoba prywatna'], ['d', q.a_dealer || 'Handel']].forEach((o) => seg.append(el('button', { type: 'button', class: (cur === o[0] ? 'is-on' : '') + (o[0] === 'd' ? ' dc__d' : ''), 'aria-pressed': cur === o[0] ? 'true' : 'false', 'data-o': o[0], onclick: () => { const now = ticks[key] === o[0] ? null : o[0]; if (now) ticks[key] = now; else delete ticks[key]; car.u = nowIso(); self.persist(); seg.querySelectorAll('button').forEach((x) => { const on = !!now && x.getAttribute('data-o') === now; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); }); updVerdict(); } }, o[1])));
        card.append(el('div', { class: 'dc' }, el('div', { class: 'dc__q' }, q.q), q.watch_for ? el('div', { class: 'watch' }, el('b', null, 'Jak to czytać: '), q.watch_for) : null, seg));
      });
      card.append(verdictEl); if (switchBtn) card.append(switchBtn); updVerdict();
      out.push(card);
    }
    if (Array.isArray(type.extra_questions) && type.extra_questions.length) {
      const card = el('div', { class: 'card checkcard', 'data-testid': 'dealer-extra' }, el('h2', null, 'Najpierw trzy pytania do firmy'), el('p', { class: 'muted' }, 'Zaznacz, gdy zadasz. Odpowiedzi zapisz w notatce przy pytaniach niżej.'));
      type.extra_questions.forEach((q, i) => { if (q && q.q) card.append(tickRow('d' + i, q.q, q.watch_for)); });
      out.push(card);
    }
    // (e) the questions – answered like items, counted as „Rozmowa ze sprzedawcą”
    const items = c.callItems;
    if (items.length) {
      out.push(el('div', { class: 'row', style: 'justify-content:space-between;margin:18px 0 6px' }, el('h2', { style: 'margin:0' }, items.length + ' ' + plural(items.length, 'pytanie', 'pytania', 'pytań')), el('span', { class: 'chip', id: 'call-progress' }, cs.answered + '/' + items.length + ' odpowiedzi')));
      out.push(el('p', { class: 'muted' }, 'Zaznaczaj w trakcie — odpowiedzi pasują do pytania. Notatka = dosłowny cytat; jutro zderzysz go z faktami.'));
      items.forEach((it) => out.push(this.callCard(it)));
    }
    // (f) agreements with „Powiedz: …”
    if (step.agreeItems && step.agreeItems.length) {
      out.push(el('div', { class: 'section-title', 'data-testid': 'agreements' }, 'Zanim się rozłączysz, ustal'));
      if (s.agreements_intro) out.push(el('p', { class: 'muted' }, s.agreements_intro));
      step.agreeItems.forEach((it) => out.push(this.itemRow(it, { say: true })));
    }
    // (g) closing lines
    const closing = strList(s.closing);
    if (closing.length) { const card = el('div', { class: 'card' }, el('h2', null, 'Jak zakończyć')); closing.forEach((t) => card.append(el('div', { class: 'line line--stack' }, el('blockquote', { class: 'phrase' }, t), this.copyBtn(t, 'Kopiuj zdanie')))); out.push(card); }
    // (h) prefer writing → note + message templates
    const tpls = Array.isArray(s.message_templates) ? s.message_templates.filter((t) => t && typeof t.text === 'string' && t.text.trim()) : [];
    if (tpls.length || s.no_call_note) {
      const open = !!this.openItems['call:msgs'];
      const box = el('div', { class: 'card card--soft msgs', 'data-testid': 'msg-templates', hidden: !open });
      if (s.no_call_note) box.append(el('p', { class: 'muted' }, s.no_call_note));
      tpls.forEach((t, i) => box.append(el('div', { class: 'tpl' }, el('div', { class: 'tpl__head' }, el('h3', { class: 'grow', text: t.title || 'Wiadomość ' + (i + 1) }), this.copyBtn(t.text, 'Kopiuj wiadomość: ' + (t.title || i + 1), { name: 'script_message_copied', props: { index: i, title: String(t.title || '').slice(0, 40) } })), el('pre', { class: 'tpl__text', text: t.text }))));
      const tb = el('button', { class: 'btn btn--ghost btn--block', type: 'button', 'aria-expanded': open ? 'true' : 'false', 'data-testid': 'prefer-write', onclick: () => { const o = box.hidden; box.hidden = !o; self.openItems['call:msgs'] = o; tb.setAttribute('aria-expanded', o ? 'true' : 'false'); } }, el('span', { html: ICON.note }), 'Wolę napisać, nie dzwonić');
      out.push(tb, box);
    }
    // (i) the remaining items of the call section
    if (step.afterItems && step.afterItems.length) {
      out.push(el('div', { class: 'section-title' }, 'Po rozmowie oceń'));
      step.afterItems.forEach((it) => out.push(this.itemRow(it)));
    }
    out.push(el('button', { class: 'btn btn--ghost btn--block', type: 'button', style: 'margin-top:6px', onclick: () => self.sheetConfirm('Wyczyścić rozmowę?', 'Usuniesz odpowiedzi na pytania z rozmowy, zaznaczenia i typ sprzedawcy dla tego auta. Ustalenia i inne punkty zostają.', 'Wyczyść', () => { const cur = self.car(); c.callItems.forEach((it) => { delete cur.a[it.id]; }); cur.q = {}; delete cur.st; delete cur.cd; cur.u = nowIso(); self.persist(); self.toast('Wyczyszczono'); self.render(); }) }, 'Wyczyść odpowiedzi z rozmowy'));
  };
  /** One question of the call script as an answerable card (same states, note and badges as an item row). */
  App.prototype.callCard = function (it) {
    const self = this; const a = this.ans(it.id) || []; const n = this.content.callItems.length;
    const row = el('article', { class: 'item qitem' + (a[0] ? ' is-' + a[0] : ''), 'data-item': it.id });
    const badges = el('div', { class: 'item__badges' });
    if (a[2]) badges.append(el('span', { class: 'badge badge--note' }, el('span', { html: ICON.note, style: 'width:14px;height:14px;display:inline-flex' }), el('span', { text: a[2] })));
    row.append(el('div', { class: 'qitem__head' }, el('span', { class: 'qitem__n', text: it.n + '/' + n }), el('div', { class: 'grow' }, el('div', { class: 'qitem__q', text: it.text }), badges)));
    if (it.ref && it.ref.length && this.content.intake) { const parts = it.ref.map((fid) => this.refText(fid)).filter(Boolean); if (parts.length) row.append(el('div', { class: 'refline' }, el('b', null, 'Z ogłoszenia: '), parts.join(' · '))); }
    if (it.watch_for) row.append(el('div', { class: 'watch' }, el('b', null, 'Uważaj na: '), it.watch_for));
    if (it.if_dodges) {
      const dodge = el('div', { class: 'dodge', hidden: true }, el('b', null, 'Jeśli kręci: '), it.if_dodges);
      const tb = el('button', { class: 'toolbtn', type: 'button', 'aria-expanded': 'false' }, el('span', { html: ICON.chev }), 'Jeśli kręci');
      tb.addEventListener('click', () => { dodge.hidden = !dodge.hidden; tb.setAttribute('aria-expanded', dodge.hidden ? 'false' : 'true'); });
      row.append(tb, dodge);
    }
    row.append(this.answerBar(it, a, row));
    const tools = el('div', { class: 'item__tools' });
    const noteBox = el('div', { class: 'note', hidden: !a[2] });
    const ta = el('textarea', { placeholder: 'Zapisz dosłownie, co powiedział sprzedawca…', 'aria-label': 'Notatka' }); ta.value = a[2] || '';
    ta.addEventListener('input', () => { self.setAnswer(it.id, { note: ta.value.trim() }); self.refreshBadges(it, row); });
    noteBox.append(ta);
    tools.append(el('button', { class: 'toolbtn', type: 'button', onclick: () => { noteBox.hidden = !noteBox.hidden; if (!noteBox.hidden) ta.focus(); } }, el('span', { html: ICON.note }), a[2] ? 'Notatka' : 'Dodaj notatkę'));
    row.append(tools, noteBox);
    return row;
  };
  /** After a call question changes: progress chip; when all are answered the script item („Zadzwoń i przejdź skrypt”) is done by definition. */
  App.prototype.afterCallAnswer = function () {
    const w = this.content.wizard; const car = this.car(); const cs = this.callState();
    const chip = $('#call-progress', this.root); if (chip) chip.textContent = cs.answered + '/' + cs.total + ' odpowiedzi';
    if (!cs.done) return;
    if (!car.cd) { car.cd = 1; this.persist(false); const cc = this.counts().call || {}; track('call_done', { type: cs.type || '', problems: cc.problem || 0, uwagi: cc.uwaga || 0 }); }
    const si = w && w.callStep && w.callStep.scriptItem;
    if (si && !this.stateOf(si.id)) { this.setAnswer(si.id, { state: 'ok' }); this.toast('Rozmowa odhaczona ✓'); }
  };
  App.prototype.refreshWizard = function () {
    const w = this.content.wizard; if (!w) return; const wp = this.wizardProgress();
    const cur = this.root.querySelector('.wiz-step.is-on'); const n = cur ? parseInt(cur.getAttribute('data-step'), 10) : 0; const sp = wp.steps[n - 1]; if (!sp) return;
    const chip = $('#wiz-progress', this.root); if (chip) chip.textContent = sp.answered + '/' + sp.total;
    const bar = $('#wiz-bar', this.root); if (bar) bar.style.width = (sp.total ? Math.round(100 * sp.answered / sp.total) : 0) + '%';
    this.root.querySelectorAll('.wiz-step').forEach((b) => { const s = wp.steps[parseInt(b.getAttribute('data-step'), 10) - 1]; if (!s) return; b.classList.toggle('is-done', s.done); if (s.step.n !== n) { b.innerHTML = ''; b.append(s.done ? el('span', { html: ICON.check }) : document.createTextNode(String(s.step.n))); } });
  };
  App.prototype.setSellerType = function (type, switched) {
    const car = this.car(); if (car.st === type) return;
    const first = !car.st; car.st = type; car.u = nowIso(); this.persist();
    track(first ? 'call_started' : 'call_type_switched', { type: type });
    if (switched) this.toast('Przełączono: pytaj jak firmę');
    this.render();
  };
  /** Collapsible card (state kept per session in openItems[key]). */
  App.prototype.foldCard = function (key, title, body) {
    const self = this; const open = !!this.openItems[key];
    const card = el('div', { class: 'card fold' + (open ? ' is-open' : ''), 'data-fold': key });
    const head = el('button', { class: 'fold__head', type: 'button', 'aria-expanded': open ? 'true' : 'false', onclick: () => { const o = !card.classList.contains('is-open'); card.classList.toggle('is-open', o); head.setAttribute('aria-expanded', o ? 'true' : 'false'); self.openItems[key] = o; } }, el('h2', { text: title }), el('span', { class: 'chev', html: ICON.chev }));
    card.append(head, el('div', { class: 'fold__body' }, body));
    return card;
  };

  /* ------------------------------------------------------------------ paint map (Mapa lakieru) */
  /** Readings per panel + levels relative to the baseline (roof, else median): ≤1.4× ok, 1.4–2.4× warn, >2.4× bad. */
  App.prototype.paintData = function (carId) {
    const c = this.content; const car = carId ? this.state.cars[carId] : this.car(); const a = (car && car.a) || {};
    const d = { readings: {}, values: [], baseline: null, baseSrc: null, levels: {}, max: null, count: 0, flagged: [], panels: Object.keys(c.panelItem || {}).length };
    if (!c.hasPaint) return d;
    PANELS.forEach((p) => { const it = c.panelItem[p.key]; if (!it) return; const v = a[it.id] && a[it.id][1]; const n = typeof v === 'number' ? v : (v != null && v !== '' ? Number(v) : NaN); if (isFinite(n) && n > 0) { d.readings[p.key] = n; d.values.push(n); } });
    d.count = d.values.length;
    if (d.readings.roof) { d.baseline = d.readings.roof; d.baseSrc = 'roof'; }
    else if (d.count) { const s = d.values.slice().sort((x, y) => x - y); const m = s.length >> 1; d.baseline = s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; d.baseSrc = 'median'; }
    PANELS.forEach((p) => {
      const v = d.readings[p.key];
      if (v == null) { d.levels[p.key] = c.panelItem[p.key] ? 'none' : 'na'; return; }
      const r = d.baseline ? v / d.baseline : 1; const lv = r > 2.4 ? 'bad' : r > 1.4 ? 'warn' : 'ok';
      d.levels[p.key] = lv; if (lv !== 'ok') d.flagged.push({ key: p.key, value: v, ratio: r, level: lv });
      if (!d.max || v > d.max.value) d.max = { key: p.key, value: v, ratio: r, level: lv };
    });
    d.flagged.sort((x, y) => y.ratio - x.ratio);
    return d;
  };
  /** Inline SVG top view: 12 tappable panels, value labels, hatched = missing. */
  App.prototype.paintSvg = function (d, interactive) {
    const c = this.content; const pid = 'hatch-' + uid();
    let s = '<svg class="paintmap__svg" viewBox="0 0 240 440" role="img" aria-label="Mapa grubości lakieru – widok auta z góry, przód u góry" focusable="false">';
    s += '<defs><pattern id="' + pid + '" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><rect class="hatch-bg" width="7" height="7"/><rect class="hatch-fg" width="2.5" height="7"/></pattern></defs>';
    s += '<rect class="pm-body" x="26" y="16" width="188" height="386" rx="46" ry="46"/>';
    [[16, 62], [208, 62], [16, 318], [208, 318]].forEach((w) => { s += '<rect class="pm-wheel" x="' + w[0] + '" y="' + w[1] + '" width="16" height="50" rx="6"/>'; });
    s += '<rect class="pm-glass" x="70" y="114" width="100" height="38" rx="8"/><rect class="pm-glass" x="72" y="264" width="96" height="34" rx="8"/>';
    PANELS.forEach((p) => {
      const lv = d.levels[p.key] || 'na'; const v = d.readings[p.key]; const it = c.panelItem[p.key];
      const label = p.label + ': ' + (v != null ? fmtNum(v) + ' µm, ' + PAINT_LEVEL[lv] + (d.baseline && p.key !== 'roof' ? ' (' + ratioText(v / d.baseline) + ' bazy)' : '') : PAINT_LEVEL[lv]);
      s += '<g class="pnl lv-' + lv + '" data-panel="' + p.key + '"' + (interactive && it ? ' role="button" tabindex="0"' : '') + ' aria-label="' + esc(label) + '"><title>' + esc(label) + '</title>';
      PANEL_GEOM[p.key].forEach((g) => { s += '<rect class="pnl__fill" x="' + g[0] + '" y="' + g[1] + '" width="' + g[2] + '" height="' + g[3] + '" rx="7"' + (lv === 'none' || lv === 'na' ? ' fill="url(#' + pid + ')"' : '') + '/>'; });
      if (v != null) {
        const g = PANEL_GEOM[p.key][0]; const cx = g[0] + g[2] / 2, cy = g[1] + g[3] / 2; const txt = fmtNum(v);
        if (p.key === 'sills') s += '<text class="pnl__v" x="' + cx + '" y="' + cy + '" font-size="9" transform="rotate(-90 ' + cx + ' ' + cy + ')">' + esc(txt) + '</text>';
        else s += '<text class="pnl__v" x="' + cx + '" y="' + cy + '" font-size="' + (g[2] > 60 ? 15 : (txt.length > 3 ? 8.5 : 10.5)) + '">' + esc(txt) + '</text>';
      }
      s += '</g>';
    });
    s += '<text class="pm-cap" x="120" y="11" font-size="10">przód</text><text class="pm-cap" x="120" y="416" font-size="10">tył</text>';
    s += '<text class="pm-cap" x="52" y="433" font-size="9">lewa strona</text><text class="pm-cap" x="188" y="433" font-size="9">prawa strona</text></svg>';
    const wrap = el('div', { class: 'paintmap', html: s });
    if (interactive) {
      const self = this;
      wrap.querySelectorAll('.pnl[role="button"]').forEach((g) => {
        const it = c.panelItem[g.getAttribute('data-panel')]; if (!it) return;
        const open = () => { track('paint_panel_tap', { panel: g.getAttribute('data-panel') }); self.revealItem(it.id, true); };
        g.addEventListener('click', open);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      });
    }
    return wrap;
  };
  /** Card: map + legend + baseline + hedged interpretation (+ list of panels unless compact). opts: {carId, interactive, live, compact, title} */
  App.prototype.paintCard = function (opts) {
    opts = opts || {}; const c = this.content; if (!c.hasPaint) return null;
    const self = this; const d = this.paintData(opts.carId);
    const card = el('section', { class: 'card paintcard', 'aria-label': 'Mapa lakieru', 'data-testid': 'paint-map' });
    if (opts.live) card.setAttribute('data-live', '1');
    card._paintOpts = opts;
    card.append(el('div', { class: 'card__title' }, el('h2', { class: 'grow', style: 'margin:0', text: opts.title || 'Mapa lakieru' }), el('span', { class: 'chip', text: d.count + '/' + d.panels + ' odczytów' })));
    card.append(this.paintSvg(d, !!opts.interactive));
    const legend = el('div', { class: 'paint-legend', 'aria-label': 'Legenda' });
    [['ok', '≤ 1,4× bazy'], ['warn', '1,4–2,4× bazy'], ['bad', '> 2,4× bazy'], ['none', 'brak odczytu']].forEach((x) => legend.append(el('span', { class: 'pl pl--' + x[0] }, el('i'), x[1])));
    card.append(legend);
    card.append(el('p', { class: 'paint-base' }, this.paintBaseText(d)));
    card.append(el('p', { class: 'paint-note', 'data-testid': 'paint-note' }, this.paintInterpretation(d)));
    if (!opts.compact) {
      const list = el('div', { class: 'paint-list' });
      PANELS.forEach((p) => {
        const it = c.panelItem[p.key]; if (!it) return; const lv = d.levels[p.key]; const v = d.readings[p.key];
        const props = { class: 'paint-row lv-' + lv, 'data-panel': p.key };
        if (opts.interactive) { props.type = 'button'; props.onclick = () => self.revealItem(it.id, true); props['aria-label'] = p.label + ': ' + (v != null ? fmtNum(v) + ' µm' : 'brak odczytu') + ' – otwórz punkt'; }
        list.append(el(opts.interactive ? 'button' : 'div', props, el('i', { class: 'dot' }), el('span', { class: 'grow', text: p.label }), el('b', { text: v != null ? fmtNum(v) + ' µm' : '—' }), el('small', { text: v != null ? (d.baseline ? ratioText(v / d.baseline) : '') : (opts.interactive ? 'wpisz' : 'brak') })));
      });
      card.append(list);
    }
    return card;
  };
  App.prototype.paintBaseText = function (d) {
    if (!d.count) return 'Baza: dach. Zmierz go pierwszy — do niego porównujemy resztę.';
    if (d.baseSrc === 'roof') return 'Baza: dach ' + fmtNum(d.baseline) + ' µm. Kolor mówi, ile razy element odstaje od dachu.';
    return 'Baza: mediana odczytów ' + fmtNum(d.baseline) + ' µm — bez odczytu dachu. Wpisz dach, będzie dokładniej.';
  };
  App.prototype.paintInterpretation = function (d) {
    const fixed = 'Odczyty wyraźnie wyższe niż dach zwykle oznaczają lakierowanie; kilkaset µm — możliwa szpachla. To widełki, nie wyrok.';
    if (!d.count) return 'Wpisz odczyty przy punktach — mapa pokoloruje się sama. ' + fixed;
    const bad = d.flagged.filter((f) => f.level === 'bad'), warn = d.flagged.filter((f) => f.level === 'warn');
    if (bad.length) { const m = bad[0]; return 'Najwyżej: ' + PANEL_INDEX[m.key].label.toLowerCase() + ' ' + fmtNum(m.value) + ' µm (' + ratioText(m.ratio) + ' bazy)' + (d.flagged.length > 1 ? '; łącznie ' + d.flagged.length + ' ' + plural(d.flagged.length, 'element odstaje', 'elementy odstają', 'elementów odstaje') : '') + '. ' + fixed; }
    if (warn.length) return warn.length + ' ' + plural(warn.length, 'element powyżej bazy', 'elementy powyżej bazy', 'elementów powyżej bazy') + ': ' + warn.map((f) => PANEL_INDEX[f.key].label.toLowerCase()).join(', ') + '. Zapytaj, co tam było. ' + fixed;
    return 'W zmierzonych miejscach odczyty trzymają się bazy' + (d.count < d.panels ? ' — domierz resztę, zanim uznasz lakier za jednolity' : '') + '. ' + fixed;
  };
  App.prototype.refreshPaintMaps = function () {
    const self = this;
    this.root.querySelectorAll('.paintcard[data-live]').forEach((old) => { const fresh = self.paintCard(old._paintOpts || { interactive: true, live: true }); if (fresh) old.replaceWith(fresh); });
  };
  /** Expand an item in the current view (scroll + optional focus on its input); falls back to navigating to its phase. */
  App.prototype.revealItem = function (itemId, focusInput) {
    const row = this.itemEl(itemId); const it = this.content.itemById[itemId];
    if (!row || !it) { this.openItem(itemId); return; }
    this.openItems[itemId] = true; row.classList.add('is-open'); const h = $('.item__head', row); if (h) h.setAttribute('aria-expanded', 'true'); this.loadPhotos(it, row);
    row.scrollIntoView({ block: 'center', behavior: 'smooth' });
    if (focusInput) { const inp = $('.field input', row); if (inp) setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 350); }
  };

  /* ------------------------------------------------------------------ view: quick filter (Szybki filtr) */
  App.prototype.filterEnabled = function () { const c = this.content; return !!(c.quickItems && c.quickItems.length && (c.quickExplicit || this.opts.kind !== 'upsell')); };
  App.prototype.quickStats = function (carId) {
    const c = this.content; const car = carId ? this.state.cars[carId] : this.car(); const a = (car && car.a) || {};
    const s = { total: c.quickItems.length, answered: 0, db: [], problems: [], uwagi: [] };
    c.quickItems.forEach((it) => { const st = a[it.id] && a[it.id][0]; if (!st) return; s.answered++; if (st === 'problem') { s.problems.push(it); if (it.dealbreaker) s.db.push(it); } else if (st === 'uwaga') s.uwagi.push(it); });
    s.done = s.total > 0 && s.answered === s.total; s.verdict = !s.done ? null : (s.db.length ? 'walk' : 'pass');
    return s;
  };
  App.prototype.viewFilter = function () {
    const c = this.content;
    if (!this.filterEnabled()) return [this.topbar('Szybki filtr', ''), this.lockedCard('Ta wersja nie ma szybkiego filtra.')];
    const s = this.quickStats();
    const out = [this.topbar('Szybki filtr', '')];
    out.push(el('h1', { style: 'font-size:26px;margin-top:4px' }, 'Najpierw odsiej. Potem sprawdzaj dokładnie.'));
    out.push(el('p', { class: 'muted' }, s.total + ' ' + plural(s.total, 'punkt', 'punkty', 'punktów') + ' z całej checklisty. Te same odpowiedzi co w etapach — nic nie robisz dwa razy.'));
    out.push(el('div', { class: 'chips' }, el('span', { class: 'chip' }, el('span', { html: ICON.clock }), '~10 min'), el('span', { class: 'chip', id: 'filtr-progress' }, s.answered + '/' + s.total + ' odhaczone')));
    out.push(el('div', { class: 'bubble bubble--inline' }, mascot(), el('div', null, el('b', null, 'Hacz: '), 'Jeśli tu coś nie gra, reszta nie ma znaczenia — i oszczędzasz godzinę. Jeśli gra, dopiero zaczynasz.', el('span', { class: 'sign' }, 'Hacz – asystent AI marki Odhacz'))));
    c.quickByPhase.forEach((g) => { out.push(el('div', { class: 'section-title' }, g.phase.title)); g.items.forEach((it) => out.push(this.itemRow(it))); });
    out.push(el('div', { id: 'filtr-verdict', 'data-testid': 'filtr-verdict' }, this.filterVerdict(s)));
    return out;
  };
  App.prototype.filterVerdict = function (s) {
    const self = this; const c = this.content; s = s || this.quickStats();
    if (!s.done) return el('p', { class: 'muted center', style: 'margin:18px 0' }, 'Werdykt pojawi się po ostatnim punkcie (zostało ' + (s.total - s.answered) + ').');
    const car = this.car();
    if (!car.qf) { car.qf = 1; this.persist(false); track('quick_filter_done', { verdict: s.verdict, db: s.db.length, problems: s.problems.length, uwagi: s.uwagi.length, total: s.total }); }
    if (s.verdict === 'walk') {
      const box = el('section', { class: 'decision decision--walk', 'aria-label': 'Werdykt' }, el('div', { class: 'decision__label' }, 'Werdykt filtra'), el('h2', null, 'Odpuść — nie trać godziny'),
        el('p', null, s.db.length + ' ' + plural(s.db.length, 'dealbreaker', 'dealbreakery', 'dealbreakerów') + ' na „Problem”. Pełne oględziny tego nie odwrócą.'));
      box.append(el('p', { style: 'margin:8px 0 0;font-weight:600' }, 'Dlaczego:'), el('ul', null, s.db.map((it) => el('li', null, it.flag_label || it.text))));
      box.append(el('div', { class: 'btnrow' }, el('button', { class: 'btn', type: 'button', onclick: () => self.go('summary') }, 'Zobacz podsumowanie'), el('button', { class: 'btn', type: 'button', onclick: () => self.sheetCars() }, el('span', { html: ICON.plus }), 'Następne auto')));
      return box;
    }
    const next = c.phases[1] || c.phases[0]; const n = s.problems.length + s.uwagi.length;
    const box = el('section', { class: 'decision decision--ok', 'aria-label': 'Werdykt' }, el('div', { class: 'decision__label' }, 'Werdykt filtra'), el('h2', null, 'Auto przeszło filtr. Zacznij pełne oględziny'),
      el('p', null, 'Żaden dealbreaker nie wypadł na „Problem”.' + (n ? ' Masz ' + n + ' ' + plural(n, 'uwagę', 'uwagi', 'uwag') + ' — trafią na listę do negocjacji.' : ' Teraz dokładnie: dokumenty, lakier, silnik na zimno, jazda.')));
    if (next) box.append(el('button', { class: 'btn btn--primary btn--block', type: 'button', onclick: () => self.go('phase/' + encodeURIComponent(next.id)) }, 'Etap ' + (next.index + 1) + ': ' + next.title, el('span', { html: ICON.chev, style: 'transform:rotate(-90deg);display:inline-flex' })));
    return box;
  };
  App.prototype.refreshFilter = function () {
    const s = this.quickStats(); const chip = $('#filtr-progress', this.root); if (chip) chip.textContent = s.answered + '/' + s.total + ' odhaczone';
    const v = $('#filtr-verdict', this.root); if (v) { v.innerHTML = ''; v.append(this.filterVerdict(s)); }
  };

  /* ------------------------------------------------------------------ view: report (Raport z oględzin) */
  App.prototype.carDate = function (car) { return String(car.u || car.created || nowIso()).slice(0, 10); };
  App.prototype.photoKeyFor = function (carId, itemId) { return this.opts.product + '|' + carId + '|' + itemId; };
  App.prototype.viewReport = function (carId) {
    const self = this; const id = carId && this.state.cars[carId] ? carId : this.state.active; const car = this.state.cars[id];
    const out = [this.topbar(this.reportTitle, id === this.state.active ? 'summary' : 'porownaj', false)];
    if (!car) { out.push(this.lockedCard('Nie ma takiego auta.')); return out; }
    const cnt = this.counts(id); const many = Object.keys(this.state.cars).length >= 2;
    track('report_viewed', { answered: cnt.answered, total: cnt.total, problem: cnt.problem, db: cnt.db, decision: this.decide(cnt).kind });
    const actions = el('div', { class: 'btnrow report-actions' },
      el('button', { class: 'btn btn--primary', type: 'button', 'data-testid': 'report-pdf', onclick: async () => { await self.preparePrint('report', id); track('report_pdf', { answered: cnt.answered, problem: cnt.problem }); window.print(); } }, el('span', { html: ICON.print }), 'Zapisz jako PDF'),
      el('button', { class: 'btn', type: 'button', 'data-testid': 'report-copy', onclick: async () => { const ok = await copyText(self.reportText(id)); self.toast(ok ? 'Raport skopiowany' : 'Nie udało się skopiować', !ok); if (ok) track('report_copied', { answered: cnt.answered, problem: cnt.problem }); } }, el('span', { html: ICON.copy }), 'Kopiuj raport'),
      navigator.share ? el('button', { class: 'btn', type: 'button', 'data-testid': 'report-share', onclick: async () => { try { await navigator.share({ title: self.reportTitle + ' – ' + car.name, text: self.reportText(id) }); track('report_shared', { answered: cnt.answered }); } catch (e) { /* cancelled */ } } }, el('span', { html: ICON.share }), 'Udostępnij') : null);
    out.push(actions);
    const doc = this.reportDom(id, {}); out.push(doc); this.fillReportPhotos(doc, id);
    out.push(el('div', { class: 'btnrow mt' }, el('button', { class: 'btn', type: 'button', onclick: () => { if (id !== self.state.active) { self.state.active = id; self.persist(); } self.go('summary'); } }, 'Podsumowanie'), many ? el('button', { class: 'btn', type: 'button', onclick: () => self.go('porownaj') }, el('span', { html: ICON.car }), 'Porównaj auta') : null));
    this.preparePrint('report', id); // Ctrl+P / „Drukuj” z menu przeglądarki też daje raport
    return out;
  };
  /** The document itself (screen and print). opts.photos: map from Photos.map() for print; on screen photos load async. */
  App.prototype.reportDom = function (id, opts) {
    opts = opts || {}; const c = this.content; const car = this.state.cars[id]; const cnt = this.counts(id); const d = this.decide(cnt); const groups = this.negoGroups(id); const rules = c.summary_rules || {}; const photos = opts.photos || null;
    const doc = el('article', { class: 'report', 'data-testid': 'report' });
    doc.append(el('header', { class: 'report__head' }, el('div', { class: 'report__eyebrow' }, this.appName + ' · ' + this.reportTitle), el('h1', { class: 'report__title', text: car.name }),
      el('div', { class: 'report__meta' }, fmtPl(this.carDate(car)) + ' · ' + cnt.answered + '/' + cnt.total + ' ' + plural(cnt.total, 'punkt', 'punkty', 'punktów') + ' odhaczonych' + this.carMetaText(id))));
    doc.append(el('div', { class: 'counts' },
      el('div', { class: 'count count--ok' }, el('b', { text: String(cnt.ok) }), el('span', null, 'OK')),
      el('div', { class: 'count count--uwaga' }, el('b', { text: String(cnt.uwaga) }), el('span', null, 'Uwaga')),
      el('div', { class: 'count count--problem' }, el('b', { text: String(cnt.problem) }), el('span', null, 'Problem')),
      el('div', { class: 'count count--db' }, el('b', { text: String(cnt.db) }), el('span', null, 'Dealbreakery'))));
    const dec = el('section', { class: 'decision decision--' + d.kind, 'aria-label': 'Decyzja' }, el('div', { class: 'decision__label' }, 'Decyzja'), el('h2', { text: d.title }), el('p', null, d.lead));
    if (d.reasons.length) dec.append(el('p', { style: 'margin:8px 0 0;font-weight:600' }, 'Dlaczego:'), el('ul', null, d.reasons.map((r) => el('li', null, r))));
    doc.append(dec);
    if (c.hasPaint && this.paintData(id).count) doc.append(this.paintCard({ carId: id, title: 'Mapa lakieru' }));
    const list = el('section', { class: 'card report__list' }, el('h2', null, 'Uwagi i problemy'));
    if (!groups.length) list.append(el('p', { class: 'muted' }, cnt.answered ? 'Brak uwag i problemów w odhaczonych punktach.' : 'Jeszcze nic nie odhaczono.'));
    groups.forEach((g) => {
      list.append(el('h3', { class: 'report__ph', text: g.phase.title }));
      g.rows.forEach((r) => {
        const it = r.item; const box = el('div', { class: 'rep-item s-' + r.state, 'data-item': it.id });
        box.append(el('div', { class: 'rep-item__t' }, el('span', { class: 'rep-state', text: STATE_LABEL[r.state] || r.state }), el('span', null, r.state === 'problem' && it.flag_label ? it.flag_label : it.text, it.dealbreaker && r.state === 'problem' ? el('span', { class: 'db' }, ' · dealbreaker') : null)));
        if (r.state === 'problem' && it.flag_label) box.append(el('div', { class: 'rep-item__sub', text: it.text }));
        const itxt = r.input != null && r.input !== '' ? inputText(it, r.input) : '';
        if (itxt) box.append(el('div', { class: 'rep-item__meta' }, el('b', null, (it.input && it.input.label ? it.input.label : it.ctrl && !it.ctrl.generic ? 'Odpowiedź' : 'Pomiar') + ': '), itxt));
        if (it.ctrl && it.ctrl.auto) { const res = this.evalAuto(it, id); if (res && res.text && res.state) box.append(el('div', { class: 'rep-item__meta' }, el('b', null, 'Ocena: '), res.text)); }
        if (r.note) box.append(el('div', { class: 'rep-item__meta' }, el('b', null, 'Notatka: '), r.note));
        if (it.photo) { const ph = el('div', { class: 'rep-photos', 'data-photos': it.id }); const l = photos && photos[this.photoKeyFor(id, it.id)]; if (l && l.length) l.forEach((u, i) => ph.append(el('img', { src: u, alt: 'Zdjęcie ' + (i + 1) }))); box.append(ph); }
        list.append(box);
      });
    });
    doc.append(list);
    const inputs = []; c.items.forEach((it) => { const v = car.a && car.a[it.id] && car.a[it.id][1]; if (it.input && v != null && v !== '') inputs.push({ it: it, v: v }); });
    const ikRows = this.intakeRows(id);
    if (inputs.length || ikRows.length) doc.append(el('section', { class: 'card' }, el('h2', null, 'Pomiary i dane'), el('dl', { class: 'rep-data' }, ikRows.map((x) => [el('dt', { text: x.label }), el('dd', { text: x.value })]).concat(inputs.map((x) => [el('dt', { text: x.it.input.label || x.it.text }), el('dd', { text: inputText(x.it, x.v) })])))));
    const qs = this.reportQuestions(id, cnt, d, groups);
    if (qs.length) doc.append(el('section', { class: 'card' }, el('h2', null, 'Pytania, które warto zadać przed decyzją'), el('ol', { class: 'rep-q' }, qs.map((q) => el('li', null, q)))));
    if (Array.isArray(rules.safe_deal_rules) && rules.safe_deal_rules.length) doc.append(el('section', { class: 'card' }, el('h2', null, 'Zasady bezpiecznej transakcji'), el('ul', { class: 'rules' }, rules.safe_deal_rules.map((r) => el('li', null, r)))));
    doc.append(el('footer', { class: 'report__foot' }, (c.meta.disclaimer || '') + ' Raport wygenerowany w ' + this.appName + ' ' + fmtPl(todayStr()) + '. Odpowiedzi, pomiary, notatki i zdjęcia pochodzą od użytkownika.'));
    return doc;
  };
  App.prototype.fillReportPhotos = async function (doc, id) {
    const self = this; const map = await Photos.map(this.opts.product + '|' + id + '|');
    doc.querySelectorAll('[data-photos]').forEach((ph) => { const l = map[self.photoKeyFor(id, ph.getAttribute('data-photos'))]; if (!l || !l.length) return; ph.innerHTML = ''; l.forEach((u, i) => ph.append(el('img', { src: u, alt: 'Zdjęcie ' + (i + 1) }))); });
  };
  /** Questions before the decision: from flagged items, the paint map, the decision, and the call script (only questions not yet ticked, if the script was used). */
  App.prototype.reportQuestions = function (id, cnt, d, groups) {
    const c = this.content; const car = this.state.cars[id]; const out = [];
    if (d.kind === 'walk') return ['Dealbreaker to nie temat do negocjacji. Jeśli mimo to rozważasz zakup: „Czy pokaże Pan/Pani dokumenty, które to wyjaśniają?” — i decyzja dopiero po nich.'];
    const rows = []; groups.forEach((g) => g.rows.forEach((r) => rows.push(r)));
    rows.filter((r) => r.state === 'problem').concat(rows.filter((r) => r.state === 'uwaga')).slice(0, 5).forEach((r) => {
      const label = r.state === 'problem' && r.item.flag_label ? r.item.flag_label : r.item.text;
      const pre = r.item.call || c.phaseOfItem[r.item.id] === c.phases[0];
      out.push(r.state === 'problem' ? 'Skąd „' + label + '”? Jest na to dokument, faktura albo wyjaśnienie, które da się sprawdzić?' : pre ? 'Wyjaśnij przed decyzją: ' + label + '.' : 'Czy cena uwzględnia: ' + label + '?');
    });
    const pd = c.hasPaint ? this.paintData(id) : null;
    if (pd && pd.flagged.length) out.push('Które elementy były lakierowane i dlaczego? Miernik pokazuje: ' + pd.flagged.slice(0, 3).map((f) => PANEL_INDEX[f.key].label.toLowerCase() + ' ' + fmtNum(f.value) + ' µm').join(', ') + (pd.baseline ? ' przy bazie ' + fmtNum(pd.baseline) + ' µm' : '') + '.');
    if (d.kind === 'mech') out.push('Zgoda na sprawdzenie u mechanika lub na stacji diagnostycznej przed decyzją — na mój koszt, w tym tygodniu?');
    const cs = this.callState(id); // call-script questions still unanswered – only once the call was started
    if (cs.started && !cs.done) c.callItems.forEach((it) => { const v = car.a && car.a[it.id]; if (!(v && v[0]) && out.length < 9) out.push(it.text); });
    return out.slice(0, 9);
  };
  /** Plain-text report (clipboard / share). */
  App.prototype.reportText = function (id) {
    const c = this.content; const car = this.state.cars[id]; const cnt = this.counts(id); const d = this.decide(cnt); const groups = this.negoGroups(id); const rules = c.summary_rules || {};
    const L = [this.appName.toUpperCase() + ' · ' + this.reportTitle.toUpperCase(), car.name, fmtPl(this.carDate(car)) + ' · ' + cnt.answered + '/' + cnt.total + ' punktów' + this.carMetaText(id), '',
      'OK: ' + cnt.ok + ' · Uwaga: ' + cnt.uwaga + ' · Problem: ' + cnt.problem + ' · Dealbreakery: ' + cnt.db, '', 'DECYZJA: ' + d.title, d.lead];
    d.reasons.forEach((r) => L.push('- ' + r)); L.push('');
    if (c.hasPaint) { const pd = this.paintData(id); if (pd.count) { L.push('MAPA LAKIERU — ' + this.paintBaseText(pd)); PANELS.forEach((p) => { if (!c.panelItem[p.key]) return; const v = pd.readings[p.key]; L.push('- ' + p.label + ': ' + (v != null ? fmtNum(v) + ' µm' + (pd.baseline ? ' (' + ratioText(v / pd.baseline) + ', ' + PAINT_LEVEL[pd.levels[p.key]] + ')' : '') : 'brak odczytu')); }); L.push(this.paintInterpretation(pd), ''); } }
    L.push('UWAGI I PROBLEMY');
    if (!groups.length) L.push('- brak');
    groups.forEach((g) => { L.push(g.phase.title.toUpperCase()); g.rows.forEach((r) => { let l = '- [' + (STATE_LABEL[r.state] || r.state).toUpperCase() + '] ' + (r.item.flag_label && r.state === 'problem' ? r.item.flag_label + ' (' + r.item.text + ')' : r.item.text); if (r.item.dealbreaker && r.state === 'problem') l += ' — DEALBREAKER'; const itxt = r.input != null && r.input !== '' ? inputText(r.item, r.input) : ''; if (itxt) l += ' — ' + (r.item.input && r.item.input.label ? r.item.input.label + ': ' : '') + itxt; if (r.item.ctrl && r.item.ctrl.auto) { const res = this.evalAuto(r.item, id); if (res && res.text && res.state) l += ' — ocena: ' + res.text; } if (r.note) l += ' — notatka: ' + r.note; L.push(l); }); });
    L.push('');
    const inputs = this.intakeRows(id).map((x) => '- ' + x.label + ': ' + x.value); c.items.forEach((it) => { const v = car.a && car.a[it.id] && car.a[it.id][1]; if (it.input && v != null && v !== '') inputs.push('- ' + (it.input.label || it.text) + ': ' + inputText(it, v)); });
    if (inputs.length) { L.push('POMIARY I DANE'); inputs.forEach((x) => L.push(x)); L.push(''); }
    const qs = this.reportQuestions(id, cnt, d, groups); if (qs.length) { L.push('PYTANIA PRZED DECYZJĄ'); qs.forEach((q, i) => L.push((i + 1) + '. ' + q)); L.push(''); }
    if (Array.isArray(rules.safe_deal_rules) && rules.safe_deal_rules.length) { L.push('BEZPIECZNA TRANSAKCJA'); rules.safe_deal_rules.forEach((p) => L.push('- ' + p)); L.push(''); }
    L.push((c.meta.disclaimer || '') + ' Raport wygenerowany w ' + this.appName + ' ' + fmtPl(todayStr()) + '.');
    return L.join('\n');
  };

  /* ------------------------------------------------------------------ view: compare cars (Porównaj auta) */
  App.prototype.findInputItem = function (unitRe, labelRe) { return this.content.items.find((it) => it.input && it.input.type === 'number' && unitRe.test(String(it.input.unit || '')) && labelRe.test((it.input.label || '') + ' ' + it.text)) || null; };
  App.prototype.factItems = function () {
    if (!this._facts) this._facts = { odo: this.findInputItem(/km/i, /licznik/i) || this.findInputItem(/km/i, /przebieg/i), dot: this.findInputItem(/rok/i, /DOT|opon/i), tread: this.findInputItem(/mm/i, /bieżnik|biezn/i) };
    return this._facts;
  };
  App.prototype.carFacts = function (id) {
    const c = this.content; const car = this.state.cars[id]; const cnt = this.counts(id); const d = this.decide(cnt); const f = this.factItems();
    const val = (it) => { if (!it) return null; const v = car.a && car.a[it.id] && car.a[it.id][1]; return v == null || v === '' ? null : v; };
    const rows = []; this.negoGroups(id).forEach((g) => g.rows.forEach((r) => rows.push(r)));
    return { id: id, car: car, cnt: cnt, d: d, pd: c.hasPaint ? this.paintData(id) : null, odo: val(f.odo), dot: val(f.dot), tread: val(f.tread), price: this.intakeNum(car, 'price'), year: this.intakeNum(car, 'year'), odoAd: this.intakeNum(car, 'odo_ad'), notes: rows.filter((r) => r.state === 'problem').concat(rows.filter((r) => r.state === 'uwaga')).slice(0, 2), date: this.carDate(car), rank: { ok: 0, nego: 1, todo: 2, mech: 3, walk: 4 }[d.kind] };
  };
  App.prototype.viewCompare = function () {
    const self = this; const ids = Object.keys(this.state.cars);
    const out = [this.topbar('Porównaj auta', '', false)];
    out.push(el('h1', { style: 'font-size:26px;margin-top:4px' }, 'Porównaj auta'));
    if (ids.length < 2) {
      out.push(el('div', { class: 'card locked', 'data-testid': 'compare-empty' }, mascot(), el('h2', null, 'Na razie jedno auto'), el('p', { class: 'muted' }, 'Dodaj drugie auto, a zobaczysz je obok siebie.'),
        el('div', { class: 'btnrow' }, el('button', { class: 'btn btn--primary', type: 'button', onclick: () => self.sheetCars() }, el('span', { html: ICON.plus }), 'Dodaj auto'), el('button', { class: 'btn', type: 'button', onclick: () => self.go('') }, 'Wróć na start'))));
      return out;
    }
    const facts = ids.map((id) => this.carFacts(id)); const sort = this.state.ui.cmpSort || 'best';
    const cmp = (x, y) => (x.rank - y.rank) || (x.cnt.db - y.cnt.db) || (x.cnt.problem - y.cnt.problem) || (x.cnt.uwaga - y.cnt.uwaga) || (y.cnt.answered - x.cnt.answered);
    if (sort === 'worst') facts.sort((x, y) => cmp(y, x)); else if (sort === 'added') facts.sort((x, y) => String(x.car.created || '').localeCompare(String(y.car.created || ''))); else facts.sort(cmp);
    track('compare_viewed', { cars: ids.length, sort: sort });
    out.push(el('p', { class: 'muted' }, ids.length + ' ' + plural(ids.length, 'auto', 'auta', 'aut') + ' obok siebie. Te same odpowiedzi, które odhaczasz w etapach — nic nie przepisujesz.'));
    const seg = el('div', { class: 'seg seg--wrap', role: 'group', 'aria-label': 'Kolejność' });
    [['best', 'Najlepsze najpierw'], ['worst', 'Najgorsze najpierw'], ['added', 'Kolejność dodania']].forEach((x) => seg.append(el('button', { type: 'button', class: sort === x[0] ? 'is-on' : '', 'aria-pressed': sort === x[0] ? 'true' : 'false', onclick: () => { self.state.ui.cmpSort = x[0]; self.persist(false); self.render(); } }, x[1])));
    out.push(el('div', { class: 'row', style: 'margin-bottom:12px' }, seg));
    const grid = el('div', { class: 'cmp', 'data-testid': 'compare', style: '--n:' + facts.length });
    facts.forEach((f) => grid.append(this.compareCard(f)));
    out.push(el('div', { class: 'cmp-scroll' }, grid));
    out.push(el('p', { class: 'small muted', style: 'margin-top:12px' }, (this.content.hasPaint ? 'Lakier: najwyższy odczyt / dach (baza). ' : '') + 'Data: ostatnia zmiana odpowiedzi tego auta.'));
    out.push(this.disclaimer());
    return out;
  };
  App.prototype.compareCard = function (f) {
    const self = this; const c = this.content; const cnt = f.cnt; const d = f.d; const fi = this.factItems();
    const dash = () => el('span', { class: 'muted', text: '—' });
    const row = (label, val, cls) => el('div', { class: 'cmp-row' + (cls ? ' ' + cls : '') }, el('span', { class: 'cmp-row__l', text: label }), el('span', { class: 'cmp-row__v' }, val));
    const card = el('section', { class: 'cmp-car' + (f.id === this.state.active ? ' is-active' : ''), 'aria-label': f.car.name, 'data-car': f.id });
    card.append(el('h2', { class: 'cmp-car__name' }, el('span', { html: ICON.car }), f.car.name));
    card.append(el('div', { class: 'cmp-dec cmp-dec--' + d.kind }, el('b', { text: d.title })));
    card.append(row('Dealbreakery', el('b', { class: cnt.db ? 'is-bad' : '', text: String(cnt.db) })));
    card.append(row('Problemy', el('b', { class: cnt.problem ? 'is-bad' : '', text: String(cnt.problem) })));
    card.append(row('Uwagi', el('b', { class: cnt.uwaga ? 'is-warn' : '', text: String(cnt.uwaga) })));
    if (cnt.call) card.append(row('Rozmowa', cnt.call.answered ? el('span', { 'data-testid': 'cmp-call', class: cnt.call.problem ? 'is-bad' : (cnt.call.uwaga ? 'is-warn' : '') }, cnt.call.uwaga + ' ' + plural(cnt.call.uwaga, 'uwaga', 'uwagi', 'uwag') + ', ' + cnt.call.problem + ' ' + plural(cnt.call.problem, 'problem', 'problemy', 'problemów')) : dash()));
    card.append(row('Postęp', el('span', null, el('b', { text: cnt.answered + '/' + cnt.total }), el('span', { class: 'progress', style: 'display:block;margin-top:6px' }, el('i', { style: 'width:' + Math.round(100 * cnt.answered / Math.max(1, cnt.total)) + '%' })))));
    if (c.hasPaint) { const pd = f.pd; card.append(row('Lakier: max / dach', pd && pd.count && pd.max ? el('span', { class: 'chip chip--lv lv-' + pd.max.level, 'data-testid': 'cmp-paint' }, el('i', { class: 'dot' }), fmtNum(pd.max.value) + ' / ' + (pd.readings.roof ? fmtNum(pd.readings.roof) : '–') + ' µm') : dash())); }
    if (c.intake) { card.append(row('Cena (ogłoszenie)', f.price != null ? this.intakeText(f.car, 'price') : dash())); card.append(row('Rocznik', f.year != null ? String(f.year) : dash())); }
    if (fi.odo) card.append(row('Przebieg (licznik)', f.odo != null ? fmtInput(fi.odo, f.odo) : (f.odoAd != null ? el('span', { class: 'muted' }, fmtKm(f.odoAd) + ' (ogł.)') : dash())));
    if (fi.dot) card.append(row('Najstarsza opona (DOT)', f.dot != null ? String(f.dot) : dash()));
    if (fi.tread) card.append(row('Bieżnik', f.tread != null ? fmtInput(fi.tread, f.tread) : dash()));
    card.append(row('Najważniejsze', f.notes.length ? el('ul', { class: 'cmp-notes' }, f.notes.map((r) => el('li', { class: 's-' + r.state }, (r.state === 'problem' && r.item.flag_label ? r.item.flag_label : r.item.text) + (r.note ? ' — ' + r.note : '')))) : el('span', { class: 'muted', text: cnt.answered ? 'bez uwag' : 'jeszcze nic' }), 'cmp-row--wide'));
    card.append(row('Oględziny', fmtPl(f.date) || '—'));
    card.append(el('div', { class: 'cmp-actions' },
      el('button', { class: 'btn btn--small btn--primary', type: 'button', onclick: () => self.go('raport/' + encodeURIComponent(f.id)) }, el('span', { html: ICON.doc }), 'Otwórz raport'),
      f.id !== this.state.active ? el('button', { class: 'btn btn--small', type: 'button', onclick: () => { self.state.active = f.id; self.persist(); self.toast('Aktywne auto: ' + f.car.name); self.render(); } }, 'Ustaw jako aktywne') : el('span', { class: 'chip' }, el('span', { html: ICON.check }), 'aktywne')));
    card.style.setProperty('--rows', String(card.childNodes.length));
    return card;
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
  /** Navigate to the screen that holds an item (wizard step for phase-1 and call items, else its phase) and scroll to it. */
  App.prototype.openItem = function (itemId) {
    const c = this.content; const it = c.itemById[itemId]; const ph = c.phaseOfItem[itemId]; const w = c.wizard;
    let path = null;
    if (w && it && (it.call || ph === w.phase)) { const st = w.stepOfItem[itemId] || w.callStep; path = 'start/' + (st ? st.n : 1); }
    else if (ph) path = 'phase/' + encodeURIComponent(ph.id);
    if (!path) return;
    this.openItems[itemId] = true; this.go(path);
    setTimeout(() => { const n = this.itemEl(itemId); if (n) n.scrollIntoView({ block: 'center' }); }, 60);
  };
  /** „ · VIN … · sprzedawca: …” for report headers. */
  App.prototype.carMetaText = function (carId) {
    const car = this.state.cars[carId]; if (!car) return '';
    const w = this.content.wizard; const types = w && Array.isArray(w.script.seller_types) ? w.script.seller_types : [];
    const t = car.st ? types.find((x) => x && x.id === car.st) : null;
    const y = this.intakeNum(car, 'year'); const pr = this.intakeNum(car, 'price');
    return (y != null ? ' · rocznik ' + y : '') + (pr != null ? ' · ' + this.intakeText(car, 'price') : '') + (car.vin ? ' · VIN ' + car.vin : '') + (t ? ' · sprzedawca: ' + String(t.label || t.id).toLowerCase() : '');
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
        el('button', { class: 'btn btn--danger', type: 'button', onclick: () => self.sheetConfirm('Wyzerować „' + car.name + '”?', 'Usuniesz odpowiedzi, pomiary, notatki i zdjęcia tego auta. Inne auta zostają.', 'Wyzeruj', async () => { car.a = {}; car.q = {}; delete car.pd; delete car.qf; delete car.st; delete car.vin; delete car.cd; car.u = nowIso(); await Photos.delPrefix(self.opts.product + '|' + self.state.active + '|'); self.persist(); self.toast('Wyzerowano'); self.render(); }) }, el('span', { html: ICON.trash }), 'Wyzeruj to auto')),
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
          el('button', { class: 'btn btn--primary', type: 'button', onclick: () => { close(); self.openItems[it.id] = true; if (!row) return; row.classList.add('is-open'); const h = $('.item__head', row); if (h) h.setAttribute('aria-expanded', 'true'); self.loadPhotos(it, row); row.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }, 'Pokaż dlaczego'),
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
            el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Zobacz raport: ' + car.name, title: 'Raport', onclick: () => { close(); self.go('raport/' + encodeURIComponent(id)); } }, el('span', { html: ICON.doc })),
            el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Zmień nazwę', onclick: () => { close(); self.sheetRename(car, () => self.sheetCars()); } }, el('span', { html: ICON.edit })),
            el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Usuń auto', onclick: () => { close(); self.sheetConfirm('Usunąć „' + car.name + '”?', 'Znikną odpowiedzi, notatki i zdjęcia tego auta.', 'Usuń', async () => { await Photos.delPrefix(self.opts.product + '|' + id + '|'); delete self.state.cars[id]; if (self.state.active === id) self.state.active = null; self.ensureCar(); self.persist(); self.toast('Usunięto'); self.render(); }); } }, el('span', { html: ICON.trash }))));
        });
        sh.append(ul);
        sh.append(el('div', { class: 'btnrow' }, el('button', { class: 'btn btn--primary', type: 'button', onclick: () => { const id = uid(); const n = Object.keys(self.state.cars).length + 1; self.state.cars[id] = { name: 'Auto ' + n, created: nowIso(), a: {} }; self.state.active = id; self.persist(); close(); self.sheetRename(self.state.cars[id]); } }, el('span', { html: ICON.plus }), 'Dodaj auto'), Object.keys(self.state.cars).length >= 2 ? el('button', { class: 'btn', type: 'button', 'data-testid': 'compare-btn', onclick: () => { close(); self.go('porownaj'); } }, 'Porównaj') : null, el('button', { class: 'btn', type: 'button', onclick: close }, 'Zamknij')));
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
    const phs = this.content.phases; const upsell = this.opts.kind === 'upsell'; const adapted = this.content.items.some((it) => it.ctrl && !it.ctrl.generic);
    const path = phs.length > 1 ? 'od „' + phs[0].title + '” po „' + phs[phs.length - 1].title + '”' : '';
    const screens = [
      { title: 'Jak to działa', text: phs.length + ' ' + plural(phs.length, 'etap', 'etapy', 'etapów') + ' po kolei' + (path ? ', ' + path : '') + '. Każdy punkt mówi, co sprawdzić i jak' + (upsell ? ' – bez prawnika.' : ' – bez bycia mechanikiem.'), demo: 'phases' },
      adapted
        ? { title: 'Odpowiadasz jednym tapnięciem', text: 'Przy każdym punkcie odpowiedzi pasują do pytania: „zgadza się / różni się”, „sucho / kapie”, „jest / nie ma”. Tam, gdzie wpisujesz liczbę – lakier, licznik, bieżnik – ocenę robi system. Dealbreakery są oznaczone: gdy trafisz, powiemy, że to zwykle koniec oglądania.', demo: 'answers' }
        : { title: 'Odpowiadasz jednym tapnięciem', text: 'OK, Uwaga, Problem albo Pomiń. Dealbreakery są oznaczone – gdy trafisz, powiemy, że to zwykle koniec' + (upsell ? ' rozmowy o zakupie.' : ' oglądania.'), demo: 'answers' },
      upsell && this.content.deadlineRows.length
        ? { title: 'Terminy liczą się same', text: 'Wpisujesz datę z umowy, dostajesz daty PCC-3, rejestracji i końca OC – z plikiem do kalendarza. Na końcu lista braków do skopiowania lub PDF.', demo: 'flags' }
        : { title: 'Na końcu dostajesz raport', text: 'Licznik czerwonych flag cały czas na dole. Na końcu: decyzja z uzasadnieniem, mapa lakieru i raport z oględzin – do PDF, do skopiowania, do porównania z kolejnym autem.', demo: 'flags' },
    ];
    const ov = el('div', { class: 'onb', role: 'dialog', 'aria-modal': 'true' });
    // Returning user on a new device (progress pulled from the server): land on Home. New user: the wizard (or the quick start without one).
    const finish = () => { self.state.ui.onb = 1; self.persist(false); ov.remove(); self.go(self.counts().answered > 0 ? '' : (self.content.wizard ? 'start' : 'quick')); };
    const render = () => {
      const s = screens[step]; ov.innerHTML = '';
      ov.append(el('button', { class: 'onb__skip', type: 'button', onclick: finish }, 'Pomiń'));
      let demo = null;
      if (s.demo === 'answers') { demo = el('div', { class: 'onb__demo' + (adapted ? ' onb__demo--3' : '') }); (adapted ? [['ok', 'Zgadza się'], ['uwaga', 'Nie znalazłem'], ['problem', 'Różni się']] : [['ok', 'OK'], ['uwaga', 'Uwaga'], ['problem', 'Problem'], ['pomin', 'Pomiń']]).forEach((x) => { const b = el('button', { class: 'ans ans--' + x[0] + (x[0] === 'ok' ? ' is-on' : ''), type: 'button', text: x[1] }); b.addEventListener('click', () => { demo.querySelectorAll('.ans').forEach((y) => y.classList.remove('is-on')); b.classList.add('is-on'); }); demo.append(b); }); }
      if (s.demo === 'flags') demo = el('div', { class: 'mockflag' }, el('b', null, '3'), el('span', null, 'czerwone flagi · 1 dealbreaker'));
      ov.append(el('div', { class: 'onb__body' }, mascot(), el('h2', { text: s.title }), el('p', null, s.text), demo));
      ov.append(el('div', { class: 'onb__dots' }, screens.map((x, i) => el('i', { class: i === step ? 'is-on' : '' }))));
      ov.append(el('button', { class: 'btn btn--lime', type: 'button', onclick: () => { if (step < screens.length - 1) { step++; render(); } else finish(); } }, step < screens.length - 1 ? 'Dalej' : 'Zaczynam'));
    };
    render(); document.body.append(ov);
  };
})();
