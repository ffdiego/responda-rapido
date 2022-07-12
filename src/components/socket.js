import io from "socket.io-client";
import { createContext } from "react";

const production = process.env.NODE_ENV === "production";

let address = "";
if (!production) {
  address = ":3001";
}

const socket = io(address);
export default socketContext = createContext(socket);
