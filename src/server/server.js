const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4 } = require("uuid");

const port = process.env.PORT || 3000;
app.use(express.static("dist"));

io.on("connection", (socket) => {
  console.log("someone connected");
  socket.emit("hello from the ws server!");

  socket.on("play", (payload) => {
    console.log("play", payload);
    if (!payload.uuid) {
      const uuid = v4();
      socket.emit("uuid-change", uuid);
    }
  });

  socket.on("ping", () => {
    console.log("received ping");
    socket.emit("pong");
  });
});

server.listen(port);
console.log(`Server running on port ${port}`);
