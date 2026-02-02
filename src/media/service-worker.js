const CACHE_NAME = 'v1';

// 1. INSTALL: Cache the root document immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Assuming '/' is your main entry point. 
      // If your app is at '/app/', change this string.
      return cache.add('/');
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Enable Navigation Preload
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Check if navigationPreload is supported
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      // Delete old caches if needed here
      await self.clients.claim();
    })()
  );
});

// 3. FETCH: The Strategy
self.addEventListener('fetch', (event) => {
  // We only care about Navigation requests (HTML documents)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // A. Try Navigation Preload first (Fastest & Fresh)
          // This promise resolves if the browser already started fetching
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            // It's fresh, so we update the cache and return it
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, preloadResponse.clone());
            return preloadResponse;
          }

          // B. Try the Cache (Fast but potentially stale)
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(event.request);

          // Prepare the network fetch to update the cache in the background
          const networkFetch = fetch(event.request).then((networkRes) => {
            const clone = networkRes.clone();
            cache.put(event.request, clone);
            return networkRes;
          });

          if (cachedResponse) {
            // If we have a cache, return it immediately.
            // We attach a catch() here so the background failure doesn't log a scary red error.
            event.waitUntil(
              networkFetch.catch(() => console.log('Background update failed (offline)')) 
            );
            return cachedResponse;
          }

          // C. Network Fallback (Slowest)
          // If no preload and no cache, wait for the network
          return await networkFetch;
          
        } catch (error) {
          console.error('Fetch failed:', error);
          // Optional: Return an offline.html here
        }
      })()
    );
  }
});