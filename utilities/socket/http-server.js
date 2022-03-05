const clr = require("../console-color");
const express = require("express");
const http = require("http");

const PORT = 4000;
const NEW_CHAT_MESSAGE = "newChatMessage";

const serverHttp = http.createServer(express());

const io = require("socket.io")(serverHttp, {
  // cors: {
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST"],
  // },
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

serverHttp.listen(PORT, () => {
  console.log(`${clr.fg.magenta}WS: 👋 Listening on port ${PORT}`);
});

module.exports = { io, PORT, NEW_CHAT_MESSAGE };
