// Why you SHOULD NEVER use axios way of testing?
// withAxios.test.js suite will fail if you don't have server running up (at right port).

// ALERT: I am intentionally keeeping this axios test file and adding `.skip` to the tests to prevet them form running.

const {rootRequest, aEndpointRequest} = require('../../requests/requests')
let {log} = console

test.skip('Check root endpoint', async () => {
	const response = await rootRequest()

	const received = response.data
	const expected = "You made a get request on '/' endpoint."
	expect(received).toBe(expected)

	// check status as well.
	expect(response.status).toBe(200)
})

test.skip('Check /a endpoint', async () => {
	const response = await aEndpointRequest()

	const received = response.data
	const expected = "You made get request on '/a' endpoint."
	expect(received).toBe(expected)

	// check status as well.
	expect(response.status).toBe(201)
})
