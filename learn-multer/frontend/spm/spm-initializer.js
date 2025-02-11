import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkIfProcessIsRunning } from './spm-utils.js';
import { log } from 'node:console';
import { kill } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const spmInitializer = () => {
    // if both spmJs and its child are running then do not do anything.
    const jsonData = JSON.parse(fs.readFileSync('spm.json', 'utf8'));

    // console.log(checkIfProcessIsRunning(jsonData.pid.spmJs), checkIfProcessIsRunning(jsonData.pid.child));
    if (checkIfProcessIsRunning(jsonData.pid.spmJs) && checkIfProcessIsRunning(jsonData.pid.child)) {
        // ! **** Enable below line to debug successful spm start ***
        // console.log('SPM: Both processes are running well already');
        return; // Stop the function here.
    } else {
        // This runs when only one process (of the two process ids) mentioned in spm.json file is running, so we do a cleanup by killing that one process so that we start only fresh processes only
        if (checkIfProcessIsRunning(jsonData.pid.spmJs)) { kill(jsonData.pid.spmJs); }
        if (checkIfProcessIsRunning(jsonData.pid.child)) { kill(jsonData.pid.child); }

        log(' ---- Spawning spm -----');
        // spm (switch process manager)
        const commandSpm = 'node spm.js';
        const childSpm = spawn('sh', ['-c', commandSpm], {
            cwd: __dirname,
            detached: true, // Run independently in detached state
            // ! Note: You must use below `stdio: "ignore"` otherwise your detached child will be killed by playwright cli when the test are finished (irrespective if you use `nodemon` or not). Also if you are directly running `node spm-initializer.js` for standalone testing the `spm.js` will stop working as soon as you close/kill the terminal (`exit` command).
            stdio: "ignore", // Ignore child’s stdio
            //  Enable below limne for debugging for debugging only for e.g., when there is error in json syntax in the `spm.json` file, checking logs of spm.js file, etc.
            // stdio: "inherit", // Inherit child’s stdio (
        });
        childSpm.unref(); // Ensure the child is fully detached
    }
};

// Uncomment below line test spm standalone by running this file via `node spm-initializer.js`
// spmInitializer();