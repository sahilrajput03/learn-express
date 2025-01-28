// & playwright-setup-for-setting-up-test-server
// TODO_EXPLORE_IF_THERE_IS_NEED: Add a cleanup db function initiation by sending ipc message from this process to reset test db b/w tests as per need.

const { fork } = require('child_process');

// & Inside `beforeAll()`
const child = fork('backend-test-server.js');
console.log('|PARENT|', 'Started backend test server!');

let testsWereRun = false;
let serverStarted = false;
let mongodbConnected = false;

child.on('message', (data) => {
    console.log('|PARENT|', 'Received from child:', data);
    if (data.message === 'TEST_SERVER_STARTED') { serverStarted = true; }
    if (data.message === 'MONGODB_CONNECTED') { mongodbConnected = true; }
    if (serverStarted && mongodbConnected && !testsWereRun) {
        testsWereRun = true; // we need this so that we signal to run tests only once and not multiple times
        console.log(' > > > > Playwright tests can run now! \n\n\n'); // ! tests can run now...
    }
});

// & Inside `afterAll()`
setTimeout(() => {
    console.log('|PARENT|', 'closing backend-test-server ');
    child.send({ data: 'CLEANUP' });
}, 3000);
