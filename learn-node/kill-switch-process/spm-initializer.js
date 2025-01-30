const { spawn } = require('child_process');
const fs = require('fs');
const { kill } = require('process');
const { checkIfProcessIsRunning } = require('./spm-utils');

const spmInitializer = () => {
    // if both spmJs and its child are running then do not do anything.
    const jsonData = JSON.parse(fs.readFileSync('spm.json', 'utf8'));

    // console.log(checkIfProcessIsRunning(jsonData.pid.spmJs), checkIfProcessIsRunning(jsonData.pid.child));
    if (checkIfProcessIsRunning(jsonData.pid.spmJs) && checkIfProcessIsRunning(jsonData.pid.child)) {
        console.log('SPM: Both processes are running well already');
        return; // Stop the function here.
    } else {
        // This runs when only one process (of the two process ids) mentioned in spm.json file is running,
        // so we do a cleanup by killing that one process so that we start only fresh processes only
        if (checkIfProcessIsRunning(jsonData.pid.spmJs)) { kill(jsonData.pid.spmJs); }
        if (checkIfProcessIsRunning(jsonData.pid.child)) { kill(jsonData.pid.child); }

        const commandSpm = 'node spm.js';
        const child = spawn('sh', ['-c', commandSpm], {
            cwd: __dirname,
            detached: true, // Run independently in detached state
            // ! Note: You must use below `stdio: "ignore"` otherwise your detached child will be killed by playwright cli when the test are finished (irrespective if you use `nodemon` or not). Also if you are directly running `node spm-initializer.js` for standalone testing the `spm.js` will stop working as soon as you close/kill the terminal (`exit` command).
            stdio: "ignore", // Ignore child’s stdio
            //  Enable below limne for debugging for debugging only for e.g., when there is error in json syntax in the `spm.json` file, checking logs of spm.js file, etc.
            // stdio: "inherit", // Inherit child’s stdio (
        });
        child.unref(); // Ensure the child is fully detached

        // This `spm-initializer.js` process is terminated asap & you can verify via
        // `ps aux | grep [1]234`   (where 1234 is the below process id)
        console.log('process id of spm-initializer.js', process.pid);
    }
};

// I use below line test spm  and // * if you want to use spm in some other project please simply copy these 3 files then export the above `spmInitializer` function and call it where you need it to run.
spmInitializer();
