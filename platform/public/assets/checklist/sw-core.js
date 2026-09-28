/* Odhacz – shared service-worker logic. A scope's sw.js does:
 *   importScripts('/assets/checklist/sw-core.js');
 *   OdhaczSW.init({ name: 'odhacz-app', version: 'v1', precache: ['/app/', ...], cacheFirst: ['/app/', '/assets/'] });
 * Strategy: cache-first (with background revalidate) for same-origin GET under `cacheFirst` prefixes,
 * network-first for /api/, everything else passes through. Redirects (e.g. -> /?locked=1) and non-200 responses are never cached.
 */
self.OdhaczSW = {
  init(cfg) {
    const CACHE = cfg.name + '-' + cfg.version;
    const PRECACHE = cfg.precache || [];
    const PREFIXES = cfg.cacheFirst || [];
    const cacheable = (res) => res && res.ok && res.status === 200 && !res.redirected && (res.type === 'basic' || res.type === 'default');

    self.addEventListener('install', (event) => {
      event.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        await Promise.all(PRECACHE.map(async (url) => {
          try { const res = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' }); if (cacheable(res)) await cache.put(url, res); } catch (e) { /* offline during install: skip */ }
        }));
        await self.skipWaiting();
      })());
    });

    self.addEventListener('activate', (event) => {
      event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter((k) => k.startsWith(cfg.name + '-') && k !== CACHE).map((k) => caches.delete(k)));
        await self.clients.claim();
      })());
    });

    self.addEventListener('message', (event) => { if (event.data === 'skipWaiting') self.skipWaiting(); });

    self.addEventListener('fetch', (event) => {
      const req = event.request;
      if (req.method !== 'GET') return;
      let url; try { url = new URL(req.url); } catch (e) { return; }
      if (url.origin !== self.location.origin) return;
      const path = url.pathname;

      if (path.startsWith('/api/')) { event.respondWith(networkFirst(req)); return; }
      if (PREFIXES.some((p) => path.startsWith(p))) { event.respondWith(cacheFirst(req)); }
    });

    async function networkFirst(req) {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (cacheable(res)) cache.put(req, res.clone()).catch(() => {});
        return res;
      } catch (e) {
        const hit = await cache.match(req);
        return hit || new Response(JSON.stringify({ error: 'offline' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }
    }

    async function cacheFirst(req) {
      const cache = await caches.open(CACHE);
      const key = req.mode === 'navigate' ? new URL(req.url).pathname : req; // navigations: ignore query (?t=) for the cache key
      const hit = await cache.match(key);
      const network = fetch(req).then((res) => { if (cacheable(res)) cache.put(key, res.clone()).catch(() => {}); return res; });
      if (hit) { network.catch(() => {}); return hit; }
      try { return await network; }
      catch (e) {
        if (req.mode === 'navigate') { const shell = await cache.match(PRECACHE[0]); if (shell) return shell; }
        return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    }
  },
};
