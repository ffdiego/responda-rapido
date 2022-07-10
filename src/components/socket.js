import io from "socket.io-client";

const production = process.env.NODE_ENV === "production";

let address = "";
if (!production) {
  address = ":3001";
}
export const socket = io(address);
