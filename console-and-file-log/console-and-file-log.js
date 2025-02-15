const fs = require('fs');
const path = require('path');

// Save the original write functions
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

// Create file streams for stdout and stderr
const stdoutFile = fs.createWriteStream(path.join('.ignored', 'stdout.log'), { flags: 'a' });
const stderrFile = fs.createWriteStream(path.join('.ignored', 'stderr.log'), { flags: 'a' });
const stdoutStderrFile = fs.createWriteStream(path.join('.ignored', 'stdout_stderr.log'), { flags: 'a' });

// Override process.stdout.write
process.stdout.write = (chunk, encoding, callback) => {
    stdoutFile.write(chunk, encoding);
    stdoutStderrFile.write(chunk, encoding);
    originalStdoutWrite(chunk, encoding, callback);
    return true;
};

// Override process.stderr.write
process.stderr.write = (chunk, encoding, callback) => {
    stderrFile.write(chunk, encoding);
    stdoutStderrFile.write(chunk, encoding);
    originalStderrWrite(chunk, encoding, callback);
    return true;
};

