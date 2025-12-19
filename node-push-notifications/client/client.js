// @ts-nocheck
const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// Verifies that the browser supports Service Workers
if ("serviceWorker" in navigator) {
  registerServiceWorkerAndPush().catch(err => console.error('App Error?', err));
}

// Register SW, Register Push, Send Push
async function registerServiceWorkerAndPush() {
  // Register Service Worker
  console.log("Registering service worker 🚀");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered ✅");

  // Register Push
  console.log("Registering Push 🚀");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("🚀 ~ subscription:", subscription);
  console.log("Push Registered ✅");
}

async function sendPushNotification() {
  // Send Push Notification
  console.log("Sending Test Push 🚀");
  const response = await axios.post('/subscribe', subscription);
  console.log("Push Sent ✅", response.data);
}

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
