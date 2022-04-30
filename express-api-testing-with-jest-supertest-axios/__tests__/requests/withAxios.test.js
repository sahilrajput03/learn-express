const {rootRequest, aEndpointRequest} = require('../../requests/requests')
let {log} = console

test('Check root endpoint', async () => {
	const response = await rootRequest()

	const received = response.data
	const expected = "You made a get request on '/' endpoint."
	expect(received).toBe(expected)

	// check status as well.
	expect(response.status).toBe(200)
})

test('Check /a endpoint', async () => {
	const response = await aEndpointRequest()

	const received = response.data
	const expected = "You made get request on '/a' endpoint."
	expect(received).toBe(expected)

	// check status as well.
	expect(response.status).toBe(201)
})


