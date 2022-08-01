import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import SocketContext from "./context";

const socket: Socket = io(process.env.NODE_ENV !== "production" ? ":3001" : "");

export default function Provider({ children }: { children: JSX.Element }) {
  useEffect(() => {
    //Global events
    socket?.on("connect", () => console.log("conectado", socket));
    socket?.on("disconnect", () => console.log("desconectado"));

    socket?.on("uuidChange", (uuid) => {
      console.log("uuid-change", uuid);
      localStorage.setItem("uuid", uuid);
    });

    return () => {
      socket?.off();
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
