process.on('message', (message) => {
    console.log('|CHILD|', 'Received from parent:', message);
    process.send({ status: 'Success' });
});