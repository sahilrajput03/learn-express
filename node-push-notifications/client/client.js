// @ts-nocheck
const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// Verifies that the browser supports Service Workers
if ("serviceWorker" in navigator) {
  registerServiceWorkerAndPush().catch(err => console.error('App Error?', err));
}

var subscription;

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
  subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("🚀 ~ subscription:", subscription);
  console.log("Push Registered ✅");
}

async function getTestPushNotification() {
  // Send Push Notification
  console.log("Sending Test Push Notification 🚀");
  const notification = {
    title: 'Title 1',
    body: "Body 1",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  };
  const response = await axios.post('/send-push-notification', { subscription, notification });
  console.log("Push Sent ✅", response.data);
}

const btn = document.createElement('button'); document.body.append(btn);
btn.innerText = 'Get Test Push Notification';
btn.onclick = getTestPushNotification;


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
