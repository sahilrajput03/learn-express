require('dotenv').config({path: 'envs/env.test'})

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const {expect} = require('expect')
const mongoose = require('mongoose')

// withSupertest.test
connectToDb(async () => {
	await require('../initMongodb.js')
})

closeDb(async () => {
	await mongoose.connection.close()
})

beforeAll(async () => {})

test('Check root endpoint, #supertest', async () => {
	const expectedBody = "You made a get request on '/' endpoint."
	const expectedStatus = 200
	// const {NODE_ENV, DATABASE_URL} = process.env
	// log({NODE_ENV, DATABASE_URL})

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

test('database request', async () => {
	// TODO
	// 1. TO FIX: - Make test refresh on server routes code change anyhow!
	// 2. Handle if backend throws error in in api then you should handle that somehow so that hotmodule replacement works with file save again.
	const expectedBody = {
		name: 'Bruno Mars',
		phoneNumber: 123456789,
		address: 'Some address here',
	}

	const expectedStatus = 200

	// Never await api call if you are using .end function on the api call.
	const response = await api.post('/c').send(expectedBody) //🔥︎ This is how you send data.
	// .expect('Content-Type', /application\/json/) // this fails the request.

	expect(response.body).toMatchObject(expectedBody)
	expect(response.body).toHaveProperty('_id')
})

//? Add below thing as important..!
// if (
// 	process.env.NODE_ENV !== 'test' ||
// 	!process.env.DATABASE_URL.includes('test')
// ) {
// 	throw new Error('*CRITICAL ERROR*: You are not using test environment')
// }
