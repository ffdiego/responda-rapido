import io from "socket.io-client";

export const socket = io(":3001");

socket.on("connect", () => {
  console.log("conndected");
});
