const { io } = require("./http-server");
const clr = require("../console-color");

const NEW_CHAT_MESSAGE = "newChatMessage";
const users = [];

io.on("connection", (socket) => {
  console.log(`${clr.fg.magenta}WS: 🚩 Socket.io is connected`);
  socket.on("selected_room", (data) => {
    console.log(
      `${clr.fg.cyan}WS: '${data.user}' join the room '${data.room}'`
    );

    socket.join(data.room);
    const userInRoom = users.find((user) => {
      user.username === data.username && user.room === data.room;
    });

    userInRoom
      ? (userInRoom.socket_id = socket.id)
      : users.push({
          room: data.room,
          username: data.username,
          socket_id: socket.id,
        });
  });

  socket.on(NEW_CHAT_MESSAGE, (data) => {
    console.log(`${clr.fg.cyan}WS: '${data.room}' receive a new message`);
    io.in(data.room).emit(NEW_CHAT_MESSAGE, data);
  });

  socket.on("disconnect", () => {
    socket.leave();
    console.log(`${clr.fg.yellow}WS: ❌ Socket.io is disconnected`);
  });
});
