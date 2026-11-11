/* WohnPlan 1.5.1 – offline support and automatic app updates */
const VERSION = 'wohnplan-v1.5.1';
const ASSETS = [
 './', './index.html', './localization.js', './upgrade-1.2.js', './upgrade-1.2.css', './upgrade-1.3.js', './upgrade-1.3.css', './upgrade-1.4.js', './upgrade-1.4.css', './upgrade-1.4.1.js', './catalog-1.5.js', './drawings-1.5.js', './materials-1.5.1.js', './materials-1.5.1.css',
 './manifest.webmanifest', './apple-touch-icon.png', './favicon.png',
 './icon-192.png', './icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('wohnplan-') && key !== VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(VERSION).then(cache => cache.put(request,copy)).catch(() => {});
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') return caches.match('./index.html');
      return Response.error();
    })
  );
});
