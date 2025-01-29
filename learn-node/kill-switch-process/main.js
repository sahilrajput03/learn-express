const { spawn } = require('child_process');

const command = 'node spm.js';
const child = spawn('sh', ['-c', command], {
    cwd: __dirname,
    detached: true, // Run independently
    stdio: "ignore", // Ignore parent’s stdio
    // stdio: "inherit", // Ignore parent’s stdio (// ! Enable this for debugging for e.g, when there is error in json syntax)
});
child.unref(); // Ensure the child is fully detached