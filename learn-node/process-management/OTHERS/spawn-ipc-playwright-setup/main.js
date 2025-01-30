// & playwright-setup-for-setting-up-test-server

import { spawn } from 'node:child_process';

// & 1. In the `beforeAll()` function we would start backend server and
// &    connect to mongodb.

// Using sh (shell) we can execute many commands at once    
const command = 'node backend-test-server.js';
const cwd = undefined;

const child = spawn('sh', ['-c', command], {
    cwd,
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // We enable IPC by adding 'ipc' in the `stdio` option
});

let testsWereRun = false;
let serverStarted = false;
let mongodbConnected = false;

child.send({ message: 'START_SERVER_AND_CONNECT_TO_DB' });

child.on('message', (data) => {
    console.log('|PARENT|', 'Received from child:', data);
    if (data.message === 'TEST_SERVER_STARTED') { serverStarted = true; }
    if (data.message === 'MONGODB_CONNECTED') { mongodbConnected = true; }
    if (serverStarted && mongodbConnected && !testsWereRun) {
        testsWereRun = true; // we need this so that we signal to run tests only once and not multiple times
        console.log(' > > > > Playwright tests can run now! \n\n\n'); // ! tests can run now...
    }
});

// Handle stdout and stderr of child
child.stdout.on('data', (data) => { console.log('|CHILD-STDOUT|:', data.toString()); });
child.stderr.on('data', (data) => { console.log('|CHILD-STDERR|:', data.toString()); });

// Runs only when CHIL  D exits via `process.exit(exitCode?)` or any runtime exception in CHILD process
// Triggered when the child process terminates (regardless of success or failure).
child.on('exit', (code) => {
    console.log(`|PARENT|', 'Child exited with code ${code}`);
});

// ----------------

// & 2. In `afterAll()` function we need to call the `process.kill()`
// &    (which would trigger `server.close()` and database connection
// &    in the backend-test-server.js file).
setTimeout(() => {
    console.log('-> |PARENT|', '-> Sending SIGINT to child process...');
    process.kill(child.pid, 'SIGINT');
}, 3000);
