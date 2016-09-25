var CACHE_NAME = 'mimi-v1';
var urlsToCache = [
  '/offline.html'
];

var onInstall = function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
};

var onFetch = function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('/offline.html');
      });
    })
  );
};

self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);
