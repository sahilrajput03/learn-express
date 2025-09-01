# Learn node

**Quick Links:**

- ❤️ Learn Process Management in Nodejs: [Click here](./process-management/README.md)
  - Tags: `fork`, `spawn`, `exec`, `spawn`, kill-switch (switch process manager), `ipc`.
- Reading input from STDIN in Nodejs: [Click here](./read-input-from-stdin)

## What are `optionalDependencies` in `package.json` (#npm)?

Optional dependencies are not critical for your package to work — if they fail to install (e.g., due to OS incompatibility), the installation will continue without them. ([ChatGPT](https://chatgpt.com/c/68078ac5-a998-8007-b64e-d9651932e858))

There are situations when a certain dependency is not installable on your os type and is made to be installed on another system like "android". For e.g. if you try to install `lightningcss.android-arm64.node` on macos it'll throw error as shown below because its a dependency for "android" os as we can read from the logs too.

```bash
npm install lightningcss.android-arm64.node
# OUTPUT:
# npm error code EBADPLATFORM
# npm error notsup Unsupported platform for lightningcss.android-arm64.node@1.29.3-alpha.2: wanted {"os":"android","cpu":"arm64"} (current: {"os":"darwin","cpu":"x64"})
# npm error notsup Valid os:   android
# npm error notsup Actual os:  darwin
# npm error notsup Valid cpu:  arm64
# npm error notsup Actual cpu: x64
# npm error A complete log of this run can be found in: /Users/apple/.npm/_logs/2025-04-22T14_25_45_881Z-debug-0.log
```

So here we can install this dependecy as optional dependency instead like that - `npm install lightningcss.android-arm64.node --save-optional`. This is a solution when I needed this dependency to work with tailwind v4 release in my latest `learn-svelte/new-ai-sdk` project. ([source of info](https://github.com/tailwindlabs/tailwindcss/discussions/15999#discussioncomment-12909555)).

# Nodejs Features

**Watch a script, without using nodemon❤️:**

```bash
node --watch a.js
```

**Testing:**

```
# FILE: a.js
// * For ES module
// import assert from "assert";
// import test from "node:test";
// * For commonjs
const test = require('node:test');
const assert = require('assert');
test('car', () => { assert(1 === 1); });

# Run test once
node --test a.js

# Run test in watch mode
node --watch a.js
```

**Evaluate expression:**

```
node -p "3+3"
# OUTPUT: 6

node -p "console.log('hello')"
# OUTPUT:
# hello
# undefined

node -p process.env
// OUTPUT: (prints environment variables)
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
  - [https://nodesource.com/products/nsolid](https://nodesource.com/products/nsolid)
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
