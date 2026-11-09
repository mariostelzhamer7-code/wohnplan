const CACHE = 'wohnplan-v1.0.0';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './favicon.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', evt => evt.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', evt => evt.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', evt => {
 if(evt.request.method !== 'GET' || new URL(evt.request.url).origin !== self.location.origin) return;
 evt.respondWith(caches.match(evt.request).then(cached => cached || fetch(evt.request)));
});
