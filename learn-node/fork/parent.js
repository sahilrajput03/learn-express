// & child process

const { fork } = require('child_process');

const child = fork('child.js');
child.send({ value: 42 });

child.on('message', (message) => {
    console.log('|PARENT|', 'Received from child:', message);
});