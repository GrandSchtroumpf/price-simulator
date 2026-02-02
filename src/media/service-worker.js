const CACHE_NAME = 'v1';

self.addEventListener('install', (event) => {
  // Cache the root page immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add('/'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // 1. Try to find the page in the cache first
          const cachedResponse = await caches.match(event.request);

          // 2. Define the network logic (Preload OR Fetch)
          // We wrap this in a function so we can call it later safely
          const getNetworkResponse = async () => {
            // A. Use Preload if available
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            }
            // B. Otherwise, fetch from network
            return fetch(event.request);
          };

          // 3. CASE A: We have the document in cache (Offline or Fast Load)
          if (cachedResponse) {
            // Return the cached page IMMEDIATELY
            
            // KICK OFF BACKGROUND UPDATE:
            // We use event.waitUntil to keep the SW alive, but we attach a .catch()
            // so if it fails (offline), it doesn't break the page load.
            event.waitUntil(
              (async () => {
                try {
                  const networkResponse = await getNetworkResponse();
                  // Only update cache if we got a valid 200 response
                  if (networkResponse && networkResponse.status === 200) {
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(event.request, networkResponse.clone());
                  }
                } catch {
                   // Squelch the error here. We are offline, but the user 
                   // got the cached page, so this error doesn't matter.
                   console.log('Background update failed (offline mode)');
                }
              })()
            );

            return cachedResponse;
          }

          // 4. CASE B: No cache found (First visit) -> Go to network
          const networkResponse = await getNetworkResponse();
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;

        } catch (error) {
          console.error('Fetch failed completely:', error);
          // Optional: Return a dedicated offline.html fallback here if you have one
        }
      })()
    );
  }
});