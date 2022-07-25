import { Socket } from "socket.io";

function useEvents(socket: Socket) {
  //login
  if (!socket) return;
  socket.on("connect", () => {
    console.log("connected!");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("uuid-change", (uuid) => {
    console.log("uuid-change", uuid);
    localStorage.setItem("uuid", uuid);
  });
}
