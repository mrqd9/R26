// sw.js - Service Worker for Ramzan Nagpur 2026

// 1. Install & Activate - Ensures the Service Worker takes control immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 2. The Notification Logic
self.addEventListener('message', (event) => {
    if (event.data.type === 'UPDATE_NOTIFICATION') {
        const data = event.data.payload;

        // Use a static tag 'daily-timing' so new notifications replace old ones
        const options = {
            body: `Sahar Ends: ${data.sahar} | Iftar Starts: ${data.iftar}`,
            icon: 'icon.png', // Path to your icon on GitHub
            badge: 'icon.png', // Small icon for the phone's status bar
            tag: 'daily-timing', 
            requireInteraction: true, // This makes it "Persistent" on Android/Desktop
            vibrate: [100, 50, 100],
            data: {
                url: self.registration.scope
            }
        };

        event.waitUntil(
            self.registration.showNotification(`Ramzan Day ${data.day} (Nagpur)`, options)
        );
    }
});

// 3. Handle Notification Click (Open the app when user taps the notification)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
