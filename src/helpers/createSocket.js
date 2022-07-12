import { io } from "socket.io-client";

export default function CreateSocket() {
  const production = process.env.NODE_ENV === "production";

  let address = "";
  if (!production) {
    address = ":3001";
  }

  const socket = io(address);

  return socket;
}
