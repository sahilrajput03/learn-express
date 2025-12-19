// @ts-nocheck

const d = document;

// Verifies that the browser supports Service Workers
if ("serviceWorker" in navigator) {
  registerServiceWorkerAndCreatePushSubscription().catch(err => console.error('App Error?', err));
} else {
  console.log('❌ Service Workers are not supported in this browser.');
}

var subscription;

// Register SW & Create Push Subscription
async function registerServiceWorkerAndCreatePushSubscription() {
  // Register Service Worker
  console.log("🚀 Registering Service Worker");
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/"
  });
  console.log("✅ Service Worker Registered");

  // Create Push Subscription for "Push Notifications"
  console.log('🚀 Creating a Push Subscription for "Push Notifications" for the browser');
  const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
  subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  // console.log("🐞 subscription:", subscription);
  console.log("✅ Push Subscription Created");
}

async function getTestPushNotification() {
  // Send Push Notification
  console.log("🚀 Calling Push-Notification-API to get Test Push Notification");
  const notification = {
    title: 'Title 1',
    body: "Body 1",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  };
  const response = await axios.post('/send-push-notification', { subscription, notification });
  console.log("✅ Push-Notification-API Succeeded.", response.data);
}

const btn = d.createElement('button'); d.body.append(btn);
btn.innerText = 'Get Test Push Notification';
btn.onclick = getTestPushNotification;

// Utility Functions
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
