/* Shop helper: window.Shop.buy(product_id, {button}) starts the checkout.
 * Also: any element with data-buy="<product_id>" becomes a buy button, and ?canceled=1 / ?locked=1 show toasts.
 */
(function () {
  var products = {};
  window.__siteConfig = window.__siteConfig || fetch('/api/config').then(function (r) { return r.json(); }).catch(function () { return {}; });
  window.__siteConfig.then(function (cfg) {
    (cfg.products || []).forEach(function (p) { products[p.id] = p; });
    // Fill price placeholders: <span data-price="main"></span>
    document.querySelectorAll('[data-price]').forEach(function (el) {
      var p = products[el.getAttribute('data-price')];
      if (p) el.textContent = (p.price_pln / 100).toFixed(2).replace('.', ',') + ' zł';
    });
  });

  function toast(msg, isError) {
    var t = document.createElement('div');
    t.className = 'shop-toast' + (isError ? ' error' : '');
    t.setAttribute('role', 'status');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);max-width:92vw;z-index:9998;background:' + (isError ? '#b91c1c' : '#111') + ';color:#fff;padding:12px 18px;border-radius:10px;font:14px/1.4 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.3)';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 6000);
  }

  var busy = false;
  function buy(productId, opts) {
    opts = opts || {};
    if (busy) return Promise.resolve();
    busy = true;
    var btn = opts.button || (document.activeElement && document.activeElement.tagName === 'BUTTON' ? document.activeElement : null);
    var oldText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Chwileczkę…'; }

    var p = products[productId] || {};
    var eventId = window.Analytics ? window.Analytics.eventId() : String(Date.now());
    var value = p.price_pln ? p.price_pln / 100 : undefined;
    if (window.track) {
      window.track('cta_click', { product_id: productId, label: opts.label || oldText.slice(0, 80) });
      window.track('checkout_start', { product_id: productId, event_id: eventId, value: value, currency: 'PLN' });
    }
    if (window.Consent && window.Consent.granted() && typeof window.fbq === 'function') {
      try { window.fbq('track', 'InitiateCheckout', { value: value, currency: 'PLN', content_ids: [productId], content_type: 'product' }, { eventID: eventId }); } catch (e) {}
    }
    var fb = window.Analytics ? window.Analytics.fbCookies() : { fbp: '', fbc: '' };
    var utm = window.Analytics ? window.Analytics.utm() : {};
    var body = {
      product_id: productId,
      visitor_id: window.Analytics ? window.Analytics.visitorId() : '',
      event_id: eventId,
      fbp: fb.fbp, fbc: fb.fbc,
      utm_source: utm.utm_source || '', utm_medium: utm.utm_medium || '', utm_campaign: utm.utm_campaign || '', utm_content: utm.utm_content || '', utm_term: utm.utm_term || '',
      landing_url: utm.landing_url || location.href
    };
    return fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.url) throw new Error(j.error || 'checkout_failed'); return j; }); })
      .then(function (j) { location.assign(j.url); })
      .catch(function (err) {
        busy = false;
        if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = oldText; }
        toast('Nie udało się rozpocząć płatności. Spróbuj ponownie za chwilę.', true);
        if (window.track) window.track('checkout_error', { product_id: productId, message: String(err && err.message).slice(0, 200) });
      });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-buy]');
    if (!el) return;
    e.preventDefault();
    buy(el.getAttribute('data-buy'), { button: el.tagName === 'BUTTON' ? el : null, label: el.textContent.trim().slice(0, 80) });
  });

  function init() {
    var q = new URLSearchParams(location.search);
    if (q.get('canceled') === '1') { toast('Płatność została anulowana. Możesz spróbować ponownie.'); if (window.track) window.track('checkout_canceled'); }
    if (q.get('locked') === '1') toast('Ten obszar jest dostępny po zakupie. Jeśli już kupiłeś/aś, otwórz link z e-maila.', true);
    if (q.has('canceled') || q.has('locked')) { try { history.replaceState(null, '', location.pathname); } catch (err) {} }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.Shop = { buy: buy, toast: toast, products: function () { return products; } };
})();
