// @ts-nocheck
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

// This identify who's sending the push notification
webpush.setVapidDetails('mailto:test@test.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

// Subscribe Route
app.post('/subscribe', (req, res) => {
	// Get pushSubscription object
	const subscription = req.body;

	// SHAPE of subscription object (got from network requests in browser). This is different for every service worker registered @ see code in client.js file in `client` directory to know more!
	//   {
	//   "endpoint": "https://fcm.googleapis.com/fcm/send/dotnldXWqrk:APA91bGzN4T6VjR3VxfTg6mI9XoAiqszwFhWumJ4HdrR8Bw7Ol77TqsZucy1hTv9qIDMEMKIiXIZNE8offwgTg_APPpWQctRPg0OmOmQpVDvGJOgQzzZx-MzBHUbZE1tgm5YIMl5aVTx",
	//   "expirationTime": null,
	//   "keys": {
	//       "p256dh": "BP0YVfYzk9LGhj15hpoR1T9J7Q0eVnNfN3RBUxoXu7DrEANJHBjIrWJXpN5Sf8bzr0lXuWSatPKEWAXnxXy0JRI",
	//       "auth": "_dVtFQVkQomkKNktJUxpVw"
	//   }
	// }

	// Send 201 - resource created
	res.status(201).json({});


	// Send a notification
	const payload = JSON.stringify({
		title: 'This is title 1.',
		body: "This is body 1.",
		icon: "http://image.ibb.co/frYOFd/tmlogo.png",
	});
	try {
		webpush.sendNotification(subscription, payload);
	} catch (err) {
		console.error('Error sending notification?', err);
	}
});

const port = 6001;

app.listen(port, () => console.log(`Server started on port ${port}`));
