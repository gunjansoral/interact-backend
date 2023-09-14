const roomMessages = {}; // Store room messages

exports.socketControllers = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      // Join the specified room
      socket.join(roomId);
      console.log('Room joined:', roomId);

      // Store the room information for this user
      userRooms[socket.id] = roomId;

      // Send past messages for the room if available
      if (roomMessages[roomId]) {
        socket.emit('pastMessages', roomMessages[roomId]);
      }
    });

    socket.on('sendMessage', ({ sender, room, message }) => {
      // Send the message to the specified room
      io.to(room).emit('receiveMessage', { sender, room, message });

      // Store the message in roomMessages
      if (!roomMessages[room]) {
        roomMessages[room] = [];
      }
      roomMessages[room].push(`${sender}: ${message}`);
      console.log(roomMessages[room]);
    });

    socket.on('disconnect', () => {
      const userId = Object.keys(onlineUsers).find((key) => onlineUsers[key] === socket.id);
      if (userId) {
        delete onlineUsers[userId];

        // Leave the room the user was in
        const room = userRooms[socket.id];
        if (room) {
          socket.leave(room);
          delete userRooms[socket.id];
        }

        console.log(`User ${userId} disconnected.`);
      }
    });
  });
}
