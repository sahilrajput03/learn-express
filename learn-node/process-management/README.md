# Learn Process Management in Nodejs

Other way to communicate is to have http server on both processes and communicate over http requests and sockets. Check with chatGPT about that to get related examples.

❤️❤️ Demonstration video of this folder @ youtube by me: [Click here](https://www.youtube.com/watch?v=epbrENZ_bJs&t=80s)

# Prefer passing sync funciton instead of an async callback function to `process.on('SIGING', () => {..})`

Refer this file for more context: [sahilrajput03/android-loop/utils/mongodb.ts](https://github.com/sahilrajput03/android-loop/blob/main/utils/mongodb.ts)

# Why two examples of `spawn` and `spawn2`

- In `spawn`: I am piping stdin, stdout & stderr of child to parent process.
- In `spawn-2`: I am inheriting stdout & stderr of child to parent process. This means logs are printed directly to stdout/stderr of parent process. **This is not a good option because we cannot distinguish the logs/errors of child process from parent parent process.**

# `fork` vs `spawn`

<img src="https://github.com/user-attachments/assets/6faf7df6-e285-4475-ba28-4115283cfb36" alt="drawing" width="700"/>

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

# `worker_threads` (threads/multi threading)

Official multi threading example from https://nodejs.org/en

```js
// threads.mjs
import {
  Worker,
  isMainThread,
  workerData,
  parentPort,
} from "node:worker_threads";
if (isMainThread) {
  const data = "some data";
  const worker = new Worker(import.meta.filename, { workerData: data });
  worker.on("message", (msg) => console.log("Reply from Thread:", msg));
} else {
  const source = workerData;
  parentPort.postMessage(btoa(source.toUpperCase()));
}
// run with `node threads.mjs`
```

# What is difference between fork, spawn and worker_thread in nodejs. Be concise.

Here’s a concise comparison of fork, spawn, and worker_thread in Node.js:

1. spawn

- Purpose: Executes external commands or scripts (not limited to Node.js).
- IPC: Optional; needs to be enabled explicitly.
- Use Case: Running shell commands, external binaries.
- Example: spawn('ls', ['-lh']).

2. fork

- Purpose: Creates a new Node.js process to execute a module.
- IPC: Enabled by default for communication between parent and child.
- Use Case: Running separate Node.js scripts or modules.
- Example: fork('child.js').

3. worker_thread

- Purpose: Creates a thread within the same process for parallel tasks.
- IPC: Built-in via MessagePort for thread communication.
- Use Case: CPU-intensive tasks, avoiding blocking the event loop.
- Example: new Worker('worker.js').

Key Differences:

| Feature      | spawn            | fork              | worker_thread          |
| ------------ | ---------------- | ----------------- | ---------------------- |
| Process Type | External process | Node.js process   | Thread in same process |
| IPC Support  | Optional         | Default           | Built-in               |
| Performance  | Higher overhead  | Moderate overhead | Lower overhead         |
| Use Cases    | Shell commands   | Node.js scripts   | CPU-bound tasks        |

# In nodejs, when we fork child process and consider we get run time error in parent process --- would the child processes be exited as well? (ChatGPT)

By default:

- Child processes do not exit automatically when the parent process crashes or encounters a runtime error.
- You need to explicitly manage the lifecycle of child processes to ensure they are terminated when appropriate. This can be done using signals, .kill(), or other cleanup mechanisms in the parent process.

## Using `execSync`

*(Used in github repo - `android-loop/utils/tts-gtts.ts` recently on 3 April 2025)*

```js
const { execSync } = require('child_process');

try {
  // Execute a shell command and get the output
  const output = execSync('ls -la');
  console.log(output.toString());
} catch (error) {
  console.error('Error executing command:', error);
}
```

## Running `spawn` in a synchronous manner

Refer Github Repo (file): `android-loop/utils/playSpeechFile.ts`

## `execSync` vs. `spawn` in nodejs (ChatGPT)

In Node.js, `execSync` and spawn are used to execute shell commands but differ in key aspects:

1. `execSync` (from child_process):

- Runs synchronously (blocking).
- Returns the command output as a Buffer/String.
- Suitable for short, simple commands.

Example:

```js
const { execSync } = require('child_process');
const output = execSync('ls').toString();
console.log(output);
```

2. `spawn`:

- Runs asynchronously (non-blocking).
- Returns a stream, useful for handling large output.
- Preferred for long-running processes.

Example:

```js
const { spawn } = require('child_process');
const ls = spawn('ls');

ls.stdout.on('data', (data) => console.log(data.toString()));
```

Use `execSync` when you need immediate results and spawn for better performance with large data. 🚀
