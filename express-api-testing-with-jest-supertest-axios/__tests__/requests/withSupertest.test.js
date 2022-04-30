const supertest = require('supertest')
const {app} = require('../../app')

let {log} = console

//? IMPORTANT: **Although its tempting to use `supertest` for making requests but its absolutely phenomental to make *pure functions* to make use of while making request functions with `axios` coz that empowers us code-reusability feature and that is super super cool.

// supertest got its api derived from its parent i.e., superagent (a http request library like axios): https://github.com/visionmedia/superagent

// log(process.env.NODE_ENV) // Output: "test"
// You don't need to install dotenv at all.

const api = supertest(app)

test('Check root endpoint, #supertest', async () => {
	const expectedBody = "You made a get request on '/' endpoint."
	const expectedStatus = 200

	await api
		.get('')
		.expect(expectedStatus, expectedBody)
		.expect('Content-Type', /text\/html/) // 🎁︎ With regex we are trying to match "text/html; charset=utf-8" text.

	// .expect('Content-Type', /application\/json/)
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

afterAll(() => {
	// mongoose.connection.close()
	// ^^ This is something you probably need when you have mongoose database or other database involved.
})
