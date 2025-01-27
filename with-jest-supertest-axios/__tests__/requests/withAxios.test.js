const axios = require('axios');
const app = require('../../app');

let server;

/** @type {import('axios').AxiosInstance} */
let api;

beforeAll((done) => {
	server = app.listen(() => {
		// We use ephemeral port (short-lived or lasts for a very brief period)
		const { port } = server.address(); // automatically assign an available port
		console.log('Test server running on port:', port);
		api = axios.create({
			baseURL: `http://localhost:${port}`,
		});
		done();
	});
});
afterAll(() => {
	server.close(); // without this we get warning --- `A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.`
});

describe.only('with axios', () => {
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
