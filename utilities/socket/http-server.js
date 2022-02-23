const express = require("express");
const http = require("http");
const clr = require("../console-color");

const serverHttp = http.createServer(express());

const io = require("socket.io")(serverHttp, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

serverHttp.listen(4000, () => {
  console.log(`${clr.fg.magenta}WS: 👋 Listening on port 4000`);
});

module.exports = { io };
