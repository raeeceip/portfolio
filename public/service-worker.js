// Chiso's Cookbook Service Worker
// Enables offline functionality and performance optimizations

const CACHE_NAME = 'chisos-cookbook-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install - critical resources for the cookbook experience
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/styles/global.css',
  '/styles/notebook.css',
  '/styles/contrast.css',
  '/scripts/notebook.js',
  '/scripts/customTransitions.js',
  '/scripts/draggable.js',
  '/favicon.ico',
  // Cache key images
  '/images/paper-texture.png',
  // Add any other critical assets here
];

// Install event - precache critical assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Cache offline page first
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      
      // Cache all critical assets
      await cache.addAll(PRECACHE_ASSETS);
      
      // Force activation without waiting for existing clients to close
      await self.skipWaiting();
      
      console.log('Service Worker installed - Cookbook assets cached');
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
      
      // Delete any old caches
      await Promise.all(
        cacheKeys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log(`Deleting old cache: ${key}`);
            return caches.delete(key);
          })
      );
      
      // Take control of all clients immediately
      await clients.claim();
      
      console.log('Service Worker activated - Ready to serve cookbook content');
    })()
  );
});

// Fetch event - handle network requests with appropriate strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Don't cache admin routes or API calls
  if (url.pathname.startsWith('/admin') || url.pathname.includes('/api/')) {
    return;
  }
  
  // Special handling for navigation (HTML) requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network first for HTML pages (content may change frequently)
          console.log(`Fetching page: ${url.pathname}`);
          const networkResponse = await fetch(event.request);
          
          // Cache the new response for future use
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, networkResponse.clone());
          
          return networkResponse;
        } catch (error) {
          console.log(`Failed to fetch page: ${url.pathname}`, error);
          
          // If network fails, try to return the cached page
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If there's no cached page, return the offline page
          console.log('Serving offline page');
          return caches.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }
  
  // Cache-first strategy for static assets (images, CSS, JS)
  if (
    url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/) ||
    url.pathname.includes('/images/') ||
    url.pathname.includes('/styles/') ||
    url.pathname.includes('/scripts/') ||
    url.pathname.includes('/fonts/')
  ) {
    event.respondWith(
      (async () => {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // If not in cache, fetch from network and cache for later
        try {
          const networkResponse = await fetch(event.request);
          
          // Only cache valid responses
          if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(event.request, networkResponse.clone());
          }
          
          return networkResponse;
        } catch (error) {
          console.log(`Failed to fetch resource: ${url.pathname}`, error);
          // If fetch fails and there's no cache, just return the error
          return new Response('Network error occurred', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      })()
    );
    return;
  }
  
  // For all other requests, use a stale-while-revalidate strategy
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Try to get from cache first
      const cachedResponse = await cache.match(event.request);
      
      // Fetch from network
      const networkResponsePromise = fetch(event.request).then(
        networkResponse => {
          // Cache the new response for future
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }
      );
      
      // Return cached response immediately if available, otherwise wait for network
      return cachedResponse || networkResponsePromise;
    })()
  );
});

// Handle background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-submission') {
    event.waitUntil(syncContactForm());
  }
});

// Implementation of background sync for contact form
async function syncContactForm() {
  const pendingSubmissions = await getPendingContactSubmissions();
  
  for (const submission of pendingSubmissions) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission)
      });
      
      if (response.ok) {
        await removePendingContactSubmission(submission.id);
      }
    } catch (error) {
      console.error('Failed to sync contact form submission', error);
      // Will try again next time sync is triggered
      return;
    }
  }
}

// Functions to manage pending submissions in IndexedDB
// This is just a placeholder - actual implementation would use IndexedDB
async function getPendingContactSubmissions() {
  // In a real implementation, this would fetch from IndexedDB
  return [];
}

async function removePendingContactSubmission(id) {
  // In a real implementation, this would remove from IndexedDB
}
