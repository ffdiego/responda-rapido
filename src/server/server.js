const { Server } = require("socket.io");
const { v4 } = require("uuid");

let port = 3001;

const io = new Server(port, { cors: { origin: "*" } });

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
});

console.log("listening on port", port);
