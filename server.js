const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { socketControllers } = require('./controllers/socket.controller'); // Import socket controllers

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

app.use(express.json());
app.use(cors()); // Add CORS middleware to allow cross-origin requests

const { PORT, DB_URL } = process.env;

// Connect to your database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected'))
  .catch(error => console.error('DB connection error:', error)); // Handle database connection errors

//socket controllers
socketControllers(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
