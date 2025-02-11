// & playwright-setup-for-setting-up-test-server

import { execSync, spawn } from 'node:child_process';
import { log, time, timeEnd } from 'node:console';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as path from 'path';
import { rimrafSync } from 'rimraf'
import fs from 'node:fs';
import { spmInitializer } from './spm/spm-initializer'

let serverStarted = false;
let mongodbConnected = false;

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetFolderPath = path.join(__dirname, '..', 'backend'); // !!!!!!

export const vars = { testsWereRun: false }

function ensureBackendBuild() {
    if (!process.env.CI) {
        // rimrafSync(path.join(targetFolderPath, 'dist')) // generally a good practise to delete code (sometimes?) but not necessary at all
        if (!fs.existsSync(path.join(targetFolderPath, 'dist'))) {
            // Note: `npx tsc` command takes 3 seconds thus I'm using spm-solution instead (see code after below line)
            execSync('npx tsc', { cwd: targetFolderPath, stdio: 'inherit' })
        }

        // spm-solution to help the unnecessary running of `npx tsc` before each test run in each test file --- and with below solution we only typescript files are only compiled when backend source code is changed only (via a background/detached process which is managed via `spm.json` file).
        spmInitializer()
    } else {
        log('Detected CI: Running `npx tsc` to generate javascript code in backend project')
        execSync('npx tsc', { cwd: targetFolderPath, stdio: 'inherit' })
    }
}

function spawnBackendTestServer() {
    // Using sh (shell) we can execute many commands at once    
    const command = 'node dist/src/test-server-for-playwright.js';
    const child = spawn('sh', ['-c', command], {
        cwd: targetFolderPath,
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // We enable IPC by adding 'ipc' in the `stdio` option
    });

    child.send({ message: 'START_SERVER_AND_CONNECT_TO_DB', port: 8191 }); // ! READ PORT FROM .env.testing file directly

    // Note: We are using ipc here
    child.on('message', (data: any) => {
        // log('|PARENT|', 'Received from child:', data);
        if (data.message === 'TEST_SERVER_STARTED') {
            serverStarted = true;
        }
        if (data.message === 'MONGODB_CONNECTED') { mongodbConnected = true; }
        if (serverStarted && mongodbConnected && !vars.testsWereRun) {
            // We need `testsWereRun` so that we can signal to run tests once (not multiple times)
            vars.testsWereRun = true;
            // log(' > > > > Playwright tests can run now! \n\n\n');
        }
    });

    // Handle stdout and stderr of child
    child.stdout?.on('data', (data) => { log('|CHILD-STDOUT|:', data.toString()); });
    child.stderr?.on('data', (data) => { log('|CHILD-STDERR|:', data.toString()); });

    // Runs only when CHILD exits via `process.exit(exitCode?)` or any runtime exception in CHILD process
    // Triggered when the child process terminates (regardless of success or failure).
    child.on('exit', (code) => {
        // log(`|PARENT|', 'Child exited with code ${code}`);
    });

    return child.pid
}

export function startBackendTestServer() {
    // log('Running main function...');

    // Ensure continuous backend source code building from its typescript code so that backend test server code (js) is available
    ensureBackendBuild()

    return spawnBackendTestServer()
}