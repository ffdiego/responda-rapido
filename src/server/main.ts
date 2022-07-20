import express from "express";
import path from "path";
import http from "http";
import socketio from "socket.io";
import { v4 } from "uuid";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const production = process.env.NODE_ENV === "production";

let io: socketio.Server;

if (production) {
  io = new socketio.Server(server);

  // serve the static files on "dist" folder
  app.use(express.static("dist"));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "dist/index.html"))
  );

  server.listen(port);
} else {
  // in development mode, vite takes up the port 3000,
  //so we need to use another port and enable cors.
  io = new socketio.Server({ cors: { origin: "*" } });
  io.listen(3001);
  console.log("listening on port 3001");
}

io.on("connection", (socket) => {
  console.log("[CON]", socket.id);
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
