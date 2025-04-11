const CACHE_NAME = 'wine-calculators-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/so2-calculator.html',
    '/style.css',
    '/topping-calculator.js',
    '/so2-calculator.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
