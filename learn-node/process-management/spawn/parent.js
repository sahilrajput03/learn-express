const { spawn } = require('child_process');

// Spawn a child process with IPC enabled
const child = spawn('node', ['child.js'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // We enable IPC by adding 'ipc' in the `stdio` option
});

// Listen for messages from the child process
child.on('message', (data) => {
    console.log('Message from child:', data);
});

// Triggered if there is an error when spawning or initializing the child process
child.on('error', (err) => { console.error('|CHILD-FAILED-TO_SPAWN_PROCESS| Error:', err); });

// Send a message to the child process
child.send({ hello: 'world' });

// Handle stdout and stderr of child
child.stdout.on('data', (data) => { console.log('|CHILD-STDOUT|:', data.toString().trim()); });
child.stderr.on('data', (data) => { console.log('|CHILD-STDERR|:', data.toString().trim()); });

// Runs only when CHILD exits via `process.exit(exitCode?)` or any runtime exception in CHILD process
// Triggered when the child process terminates (regardless of success or failure).
child.on('exit', (code) => { console.log(`Child exited with code ${code}`); });

// Runs only when PARENT exits via `process.exit(exitCode?)` or any runtime exception in PARENT process
process.on('exit', () => {
    console.log('\nParent is exiting. Terminating child process...\n');
    child.kill(); // Kill child processes (to prevent orphan processes)
});

// process.exit();

// throw 'wild fire in parent process';

// * Testing killing of child in case of normal exit or run time exception when child is eternally running script
// setTimeout(() => {
//     process.exit(0);
// }, 10_000);

// setTimeout(() => {
//     throw new Error('heyyyy');
// }, 3_000);
