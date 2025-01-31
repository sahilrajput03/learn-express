// spm - Switch Process Manager
const { spawn } = require('child_process');
const { log } = require('console');
const fs = require('fs');
const { getHumanReadableTimestamp } = require('./spm-utils');

const command = 'npx tsc --watch'; // Also: build doesn't exists --- a fresh build is created automatically.
const cwd = '/Users/apple/Documents/test/qr-solution/qr-solution-backend';
const child = spawn('sh', ['-c', command], {
    cwd,
});
const filePath = '../spm.json';

console.log('\n');

const syncSwitchProcessJsonFile = () => {
    try {
        console.log('process.id, child.id', process.pid, child.pid);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let shouldExit = jsonData.killNow === 1;

        if (shouldExit) {
            log('should kill noww!!');
            jsonData.killNow = 0;
            jsonData.pid = { spmJs: null, child: null };
            jsonData.lastCheckTime = null;
        } else {
            jsonData.pid = { spmJs: process.pid, child: child.pid };
            jsonData.lastCheckTime = getHumanReadableTimestamp();
        }

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
        if (shouldExit) {
            child.kill(); // npx tsc --watch
            process.exit(0); // spm.js
        }
    } catch (error) { console.error('Error reading file:', error); }
};

// run on launch
syncSwitchProcessJsonFile();

// poll = 3 seconds
setInterval(syncSwitchProcessJsonFile, 2_000);
