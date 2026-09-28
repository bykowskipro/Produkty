/* Product-app helper (include in every page under a protected access_path).
 * window.Access.token()          -> access token (from ?t= on first visit, then localStorage) or null
 * window.Access.saveProgress(o)  -> PUT /api/progress (max 32 KB), resolves {ok, updated_at}
 * window.Access.loadProgress()   -> GET /api/progress, resolves the saved object or null
 * window.Access.verify()         -> GET /api/access/verify, resolves {ok, product_id, products_owned}
 * The httpOnly cookie set by /d/<token> keeps the access working even if localStorage is cleared.
 */
(function () {
  var KEY = 'access_token';
  var token = null;
  try {
    var q = new URLSearchParams(location.search);
    var t = q.get('t');
    if (t) {
      token = t;
      try { localStorage.setItem(KEY, t); } catch (e) {}
      q.delete('t');
      try { history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q.toString() : '') + location.hash); } catch (e) {}
    } else {
      try { token = localStorage.getItem(KEY); } catch (e) {}
    }
  } catch (e) {}

  function headers() { var h = { 'Content-Type': 'application/json' }; if (token) h['X-Access-Token'] = token; return h; }
  function handleAuth(r) {
    if (r.status === 401) { location.assign('/?locked=1'); throw new Error('unauthorized'); }
    return r;
  }

  window.Access = {
    token: function () { return token; },
    saveProgress: function (obj) {
      return fetch('/api/progress', { method: 'PUT', headers: headers(), credentials: 'same-origin', body: JSON.stringify({ progress: obj }) })
        .then(handleAuth).then(function (r) { return r.json(); });
    },
    loadProgress: function () {
      return fetch('/api/progress', { headers: headers(), credentials: 'same-origin' })
        .then(handleAuth).then(function (r) { return r.json(); }).then(function (j) { return j.progress; });
    },
    verify: function () {
      return fetch('/api/access/verify', { headers: headers(), credentials: 'same-origin' }).then(function (r) { return r.json(); });
    }
  };
})();
