self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'UPDATE_NOTIFICATION') {
        const data = event.data.payload;
        self.registration.showNotification(`Ramzan Day ${data.day}`, {
            body: `Sahar: ${data.sahar} | Iftar: ${data.iftar}`,
            icon: 'icon.png',
            badge: 'icon.png',
            tag: 'daily-timing',
            requireInteraction: true,
            renotify: true
        });
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
