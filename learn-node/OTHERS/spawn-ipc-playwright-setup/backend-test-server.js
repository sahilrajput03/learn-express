// This file would run a backend server that does:
// 1. start backend server at port 8085
// 2. connect to mongodb with test db
// on cleanup I would close server and clean mongodb.


process.on('message', (data) => {
    console.log('|CHILD|', 'Received from parent:', data);
    process.send({ message: 'MONGODB_CONNECTED' });
    process.send({ message: 'TEST_SERVER_STARTED' });
});


process.on('SIGINT', () => {
    console.log('|CHILD| Received SIGINT --- Calling `server.close()` & `db.disconnect()`');
    process.exit(0); // exiting expolicity is necessary to terminate this child process
});

setInterval(() => { }, 1000_000); // Keep the process alive
