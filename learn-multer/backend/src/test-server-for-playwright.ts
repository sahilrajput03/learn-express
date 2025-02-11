import { app } from "./app";
import { IncomingMessage, Server, ServerResponse } from "http";
import { AddressInfo } from "net";
import { log } from "console";
import logger from "../config/logger";

// This file would run a backend server that does:
// 1. start backend server at port 8085
// 2. connect to mongodb with test db
// on cleanup I would close server and clean mongodb.

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

process.on('message', async (data: any) => {
    // console.log('|CHILD|', 'Received from parent:', data);

    if (data.message === 'START_SERVER_AND_CONNECT_TO_DB') {
        // start test server
        await new Promise<void>((resolve, reject) => {
            server = app.listen(data.port, () => { // ! NEW: We receive port from frontend
                process.send?.({ message: 'TEST_SERVER_STARTED' });
                resolve()
            });
        })
        // connect to mongodb here
        process.send?.({ message: 'MONGODB_CONNECTED' });
    }
});


process.on('SIGINT', () => {
    // console.log('|CHILD| Received SIGINT --- Calling `server.close()` & `db.disconnect()`');
    server.close(); // without this we get warning --- `A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.`
    logger.success('Successfully exited Test Server Process')
    process.exit(0); // exiting explicity is necessary to terminate this child process
});