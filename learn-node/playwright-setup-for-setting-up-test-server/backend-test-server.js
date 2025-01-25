// This file would run a backend server that does:
// 1. start backend server at port 8085
// 2. connect to mongodb with test db
// on cleanup I would close server and clean mongodb.

console.log('App running on: http://localhost:8080');
console.log('MONGO DB CONNECTED: 127.0.0.1');

process.on('SIGINT', () => {
    console.log('Received SIGINT. Exiting...');
    console.log('calling server.close()');
    console.log('calling db.disconnect()');
    process.exit(0);
});

setInterval(() => { }, 1000_000); // Keep the process alive
