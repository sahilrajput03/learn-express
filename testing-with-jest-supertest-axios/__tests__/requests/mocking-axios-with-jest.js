const axios = require('axios')

// carl...

// FYI: Read a simple mock funciton @ https://jestjs.io/docs/mock-functions#mock-names

// You can read this amazing article as well: https://www.robinwieruch.de/axios-jest/

jest.mock('axios')
// test.only or it.only is a way of running a single text for temporary time.
it.only('should fetch users', async () => {
	const users = [{name: 'Bob'}]
	const expected = {data: users}
	axios.get.mockResolvedValue(expected)
	// FYI: mockResolvedValue is a method like mockReturnValue('default') which says that a function should simply return this value on calling it.
	// FYI: Get list of all mock functions from jest via: https://jestjs.io/docs/mock-functions

	// or you could use the following depending on your use case:
	// axios.get.mockImplementation(() => Promise.resolve(expected))

	// return Users.all().then(data => expect(data).toEqual(users)); // ORIGINALLY FROM JEST DOC.
	await axios
		.get('https://google.com/urlHere')
		.then((res) => expect(res.data).toEqual(users))
})
