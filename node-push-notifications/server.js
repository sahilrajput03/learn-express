// @ts-nocheck
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ quiet: true });

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

// This identify who's sending the push notification
webpush.setVapidDetails('mailto:test@test.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

app.post('/push-notification', async (req, res) => {
	const { subscription, notification } = req.body;
	// console.log('subsciption?', subscription)
	// Output:
	//   {
	//   "endpoint": "https://fcm.googleapis.com/fcm/send/dotnldXWqrk:APA91bGzN4T6VjR3VxfTg6mI9XoAiqszwFhWumJ4HdrR8Bw7Ol77TqsZucy1hTv9qIDMEMKIiXIZNE8offwgTg_APPpWQctRPg0OmOmQpVDvGJOgQzzZx-MzBHUbZE1tgm5YIMl5aVTx",
	//   "expirationTime": null,
	//   "keys": {
	//       "p256dh": "BP0YVfYzk9LGhj15hpoR1T9J7Q0eVnNfN3RBUxoXu7DrEANJHBjIrWJXpN5Sf8bzr0lXuWSatPKEWAXnxXy0JRI",
	//       "auth": "_dVtFQVkQomkKNktJUxpVw"
	//   }
	// }
	try {
		webpush.sendNotification(subscription, JSON.stringify(notification));
		res.send('ok');
	} catch (err) {
		console.error('Error sending notification?', err);
		res.status(400).send('Failed to send notification.');
	}
});

const port = 6001;

app.listen(port, () => console.log(`Server started on port ${port}`));
