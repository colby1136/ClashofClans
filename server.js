const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (including HTML, CSS, JS, etc.)
app.use(express.static('public'));

// Define the route to serve colby.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/colby.html'); // Serve colby.html
});

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all clients
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
