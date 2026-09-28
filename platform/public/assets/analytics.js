/* First-party analytics helper.
 * - persistent visitor_id (localStorage, cookie fallback)
 * - first-touch UTM persistence (localStorage "utm_first")
 * - window.track(event, props) -> POST /api/events (keepalive)
 * - auto page_view
 * - window.Analytics = { visitorId, utm, track, fbCookies, eventId }
 */
(function () {
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'v-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, value, days) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; Max-Age=' + days * 86400 + '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
  }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var vid = load('visitor_id') || getCookie('vid');
  if (!vid) vid = uuid();
  store('visitor_id', vid);
  setCookie('vid', vid, 365);

  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var params = new URLSearchParams(location.search);
  var utm = null;
  try { utm = JSON.parse(load('utm_first') || 'null'); } catch (e) {}
  if (!utm) {
    var found = {};
    var any = false;
    UTM_KEYS.forEach(function (k) { var v = params.get(k); if (v) { found[k] = v.slice(0, 200); any = true; } });
    if (any) { found.landing_url = location.href.slice(0, 2048); found.ts = new Date().toISOString(); utm = found; store('utm_first', JSON.stringify(utm)); }
    else utm = {};
  }
  // Meta click id -> _fbc cookie (Meta's recommended format) when the pixel is not (yet) allowed to set it.
  var fbclid = params.get('fbclid');
  if (fbclid && !getCookie('_fbc')) setCookie('_fbc', 'fb.1.' + Date.now() + '.' + fbclid, 90);

  function track(event, props) {
    var body = { visitor_id: vid, event: event, props: props || {}, url: location.href.slice(0, 2048), referrer: document.referrer.slice(0, 2048) };
    UTM_KEYS.forEach(function (k) { if (utm[k]) body[k] = utm[k]; });
    try {
      return fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true, credentials: 'same-origin' }).catch(function () {});
    } catch (e) { return Promise.resolve(); }
  }

  window.Analytics = {
    visitorId: function () { return vid; },
    utm: function () { return utm; },
    track: track,
    eventId: uuid,
    fbCookies: function () { return { fbp: getCookie('_fbp') || '', fbc: getCookie('_fbc') || '' }; }
  };
  window.track = track;

  track('page_view', { path: location.pathname, title: document.title.slice(0, 200) });
})();
