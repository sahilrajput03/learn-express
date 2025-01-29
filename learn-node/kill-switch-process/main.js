const { spawn } = require('child_process');

const command = 'node spm.js';
const child = spawn('sh', ['-c', command], {
    cwd: __dirname,
    detached: true, // Run independently in detached state
    stdio: "ignore", // Ignore child’s stdio
    // stdio: "inherit", // Ignore child’s stdio (// ! Enable this for debugging for e.g, when there is error in json syntax)
});
child.unref(); // Ensure the child is fully detached

// This `main.js` process is terminated asap & you can verify via
// `ps aux | grep [1]234`   (where 1234 is the below process id)
console.log('process id of main.js', process.pid);