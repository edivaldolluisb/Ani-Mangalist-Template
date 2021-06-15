//Registrar
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  };

//Install
self.addEventListener('install', (e) => {
console.log('[Service Worker] Install');
});

//storing the cache

const cacheName = 'Ani-Manga.list-v1';
const appShellFiles = [
    './',
    './icones',
    './imagens',
    './manifest.json',
    './index.html',
    './manga.html',
    './detalhe.html',
    './detalhe.css',
    './anime.css',
];

// the install
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
    })());
  });

// fetch
self.addEventListener('fetch', (e) => {
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
  });

self.addEventListener('fetch', (e) => {
e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
})());
});


