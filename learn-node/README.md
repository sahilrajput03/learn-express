# Readme

Other way to communicate is to have http server on both processes and communicate over http requests. Check with chatGPT to get example.

# `fork` vs `spawn`

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
