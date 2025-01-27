# learn node

Other way to communicate is to have http server on both processes and communicate over http requests. Check with chatGPT to get example.

❤️❤️ Demonstration video of this folder @ youtube by me: [Click here](https://www.youtube.com/watch?v=epbrENZ_bJs&t=80s)

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
