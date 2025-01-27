const { spawn } = require('child_process');

// In this example compare to `spawn` folder - I am mapping stdout and stderr of child process to parent process.

// Spawn a child process with IPC enabled
const stdinForChild = 'pipe';
const stdoutForChild = 'inherit';
const stderrForChild = 'inherit';
const child = spawn('node', ['child.js'], {
    stdio: [stdinForChild, stdoutForChild, stderrForChild, 'ipc'] // We enable IPC by adding 'ipc' in the `stdio` option
});

// Listen for messages from the child process
child.on('message', (message) => {
    console.log('Message from child:', message);
});

// Handle errors which occur in the child process, such as a failure to spawn or an error during its execution.
child.on('error', (err) => {
    console.error('|Child| Error:', err);
});

// Send a message to the child process
child.send({ hello: 'world' });

// Runs only when PARENT exits via `process.exit(exitCode?)` or any runtime exception in PARENT process
process.on('exit', () => {
    console.log('\nParent is exiting. Terminating child process...\n');
    child.kill(); // Kill child processes (to prevent orphan processes)
});

// * Testing killing of child in case of normal exit or run time exception when child is eternally running script
// setTimeout(() => {
//     process.exit(0);
// }, 10_000);

// setTimeout(() => {
//     throw new Error('heyyyy');
// }, 3_000);