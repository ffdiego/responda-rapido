import { useEffect } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const production = process.env.NODE_ENV === "production";

  let address = "";
  if (!production) {
    address = ":3001";
  }

  const socket = io(address);

  return socket;
}
