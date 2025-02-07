import axios from "axios";
import type { AxiosInstance } from "axios";
import { IncomingMessage, Server, ServerResponse } from "http";
import { app } from "../src/app";
import { AddressInfo } from "net";
import { sleep } from "../src/utils";
const fs = require('fs');
const path = require('path');

let server: Server<typeof IncomingMessage, typeof ServerResponse>;
let api: AxiosInstance;

jest.setTimeout(10 * 60 * 1_000); // timeout set to 10 minutes(coz sometimes while debugging user might be doing self assisted execution).

beforeAll((done) => {
    server = app.listen(() => {
        // We use ephemeral port (short-lived or lasts for a very brief period)
        const { port } = server.address() as AddressInfo; // automatically assign an available port
        console.log('Test server running on port:', port);
        api = axios.create({ baseURL: `http://localhost:${port}` });
        // api = axios.create({ baseURL: `http://localhost:${8080}` }); // ! for testing only
        done();
    });
});
afterAll(() => {
    server.close(); // without this we get warning --- `A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.`
});

describe('multer uploads', () => {
    describe('upload single file', () => {
        test('successful', async () => {
            const file = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img1.jpg'))], { type: 'image/jpeg' });

            const formData = new FormData();
            formData.set('name', 'Sahil Rajput');
            formData.set('price', '25');
            formData.append('photo', file);

            const payload = formData;
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            const { data } = await api.post('/v2/single-image', payload, config);
            expect(data.success).toBe(true)
        })
        test('calling api without image should fail', async () => {
            const formData = new FormData();
            formData.set('name', 'Sahil Rajput');
            formData.set('price', '25');
            // Note: We do not send photo intentionally to test the failure case here
            // formData.append('photo', file);

            const payload = formData;
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            let error
            try {
                const { data } = await api.post('/v2/single-image', payload, config);
            } catch (e: any) {
                error = e
            }
            expect(error.response.data).toMatchObject({ success: false })
        })

        test('uploading more than expected files should fail', async () => {
            const file1 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img1.jpg'))], { type: 'image/jpeg' });
            const file2 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img2.jpg'))], { type: 'image/jpeg' });
            const files = [file1, file2]

            const formData = new FormData();
            formData.set('name', 'Sahil Rajput');
            formData.set('price', '25');
            // Note: We add more than expected images intentionally to test the failed case
            files.forEach((file: any) => {
                formData.append('photo', file);
            });

            const payload = formData;
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            let error
            try {
                const { data } = await api.post('/v2/single-image', payload, config);
            } catch (e: any) {
                error = e
            }
            expect(error.response.data).toStrictEqual({
                success: false,
                message: 'Please make sure you are uploading to `photo` field and not more than 1 file.',
                error: {
                    name: 'MulterError',
                    message: 'Unexpected field',
                    code: 'LIMIT_UNEXPECTED_FILE',
                    field: 'photo',
                    storageErrors: []
                }
            })
        })
    })

    describe('upload multiple file', () => {
        test('successful', async () => {
            // Note to Developer:
            // 1. since this test fails because of some error I couldn't figure out yet but making sleep for 100ms works to make this test work.
            // 2. In futre if we again get failed error we can try to increase the sleep time by passing `200` to the sleep function probably.
            await sleep()
            const file1 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img1.jpg'))], { type: 'image/jpeg' });
            const file2 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img2.jpg'))], { type: 'image/jpeg' });
            const files = [file1, file2]

            const formData = new FormData();
            formData.set('name', 'Sahil Rajput');
            formData.set('price', '25');
            files.forEach((file: any) => {
                formData.append('photos', file);
            });

            const payload = formData;
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            const { data } = await api.post('/v2/multiple-image', payload, config);
            expect(data.success).toBe(true)
        })

        test('calling api without image should fail', async () => {
            const formData = new FormData();
            formData.set('name', 'Sahil Rajput');
            formData.set('price', '25');
            // Note: We do not send photo intentionally to test the failure case here
            // files.forEach((file: any) => {
            //     formData.append('photos', file);
            // });

            const payload = formData;
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            let error
            try {
                const { data } = await api.post('/v2/multiple-image', payload, config);
            } catch (e: any) {
                error = e
            }
            expect(error.response.data).toMatchObject({ success: false })
        })

        test('uploading more than expected files should fail', async () => {
            const file1 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img1.jpg'))], { type: 'image/jpeg' });
            const file2 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img2.jpg'))], { type: 'image/jpeg' });
            const file3 = new Blob([fs.readFileSync(path.join(__dirname, 'sample-files', 'img3.jpg'))], { type: 'image/jpeg' });
            const files = [file1, file2, file3]

            const formData = new FormData();
            formData.set('name', 'Sahil Rajput');
            formData.set('price', '25');
            // Note: We add more than expected images intentionally to test the failed case
            files.forEach((file: any) => {
                formData.append('photos', file);
            });

            const payload = formData;
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            let error
            try {
                const { data } = await api.post('/v2/multiple-image', payload, config);
            } catch (e: any) {
                error = e
            }
            expect(error.response.data).toStrictEqual({
                success: false,
                message: 'Please make sure you are uploading to `photos` field and not more than 2 files.',
                error: {
                    name: 'MulterError',
                    message: 'Unexpected field',
                    code: 'LIMIT_UNEXPECTED_FILE',
                    field: 'photos',
                    storageErrors: []
                }
            })
        })
    })
})
