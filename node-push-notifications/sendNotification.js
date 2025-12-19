// @ts-nocheck
const axios = require('axios');

main();
async function main() {
    try {
        const response = await axios.post(
            'http://localhost:6001/send-push-notification',
            {
                subscription: {
                    'endpoint': 'https://fcm.googleapis.com/fcm/send/eOpq9ss28NU:APA91bH-BSh9TFVpMWHoqKezg6SP2GAhpGJ3G1TcgJcogA_pWy9QakYDMWZyA4P1mhMVxswPrUT3J7PFl0lGxrCPe4K9QsNnWXa4w4Rly7xJkt8sF9wmDwAWQ8HY8TKGA1Xky-nfo1KB',
                    'expirationTime': null,
                    'keys': {
                        'p256dh': 'BNMGjfp0S6Uh5WmJerxUMYwyZyXUkGNy6-y3idcTTtxhs66UbSEwZ9wBBh80vDQtY6KlRjfVhG7v9spPPeRxrYU',
                        'auth': 'PmZ7vzo0Vv7Zfi-dezBNcg'
                    }
                },
                notification: {
                    title: 'Title 3.',
                    body: "Body 3.",
                    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
                }
            },
        );
        console.log("🚀 ~ response:", response.data);
    } catch (error) {
        console.log('Got error?', { name: error?.name, message: error?.message });

    }
}