const { parentPort, } = require('node:worker_threads');

// Listen for messages from the main thread
parentPort.on('message', (data) => {
    console.log('|WORKER THREAD| Received message');

    const result = data.map(x => x * 2); // Example: Process the data
    parentPort.postMessage(result);     // Send result back to main thread
});

parentPort.on('message', (data) => {
    // throw new Error('shit-happens-for-real!'); // triggers 'error' event in main thread
});

setTimeout(() => {
    // The worker must be manually terminated to trigger the 'exit' event in main thread
    process.exit(0);
}, 2_000)

