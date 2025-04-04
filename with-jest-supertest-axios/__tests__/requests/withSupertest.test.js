// FYI: Superagent is cool library to use for frontend requests as well(16 stars vs. axios 93k starts): https://github.com/visionmedia/superagent
// Reason for advantage of using superagent in frontend is that you might get advantage of similar api structure in frontend as you have in below tests.
//LEARN: For test we are loading .env.test file
require('dotenv').config({ path: 'envs/env.test' });

// LEARN: We must load .env.test file first before executing below line.
if (
	process.env.NODE_ENV !== 'test' ||
	!process.env.DATABASE_URL.includes('test')
) {
	// ! Prevent accidental accidental deletion of development or production databases when running tests
	throw new Error('*CRITICAL ERROR*: You are not using test environment');
}

const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
// let log, debug
// console.log = log = debug = console.debug
// FYI: last value is assigned to all the previous bindings

let log = console.log;

// console.debug(process.env.NODE_ENV) // Output: "test"
jest.setTimeout(10 * 60 * 1_000); // timeout set to 10 minutes(coz sometimes while debugging user might be doing self assisted execution).
test('Check root endpoint, #supertest', async () => {
	const expectedBody = "You made a get request on '/' endpoint.";
	const expectedStatus = 200;
	log({
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_URL: process.env.DATABASE_URL,
	});

	const response = await api
		.get('')
		.expect(expectedStatus, expectedBody)
		.expect('Content-Type', /text\/html/); // 🎁︎ With regex we are trying to match "text/html; charset=utf-8" text.
});

test('Check /b endpoint, #supertest', async () => {
	const expectedBody = { car: 20, bike: 30 };
	const expectedStatus = 203;

	await api
		.get('/b')
		.send(expectedBody) //🔥︎ This is how you send data.
		.expect('Content-Type', /application\/json/)
		.expect(expectedStatus, expectedBody);
});

afterAll(() => {
	// mongoose.connection.close()
	// ^^ This is something you probably need when you have mongoose database or other database involved.
});
