// Service worker mínimo: permite instalar la app en el celular. No guarda copias, así que siempre se ve la última versión.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
