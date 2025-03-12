# Learn node

**Quick Links:**

- ❤️ Learn Process Management in Nodejs: [Click here](./process-management/README.md)
  - Tags: `fork`, `spawn`, `exec`, `spawn`, kill-switch (switch process manager), `ipc`.

# Nodejs Features

```bash
node --watch a.js
# watch a script (without using nodemon) ❤️

node -p "3+3"
# OUTPUT: 6

node -p "console.log('hello')"
# OUTPUT:
# hello
# undefined

node -p process.env
// OUTPUT: (prints environment variables)

### TESTING - Add below code to a.js
import assert from "assert";
import test from "node:test";
test('car', () => { assert(1 === 1); });

# Run test
node --test a.js

# Run test in watch mode
node --test --watch a.js
```

# `n` (package), Native Test Runner, Watch mode

- `n` – Interactively Manage Your Node.js Versions - [https://www.npmjs.com/package/n](https://www.npmjs.com/package/n)
- Node.js introduced watch mode (`--watch`) in Node.js v18, which is an LTS (Long-Term Support) version.
- Test Runner natively in nodejs - [https://nodejs.org/docs/latest-v22.x/api/test.html](https://nodejs.org/docs/latest-v22.x/api/test.html)
(was officially released stable in node18)
- Medium Article - [Click here](https://threkk.medium.com/i-tested-the-node-js-test-runner-so-you-dont-have-to-958b11db46ef)
- Article - [Click here](https://nodesource.com/blog/11-features-nodeJS-18-to-try)
- A gist by a developer - Node.js 18 Test Runner - [Click here](https://gist.github.com/subfuzion/11013a8435c9de5302430fd44c3f76a7#6-running-a-subset-of-tests)
- Youtube - Testing Libraries: Testing: Mocha, Totally Tooling Tips (S3, E11): [Click here](https://www.youtube.com/watch?v=L48AjLVgXS4)
- Nodesource:
  - [https://nodesource.com/products/nsolid](https://nodesource.com/products/nsolid )
  - [https://nodesource.com/about](https://nodesource.com/about)


# When was node multi threading introduced? (ChatGPT)

Node.js introduced experimental multi-threading support with worker threads in version 10.5.0 (released in 2018). **Later, it became stable in Node.js 12 (released in 2019).**

Before this, Node.js was primarily single-threaded due to its event-driven, non-blocking architecture. However, worker threads allow running JavaScript code in multiple threads, making it possible to handle CPU-intensive tasks more efficiently.

# Is unix socket same as nodejs sockets? Be concise. (ChatGPT)

No, Unix sockets and Node.js sockets are different.

- Unix Sockets: These are inter-process communication (IPC) endpoints used for fast data exchange between processes on the same machine. They operate at the OS level.
- Node.js Sockets: Typically refer to WebSockets (ws module) or TCP sockets (net module) in Node.js, used for real-time communication over networks, including the internet.

However, Node.js can use Unix sockets via the net module for IPC.

## Difference between sockets vs. web sockets. Be concise. (ChatGPT)

- Sockets: General term for endpoints in network communication. Used in TCP/UDP for data exchange between systems.
- WebSockets: A protocol over TCP that enables full-duplex, real-time communication between a client (browser) and a server, commonly used for web apps.

WebSockets are a specialized type of socket optimized for persistent, low-latency communication in web applications.
