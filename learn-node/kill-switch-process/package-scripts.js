// * In your .zshrc (.bashrc) you can add --- alias nps='npx nps'
const npsUtils = require('nps-utils');
// awesome nps utils - https://www.npmjs.com/package/nps-utils

// --- TESTED IN MACOS ---

const listTscProcesses = `ps aux |grep "[t]sc --watch" | cat`; // (Note: `| cat` is necessary idk why?)
const listSpmJsProcesses = `ps aux |grep "[s]pm.js" | cat`;

module.exports = {
    scripts: {
        default: 'nps o',
        // dev: "nodemon spm-initializer.js",
        once: "node spm-initializer.js",
        // validate: npsUtils.concurrent.nps('build', 'test'), // to run commands concurrently
        // build: 'sleep 2 && echo build... && exit 1',
        // test: 'sleep 5 && echo test...',

        // Note to sahil: You can run below commands directly via:
        // `nps l`, `nps l.i`, `nps k`

        list: {
            default: "nps l.i",
            name: `echo "TSC:"; ${listTscProcesses} && echo "\nSPM.JS:"; ${listSpmJsProcesses}`,
            id: `echo "TSC:"; ${listTscProcesses} | awk '{print $2}' && echo "\nSPM.JS:"; ${listSpmJsProcesses} | awk '{print $2}'`,
        },
        kill: `${listTscProcesses} | awk '{print $2}' | xargs kill && ${listSpmJsProcesses} | awk '{print $2}' | xargs kill`,
    }
};