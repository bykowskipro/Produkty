/* Cookie consent banner (Polish) + Meta Pixel loader.
 * Decision: the Meta Pixel (third-party) loads ONLY after "Akceptuję". First-party anonymous analytics
 * (/api/events, random visitor_id, hashed IP, no cross-site tracking) is always on – see README.
 * API: window.Consent.granted() -> true|false|null (null = no decision yet), Consent.onChange(fn), Consent.reset()
 */
(function () {
  var KEY = 'consent_v1';
  var listeners = [];
  var pixelLoaded = false;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.__siteConfig = window.__siteConfig || fetch('/api/config').then(function (r) { return r.json(); }).catch(function () { return {}; });

  function loadPixel() {
    if (pixelLoaded) return;
    window.__siteConfig.then(function (cfg) {
      if (!cfg.meta_pixel_id || pixelLoaded) return;
      pixelLoaded = true;
      /* Official Meta Pixel snippet */
      !(function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', cfg.meta_pixel_id);
      window.fbq('track', 'PageView');
    });
  }

  function decide(v) {
    write(v);
    hide();
    if (v === 'granted') loadPixel();
    listeners.forEach(function (fn) { try { fn(v === 'granted'); } catch (e) {} });
    try { window.dispatchEvent(new CustomEvent('consentchange', { detail: { granted: v === 'granted' } })); } catch (e) {}
  }

  var el;
  function hide() { if (el && el.parentNode) el.parentNode.removeChild(el); el = null; }
  function show() {
    if (el) return;
    el = document.createElement('div');
    el.id = 'consent-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Zgoda na pliki cookie');
    el.innerHTML =
      '<style>#consent-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#111;color:#fff;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 -4px 20px rgba(0,0,0,.25)}' +
      '#consent-banner .cb-in{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}#consent-banner p{margin:0;flex:1 1 320px}' +
      '#consent-banner a{color:#9cf}#consent-banner button{font:inherit;font-weight:600;padding:9px 16px;border-radius:8px;border:1px solid #fff;cursor:pointer;background:transparent;color:#fff}#consent-banner button.ok{background:#fff;color:#111}</style>' +
      '<div class="cb-in"><p>Używamy plików cookie do pomiaru skuteczności reklam (Meta Pixel). Możesz odmówić – strona i zakupy działają bez tego. <a href="/legal/polityka-prywatnosci.html">Polityka prywatności</a></p>' +
      '<span><button type="button" class="ok" data-consent="granted">Akceptuję</button> <button type="button" data-consent="denied">Odrzucam</button></span></div>';
    el.addEventListener('click', function (e) { var b = e.target.closest('[data-consent]'); if (b) decide(b.getAttribute('data-consent')); });
    document.body.appendChild(el);
  }

  window.Consent = {
    granted: function () { var v = read(); return v === 'granted' ? true : v === 'denied' ? false : null; },
    onChange: function (fn) { listeners.push(fn); },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} show(); },
    show: show
  };

  function init() {
    var v = read();
    if (v === 'granted') loadPixel();
    else if (v !== 'denied') show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
