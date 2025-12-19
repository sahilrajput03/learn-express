// @ts-nocheck
const webpush = require('web-push');
require('dotenv').config();

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

// This identify who's sending the push notification
webpush.setVapidDetails('mailto:test@test.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

main();
async function main() {
    const subscription = {
        'endpoint': 'https://fcm.googleapis.com/fcm/send/eOpq9ss28NU:APA91bH-BSh9TFVpMWHoqKezg6SP2GAhpGJ3G1TcgJcogA_pWy9QakYDMWZyA4P1mhMVxswPrUT3J7PFl0lGxrCPe4K9QsNnWXa4w4Rly7xJkt8sF9wmDwAWQ8HY8TKGA1Xky-nfo1KB',
        'expirationTime': null,
        'keys': {
            'p256dh': 'BNMGjfp0S6Uh5WmJerxUMYwyZyXUkGNy6-y3idcTTtxhs66UbSEwZ9wBBh80vDQtY6KlRjfVhG7v9spPPeRxrYU',
            'auth': 'PmZ7vzo0Vv7Zfi-dezBNcg'
        }
    };

    // Send a notification
    const notification = {
        title: 'Title 2.',
        body: "Body 2.",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    };
    try {
        webpush.sendNotification(subscription, JSON.stringify(notification));
    } catch (err) {
        console.error('Error sending notification?', err);
    }
}