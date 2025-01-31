// 17:40:43 - 29 January 2025
function getHumanReadableTimestamp() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    // Sample output: "17:40:43 - 29 January 2025"
    return `${hours}:${minutes}:${seconds} - ${day} ${month} ${year}`;
};

function checkIfProcessIsRunning(pid) {
    if (!pid) { return false; } // return `false` if pid is `falsy` value.
    const throwError = () => { throw 'Failed to check process is running or not.'; };
    try {
        process.kill(pid, 0); // Sending signal 0 does not kill the process, just checks if it exists
        // console.log(`Process ${pid} is running.`);
        return true;
    } catch (err) {
        if (err.code === 'ESRCH') {
            // console.log(`Process ${pid} is NOT running.`);
            return false;
        } else if (err.code === 'EPERM') {
            console.log(`Process ${pid} exists but you don't have permission to check it.`);
            throwError();
        } else {
            console.error(`Error checking process ${pid}:`, err);
            throwError();
        }
    }
}

module.exports = { getHumanReadableTimestamp, checkIfProcessIsRunning };
