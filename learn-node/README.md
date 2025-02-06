# Learn node

**Quick Links:**

- ❤️ Learn Process Management in Nodejs: [Click here](./process-management/README.md)
  - Tags: `fork`, `spawn`, `exec`, `spawn`, kill-switch (switch process manager), `ipc`.

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







