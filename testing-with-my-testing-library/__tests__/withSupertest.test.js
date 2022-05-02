require('dotenv').config({path: 'envs/env.test'})

if (
	process.env.NODE_ENV !== 'test' ||
	!process.env.DATABASE_URL.includes('test')
) {
	throw new Error('*CRITICAL ERROR*: You are not using test environment')
}

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('Check root endpoint, #supertest', async () => {
	const expectedBody = "You made a get request on '/' endpoint."
	const expectedStatus = 200
	log({
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_URL: process.env.DATABASE_URL,
	})

	const response = await api
		.get('')
		.expect(expectedStatus, expectedBody)
		.expect('Content-Type', /text\/html/) // 🎁︎ With regex we are trying to match "text/html; charset=utf-8" text.
	// throw 'shit..'
	// to mimic failing test..
})

test('Check /b endpoint, #supertest', async () => {
	const expectedBody = {car: 20, bike: 30}
	const expectedStatus = 203

	await api
		.get('/b')
		.send(expectedBody) //🔥︎ This is how you send data.
		.expect('Content-Type', /application\/json/)
		.expect(expectedStatus, expectedBody)
})
