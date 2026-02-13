import { spawn, spawnSync } from 'node:child_process';

// Learn: Both of below commands fails becuase node literaly tries to run
//          program named `ls -la` & `ls -la | grep txt`.
// spawn("ls -la", { shell: false }); // ❌ `Error: spawn ls -la ENOENT`
// spawn("ls -la | grep txt", { shell: false }); // ❌ `Error: spawn ls -la | grep txt ENOENT`
// spawn("ls -la | grep txt", { shell: true }); // ✅ Works


//⭐️ What does `shell: true` do:
//  1. Enables us to do pipes, redirects, chaining.
//  2. spawn('ls -la', { shell: true }), Node internally does something like:
//      a.) For Linux/macOS: /bin/sh -c "ls -la"
//      b.) For Windows: cmd.exe /d /s /c "ls -la"
