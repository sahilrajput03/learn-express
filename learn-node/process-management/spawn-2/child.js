process.on('message', (msg) => {
    console.log('Message from parent:', msg);
    process.send({ received: true });
});

// throw new Error('booomm'); // to verify child's error are printed in logs of parent.js because 'inherit' to parent's process.