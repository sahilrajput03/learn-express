const { spawn } = require('child_process');

const spmInitializer = () => {
    const command = 'node spm.js';
    const child = spawn('sh', ['-c', command], {
        cwd: __dirname,
        detached: true, // Run independently in detached state
        // * Note: You must use below `stdio: "ignore"` otherwise your detached child will be killed as soon as you exit the terminal from which you ran this file.
        stdio: "ignore", // Ignore child’s stdio
        //  Enable below limne for debugging for debugging only for e.g., when there is error in json syntax in the `spm.json` file, checking logs of spm.js file, etc.
        // stdio: "inherit", // Inherit child’s stdio (
    });
    child.unref(); // Ensure the child is fully detached

    // This `main.js` process is terminated asap & you can verify via
    // `ps aux | grep [1]234`   (where 1234 is the below process id)
    console.log('process id of main.js', process.pid);
};

// I use below line test spm  and // * if you want to use spm in some other project please simply copy these 3 files then export the above `spmInitializer` function and call it where you need it to run.
spmInitializer();