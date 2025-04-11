const CACHE_NAME = 'wine-calculators-v1';
const ASSETS = [

    '/',
    '/index.html',
    '/so2-calculator.html',
    '/style.css',
    '/topping-calculator.js',
    '/so2-calculator.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
