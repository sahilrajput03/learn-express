import { spawn } from 'node:child_process';

// & 1. In the `beforeAll()` function we would start backend server and
// &    connect to mongodb.

// Using sh (shell) we can execute many commands at once    
const command = 'node backend-test-server.js';
const cwd = undefined;

const child = spawn('sh', ['-c', command], { cwd, });

let testsWereRun = false;
let serverStarted = false;
let mongodbConnected = false;

// Handle stdout (real-time standard output)
child.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data}`);

    // & we can start playwright tests when we get two outputs:
    // We can do this like this:
    if (data.includes("App running on:")) { serverStarted = true; }
    if (data.includes("MONGO DB CONNECTED:")) { mongodbConnected = true; }
    if (serverStarted && mongodbConnected && !testsWereRun) {
        testsWereRun = true; // we need this so that we signal to run tests only once and not multiple times
        console.log(' > > > > Playwright tests can run now! \n\n\n\n');
        // ! tests can run now..., since server and database connections are ready in `backend-test-server`
    }
});

// Handle stderr (real-time standard error)
child.stderr.on('data', (data) => {
    console.error(`STDERR: ${data}`);
});

// Handle the process exit
child.on('close', (code) => {
    console.log(`Process exited with code: ${code}`);
    console.log('closing backend-test-server ');
});

// ----------------

// & 2. In `afterAll()` function we need to call the `process.kill()`
// &    (which would trigger `server.close()` and database connection
// &    in the backend-test-server.js file).
setTimeout(() => {
    console.log('-> Sending SIGINT to child process...');
    process.kill(child.pid, 'SIGINT');
}, 3000);
