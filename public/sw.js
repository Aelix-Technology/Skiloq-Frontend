// public/sw.js
const CACHE_NAME = "skiloq-v1";

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/worker/dashboard",
  "/worker/opportunities",
  "/worker/wallet",
  "/worker/profile",
  "/offline",
];

// Install — cache essential pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache, fallback to offline page
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and API calls
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        // Offline — try cache first
        return caches.match(event.request).then((cached) => {
          return cached || caches.match("/offline");
        });
      })
  );
});