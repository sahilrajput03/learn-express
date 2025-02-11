import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.testing') }); // we need to config before so that this file and `backendTestServer` both can use environment variables from `.env.testing` file.

export const backendTestServerPort = process.env.VITE_APP_PORT
