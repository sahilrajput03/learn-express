const { spawn } = require('child_process');

// Spawn a child process with IPC enabled
const child = spawn('node', ['child.js'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // We enable IPC by adding 'ipc' in the `stdio` option
});

// Listen for messages from the child process
child.on('message', (message) => {
    console.log('Message from child:', message);
});

// Send a message to the child process
child.send({ hello: 'world' });

// Handle stdout (real-time standard output)
child.stdout.on('data', (data) => {
    console.log('STDOUT from `child`:', data.toString());
});

// Handle child process events
child.on('error', (err) => {
    console.error('Error:', err);
});

child.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
});
