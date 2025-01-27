const { fork } = require('child_process');

const child = fork('child.js');
child.send({ value: 42 });

child.on('message', (message) => {
    console.log('|PARENT|', 'Received from child:', message);
});

// Kill child processes (to prevent orphan processes) in case of normal exit via `process.exit()` of this process *OR* run time exception of this process.
process.on('exit', () => {
    console.log('\nParent is exiting. Terminating child process...\n');
    child.kill(); // Ensure the child process is killed
});

// * Testing killing of child in case of normal exit or run time exception when child is eternally running script
// setTimeout(() => {
//     process.exit(0);
// }, 10_000);

setTimeout(() => {
    throw new Error('heyyyy');
}, 3_000);