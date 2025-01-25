# Readme

Other way to communicate is to have http server on both processes and communicate over http requests. Check with chatGPT to get example.

# What is difference between fork and spawn in nodejs? Be concise. (ChatGPT)

In Node.js, fork and spawn are used to create child processes, but they serve different purposes:

**spawn:**

- Creates a new child process to execute a command or script.
- No communication channel (IPC) is set up by default.
- Used for executing external commands or non-Node.js scripts.
- Example: child_process.spawn('ls', ['-lh']).

**fork:**

- Specifically creates a new child process that runs a Node.js script/module.
- Automatically sets up an IPC (Inter-Process Communication) channel for communication.
- Used for creating child processes for Node.js code.
- Example: child_process.fork('childScript.js').

**Key Difference:**

fork is tailored for Node.js modules with IPC, while spawn is for general command execution without default IPC.

## Manually enable ipc in `spawn` (ChatGPT)

Check `spawn` folder in this repo.
