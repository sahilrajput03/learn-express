// @ts-nocheck
const webpush = require('web-push');
require('dotenv').config();

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

// This identify who's sending the push notification
webpush.setVapidDetails('mailto:test@test.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

main();
async function main() {
    // * Learn: Should I store this whole object to be able to send notification to individual person? TLDR - YES  ✅ (src: https://chatgpt.com/c/69455cf6-e498-8321-ae6b-f3cc6b0e9147)
    const subscription1 = {
        'endpoint': 'https://fcm.googleapis.com/fcm/send/eOpq9ss28NU:APA91bH-BSh9TFVpMWHoqKezg6SP2GAhpGJ3G1TcgJcogA_pWy9QakYDMWZyA4P1mhMVxswPrUT3J7PFl0lGxrCPe4K9QsNnWXa4w4Rly7xJkt8sF9wmDwAWQ8HY8TKGA1Xky-nfo1KB',
        'expirationTime': null,
        'keys': {
            'p256dh': 'BNMGjfp0S6Uh5WmJerxUMYwyZyXUkGNy6-y3idcTTtxhs66UbSEwZ9wBBh80vDQtY6KlRjfVhG7v9spPPeRxrYU',
            'auth': 'PmZ7vzo0Vv7Zfi-dezBNcg'
        }
    };
    // ✅ I used `subscription2` to test notification for `RagaTime` and it works good.
    // const subscription2 = { "endpoint": "https://fcm.googleapis.com/fcm/send/e3r525qiMPM:APA91bEJovSKuJTAstba0LfE3oK90qUEZvqDC09BlbOEp6q_UtMTyLceJ1_MOz4kvw2FLwKwemeIwoTpGh5v7NIUxnkYD-YcVXYn9Wkh4s638eFkYK6aNHN53OjsQ1Gsl9g7TMiuV0_i", "expirationTime": null, "keys": { "p256dh": "BPzCW2vrbOM1lflo9Z2RD_f3S4GxZ_W4N7fBBhMnRKskYJOUnkv-9bR2KroFE_YB2sM4pSc4V41dA2nswxi7p60", "auth": "gDuKaj4MYXwIjZfK6fxqaA" } };

    // Send a notification
    const notification = {
        title: 'Title 2.',
        body: "Body 2.",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    };
    try {
        webpush.sendNotification(subscription1, JSON.stringify(notification));
    } catch (err) {
        console.error('Error sending notification?', err);
    }
}