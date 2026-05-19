const CACHE_NAME = 'finanzas-v1';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

// Install event - cache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Handle Google Sheets API requests specially
  if (request.url.includes('sheets.googleapis.com')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache successful API responses
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
              console.log('Sirviendo API response desde cache');
              return cachedResponse;
            }
            // Return offline response
            return new Response(JSON.stringify({ 
              offline: true, 
              message: 'Sin conexión a internet' 
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }
  
  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(request).then(response => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // Return a custom offline page if available
        return caches.match('/index.html');
      })
  );
});

// Background sync for pending writes
self.addEventListener('sync', event => {
  if (event.tag === 'sync-movements') {
    event.waitUntil(syncPendingMovements());
  }
});

async function syncPendingMovements() {
  // Get pending movements from IndexedDB or localStorage
  // This would need to be implemented with a more robust storage solution
  console.log('Sincronizando movimientos pendientes...');
  
  // Send notification when sync is complete
  self.registration.showNotification('Finanzas', {
    body: 'Movimientos sincronizados correctamente',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  });
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '¿Registraste tus gastos hoy?',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'finanzas-reminder',
    actions: [
      { action: 'open', title: 'Abrir app' },
      { action: 'dismiss', title: 'Descartar' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Recordatorio de Finanzas', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
