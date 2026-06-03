importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCdm6T0RlBvnFFgXuGB3-q5EtTcci7p6LI",
  authDomain: "world-cup-2026-1b9ee.firebaseapp.com",
  databaseURL: "https://world-cup-2026-1b9ee-default-rtdb.firebaseio.com",
  projectId: "world-cup-2026-1b9ee",
  storageBucket: "world-cup-2026-1b9ee.firebasestorage.app",
  messagingSenderId: "349637498450",
  appId: "1:349637498450:web:70be216f600622526d718b"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '⚽ World Cup 2026';
  const body = payload.notification?.body || '';
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: { url: 'https://worldcoupe2026.netlify.app' }
  });
});

// Click on notification opens the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || 'https://worldcoupe2026.netlify.app')
  );
});
