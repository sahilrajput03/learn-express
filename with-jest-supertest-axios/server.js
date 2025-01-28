// LEARN: It is important that we load .env file with before be import app.
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
	// Greet differently when starting a production server.
	// This could be usefult coz you never wan't to experiment on production server so it must when some special logs are shown you are alerted already!
	console.log('Started PRODUCTION APP\n'.repeat(5));
}

const app = require('./app');
// LEARN: It is important to separate app from this file bcoz we need to load .env.test file for app.js while running tests.
// LEARN: If we had put `require('dotenv').config()` in app.js we would not be able to load .env.test in the case of running a test with jest(We are loading .env.test file with `dotenv` in our tests before we import `App` module).

const PORT = 8080;

app.listen(PORT, function () {
	console.log(`(🔥︎${process.env.NODE_ENV}) express running on', PORT, '...`);
});
