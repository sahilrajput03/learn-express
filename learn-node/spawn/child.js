process.on('message', (msg) => {
    console.log('Message from parent:', msg);
    process.send({ received: true });
});

// process.exit(0);

// setTimeout(() => {
//     throw "boom"; // to verify child's error are printed in logs of parent.js because 'inherit' to parent's process.
// }, 5_000);
