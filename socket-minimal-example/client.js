// client.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:49152"); // Connect to the server

socket.on("connect", () => {
    console.log("Connected to server as", socket.id);

    // Send a message every 2 seconds
    setInterval(() => {
        socket.emit("message", "Hello from client!");
    }, 2000);
});

socket.on("message", (data) => {
    console.log("Server response:", data);
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
