import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SocketContext from "./context";

export default function Provider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const production = process.env.NODE_ENV === "production";

    let address = "";
    if (!production) {
      address = ":3001";
    }

    const newSocket = io(address);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    socket?.on("connect", () => console.log("conectado"));
    socket?.on("disconnect", () => console.log("desconectado"));

    socket?.on("uuid-change", (uuid) => {
      console.log("uuid-change", uuid);
      localStorage.setItem("uuid", uuid);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
