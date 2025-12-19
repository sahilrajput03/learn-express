// @ts-nocheck
console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Received?", data);
  self.registration.showNotification(data.title, data);
});
