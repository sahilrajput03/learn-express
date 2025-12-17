# Learn Push Notifications via Node

**Quick Links:**
- Inspiration (source): Push Notifications Using Node.js & Service Worker by Brad Traversy: [Click here](https://youtu.be/HlYFW2zaYQM)
    - [Github](https://github.com/bradtraversy/node_push_notifications)
- ❤️ My Github Repository - Simple Service Worker: [Click here][link-1]
- Test Any notifications: [Click here][link-2]

## Generate vapid keys:

```bash
npx web-push generate-vapid-keys
# Another command you can use: `./node_modules/.bin/web-push generate-vapid-keys`
```

Learn: To be able to send notification you only need to open url `localhost:5000` on the target device to receive notification. For more info check file `client/client.js`.


[link-1]: https://github.com/sahilrajput03/learn-react/tree/main/simple_service_worker
[link-2]: https://tests.peter.sh/notification-generator