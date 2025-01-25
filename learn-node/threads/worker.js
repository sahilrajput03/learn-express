const { parentPort } = require('worker_threads');

// Listen for messages from the main thread
parentPort.on('message', (data) => {
    console.log('|WORKER THREAD| Received message');

    const result = data.map(x => x * 2); // Example: Process the data
    parentPort.postMessage(result);     // Send result back to main thread
});

parentPort.on('message', (data) => {
    throw new Error('shit-happens-for-real!');
});
