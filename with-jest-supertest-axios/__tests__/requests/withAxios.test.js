const axios = require('axios');
const app = require('../../app');

const PORT = 4000;
const api = axios.create({
	baseURL: `http://localhost:${PORT}`,
});

describe.only('with axios', () => {
	let server;

	beforeAll((done) => {
		server = app.listen(PORT, () => {
			// console.log('Test server running...');
			done();
		});
	});
	afterAll(() => {
		server.close();
	});

	test('Check root endpoint', async () => {
		const response = await api.get('/');

		const received = response.data;
		const expected = "You made a get request on '/' endpoint.";
		expect(received).toBe(expected);

		// check status as well.
		expect(response.status).toBe(200);
	});

	test('Check /a endpoint', async () => {
		const response = await api.get('/a');

		const received = response.data;
		const expected = "You made get request on '/a' endpoint.";
		expect(received).toBe(expected);

		// check status as well.
		expect(response.status).toBe(201);
	});
});
