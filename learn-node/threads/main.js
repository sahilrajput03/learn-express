// & threads

// Docs - https://nodejs.org/docs/latest-v22.x/api/worker_threads.html
const { Worker } = require('worker_threads');

const data = [1, 2, 3, 4, 5]; // Data to share

const worker = new Worker('./worker.js');

// Send data to the worker
console.log('|MAIN THREAD| Sending data to worker via `worker.postMessage(data)`');
worker.postMessage(data);

// Listen for results from the worker
worker.on('message', (result) => {
    console.log('|MAIN THREAD| Processed data:', result);
});

// Handle errors
worker.on('error', (err) => {
    console.error('Worker error:', err.message);
});

// Handle worker exit
worker.on('exit', (code) => {
    console.log(`Worker exited with code ${code}`);
});
