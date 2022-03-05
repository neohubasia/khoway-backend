const { io, NEW_CHAT_MESSAGE } = require("./http-server");

io.on("connection", (socket) => {
  console.log(`Room ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Room ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});
