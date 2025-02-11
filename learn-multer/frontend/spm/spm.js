// spm - Switch Process Manager
// Check playground for spm @ learn-express/learn-node/kill-switch-process

import { spawn } from 'node:child_process';
import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getHumanReadableTimestamp } from './spm-utils.js';


const __dirname = dirname(fileURLToPath(import.meta.url));
const targetFolderPath = path.join(__dirname, '..', '..', 'backend'); // !!!!!!

const command = 'npx tsc --watch'; // Also: build doesn't exists --- a fresh build is created automatically.
const child = spawn('sh', ['-c', command], {
    cwd: targetFolderPath,
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
