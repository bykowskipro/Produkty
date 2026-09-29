/* Service worker for /app/ (Odhacz Auto). Scope: /app/. Bump `version` when engine or content changes. */
importScripts('/assets/checklist/sw-core.js');
OdhaczSW.init({
  name: 'odhacz-app',
  version: 'v4',
  precache: ['/app/', '/app/content/auto.json', '/app/manifest.webmanifest', '/assets/checklist/engine.css', '/assets/checklist/engine.js', '/assets/access.js', '/assets/analytics.js', '/assets/brand/icon-192.png', '/assets/brand/icon-512.png', '/assets/brand/hacz.svg', '/assets/brand/hacz-latarka.svg'],
  cacheFirst: ['/app/', '/assets/'],
});
