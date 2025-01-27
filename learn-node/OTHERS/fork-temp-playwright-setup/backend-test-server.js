// This file would run a backend server that does:
// 1. start backend server at port 8085
// 2. connect to mongodb with test db
// on cleanup I would close server and clean mongodb.

setTimeout(() => {
    // console.log('App running on: http://localhost:8080');
    process.send({ data: 'TEST_SERVER_STARTED' });
}, 1_000);
setTimeout(() => {
    // console.log('MONGO DB CONNECTED: 127.0.0.1');
    process.send({ data: 'MONGODB_CONNECTED' });
}, 1_000);

process.on('message', (message) => {
    console.log('|CHILD|', 'Received from parent:', message);
    if (message.data === 'CLEANUP') {
        console.log('|CHILD|', 'calling server.close() and db.disconnect()');
    }
});

setInterval(() => { }, 1000_000); // Keep the process alive to micic actual backend server for this demo testing
