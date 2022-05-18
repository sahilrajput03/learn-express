require('dotenv').config({path: 'envs/env.test'})

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const {expect} = require('expect')
const mongoose = require('mongoose')

// ???????
// 1. what env file does fr uses??, imo it should use env.test file automatically by default..!
// 2. what is usage of expressasyncerror or mongoose-async-error they used in fso?

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
	const expectedBody = {
		name: 'Bruno Mars',
		phoneNumber: 123456789,
		address: 'Some address here',
	}

	const expectedStatus = 200

	// Never await api call if you are using .end function on the api call.
	const res = await api.post('/c').send(expectedBody).expect(expectedStatus) //🔥︎ This is how you send data.
	// .expect('Content-Type', /application\/json/) // this fails the request.

	expect(res.body).toMatchObject(expectedBody)
	expect(res.body).toHaveProperty('_id')
})

test('bad request ', async () => {
	// Please read code of ``CAUTION`` in `middleware/errorHandler` function to know why I have disabled error logging for `test` mode in backend by default but still you can enable it very easily enable it.
	let expectedError
	const res = await api.get('/bugged_api')
	// log({body: res.body})

	expect(res.body.error).toBeDefined()
	expect(res.body.error).toBe('Some stupid error..')
})

//? Add below thing as important..!
// if (
// 	process.env.NODE_ENV !== 'test' ||
// 	!process.env.DATABASE_URL.includes('test')
// ) {
// 	throw new Error('*CRITICAL ERROR*: You are not using test environment')
// }
