// Service worker: permite instalar la app en el celular y recibir notificaciones. No guarda copias, así que siempre se ve la última versión.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'Galway Alimentos', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Galway Alimentos', {
    body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.order_id ? 'pedido-' + d.order_id : undefined, renotify: !!d.order_id,
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if ('focus' in c) { c.postMessage({ type: 'avisos' }); return c.focus(); }
    }
    return self.clients.openWindow('/?avisos=1');
  }));
});
