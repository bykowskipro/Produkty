/* Service worker for /dodatek/ (Odhacz Auto: Po zakupie). Scope: /dodatek/. */
importScripts('/assets/checklist/sw-core.js');
OdhaczSW.init({
  name: 'odhacz-dodatek',
  version: 'v3',
  precache: ['/dodatek/', '/dodatek/content/po-zakupie.json', '/dodatek/manifest.webmanifest', '/assets/checklist/engine.css', '/assets/checklist/engine.js', '/assets/access.js', '/assets/analytics.js', '/assets/brand/icon-192.png', '/assets/brand/icon-512.png', '/assets/brand/hacz.svg'],
  cacheFirst: ['/dodatek/', '/assets/'],
});
