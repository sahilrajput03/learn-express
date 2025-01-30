const psList = require('ps-list').default;

async function main() {
    const processes = await psList();
    console.log(processes.filter(p => p.name.includes('tsc')));
    /**
    [  
        {
            pid: 96676,
            name: 'npm exec tsc --watch',
            cmd: 'npm exec tsc --watch',
            ppid: 96646,
            uid: 501,
            cpu: 0,
            memory: 0.2
        }
    ]
     */

    console.log(processes.filter(p => p.cmd.includes('spm.js')));
    /**
        [
            {
                pid: 96646,
                name: 'node',
                cmd: 'node spm.js',
                ppid: 1,
                uid: 501,
                cpu: 0,
                memory: 0.2
            }
        ]
     */
}

main();
