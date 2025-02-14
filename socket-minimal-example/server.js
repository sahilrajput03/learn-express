// server.js
const port = 49152;
const io = require("socket.io")(port, {
    cors: { origin: "*" }, // Allow all origins
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Received:", data);
        socket.emit("message", `Echo: ${data}`); // Send a response
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

console.log(`Socket.IO server running on port ${port}`);