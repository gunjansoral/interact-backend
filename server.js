const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

const { PORT, DB_URL } = process.env;

// Connect to your MongoDB database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected'));
// ... other Express app setup ...

// Socket.io setup and logic go here

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});