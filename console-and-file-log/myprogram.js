require('./console-and-file-log');

// Example usage
setInterval(() => {
    console.log('This is standard output @', new Date().toUTCString());   // Will be written to stdout.log
    console.error('This is an error message @', new Date().toUTCString()); // Will be written to stderr.log
}, 1_000);