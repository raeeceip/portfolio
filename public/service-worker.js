// Chiso's Cookbook Service Worker
// Enables offline functionality and performance optimizations

const CACHE_NAME = 'chisos-cookbook-v1';
const OFFLINE_URL = '/404.html'; // Use 404 page as offline fallback

// Assets to cache on install - only include files that actually exist
const PRECACHE_ASSETS = [
  '/',
  '/404.html',
  '/favicon.ico',
  '/images/paper-texture.png'
];

// Install event - precache critical assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        
        // Cache fallback page first
        await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
        
        // Cache critical assets - use waitUntil instead of awaiting to prevent failures
        // from blocking installation
        await cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
        
        // Force activation without waiting for existing clients to close
        await self.skipWaiting();
        
        console.log('Service Worker installed - Cookbook assets cached');
      } catch (error) {
        console.error('Service worker installation failed:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      // Get all existing cache names
      const cacheKeys = await caches.keys();
      
      // Delete old caches
      await Promise.all(
        cacheKeys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log(`Deleting old cache: ${key}`);
            return caches.delete(key);
          })
      );
      
      // Take control of uncontrolled clients
      await self.clients.claim();
      
      console.log('Service Worker activated - Ready to serve cached content');
    })()
  );
});

// Fetch event - handle all requests
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Network-first strategy for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network first
          const networkResponse = await fetch(event.request);
          
          // Cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
          
          return networkResponse;
        } catch (error) {
          // Network failed, try cache
          const cachedResponse = await caches.match(event.request);
          
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If cache fails too, show offline page
          return caches.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }
  
  // Cache-first strategy for assets (images, fonts, etc.)
  if (
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf)$/) ||
    url.pathname.startsWith('/_astro/')
  ) {
    event.respondWith(
      (async () => {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Fall back to network
        try {
          const networkResponse = await fetch(event.request);
          
          // Cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
          
          return networkResponse;
        } catch (error) {
          // Return fallback for images if available
          if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
            return caches.match('/images/fallback-image.png');
          }
          
          // For other assets, return a basic error
          return new Response('Resource not available offline', { 
            status: 404, 
            headers: { 'Content-Type': 'text/plain' } 
          });
        }
      })()
    );
    return;
  }
  
  // Default strategy: stale-while-revalidate for everything else
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Try cache first
      const cachedResponse = await cache.match(event.request);
      
      // Clone request for fetching
      const fetchRequest = event.request.clone();
      
      // Start fetching in background regardless of cache hit
      const fetchResponsePromise = fetch(fetchRequest)
        .then(networkResponse => {
          // Don't cache non-successful responses
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          // Cache the new response for next time
          cache.put(event.request, networkResponse.clone());
          
          return networkResponse;
        })
        .catch(error => {
          console.error('Fetch failed:', error);
          // Return null to indicate network failure
          return null;
        });
      
      // Return cached response immediately if available, otherwise wait for network
      return cachedResponse || fetchResponsePromise;
    })()
  );
});
