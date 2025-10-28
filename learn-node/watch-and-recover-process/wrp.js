// @ts-nocheck
//      and also link code of this in "LEARN EXPRESS" google document.
const { spawn } = require('child_process');
const fs = require('fs');

// Inspiration: https://chatgpt.com/c/6900c7c1-a108-8321-ae56-981d9bd2916c
// Note: 1. All processes spawned are automatically killed when you press ctrl+c there are no orphan processes. [TESTED]
// Note: 2. To know which processes are running currently you can run `pgrep -f b-app.js` from another terminal.
// Note: This app does two things - (1) restart app when there are file changes and (2) restart when app crashes with non-zero exit code.
const APP_FILE = 'b-app.js'; // your main app file
let proc = null;
function isProcRunning() { return proc.exitCode === null; };
let isRestartingAppForFileChange = false;
let isRecoveringProc = false;

if (0 /* Use 1=enable and 0=disable debug logs*/) { console.debug = (...arguments) => { console.log("\t🛑(debug)", ...arguments); }; } else { console.debug = () => { }; }
if (1 /* Use 1=enable and 0=disable warn logs*/) { console.warn = (...arguments) => { console.log("\t🟢(warn) ", ...arguments); }; } else { console.debug = () => { }; }

// To be able remove this exit listeners on restart logics we must have a reference to this function
function launchProcOnExit(exitCode) {
    if (exitCode !== 0) {
        console.warn(`⚠️ App crashed with code ${exitCode}. Restarting in 2s... 🚀`);
        // We delay restart to prevent crash loops and allow the OS to clean up memory, file handles, or ports.
        isRecoveringProc = true;
        setTimeout(() => { start(); isRecoveringProc = false; }, 2_000);
    } else { console.debug('App exited gracefully (exitCode=0). ✅'); }
}

function start() {
    proc = spawn('node', [APP_FILE], { stdio: 'inherit' });
    proc.on('exit', launchProcOnExit);
}
// Start the app initially
start();

// Watch files changes
let timeout;
fs.watch('.', { recursive: true }, (eventType, filename) => {
    if (filename.startsWith('.git/')) { return; } // ignore file saves in .git folder
    if (filename.startsWith('node_modules/')) { return; } // ignore file saves in node_modules folder
    // Learn: This ensures only one callback fires for rapid
    //        successive events. This is necessary because when any file is
    //        changed multiple events are fired on windows and macos i.e,
    //        'change' and 'rename'.
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // console.log(`File changed: ${filename}`);
        // App restart logic
        restartAppOnFileChange(`file change: ${filename}`);
    }, 100); // wait 100ms to avoid duplicate triggers
});

function restartAppOnFileChange(reason) {
    if (isRecoveringProc) { return console.debug('✅Cancelled restarting proc becoz recovering previous proc is in progres already.'); }
    isRestartingAppForFileChange = true;
    console.debug("function - restartApp(..): 🚀 ~ reason:", reason);
    if (proc) {
        console.warn(`🔄 Restarting app due to ${reason}...`);
        if (isProcRunning()) {
            // Does not throw error when process was not running already [TESTED]
            proc?.kill();
            console.debug('proc KILLED 💥', proc.pid);
        }
        // Remove earlier 'exit' listener to prevent its own app start logic
        proc.off('exit', launchProcOnExit);
        start();
    } else {
        // For debugging only
        if (!proc) console.debug('proc is null.');
        if (!isProcRunning()) console.debug('proc is *NOT* running.');
    }
    isRestartingAppForFileChange = false;
}