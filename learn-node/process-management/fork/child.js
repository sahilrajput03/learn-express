process.on('message', (data) => {
    console.log('|CHILD|', 'Received from parent:', data);
    process.send({ status: 'Success' });
    console.log('child.js PROCESS ID:', process.pid);
});

// setInterval(() => { }, 10000_000); // mimic eternally running server