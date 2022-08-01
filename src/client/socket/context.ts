import { createContext } from "react";
import { Socket } from "socket.io-client";
import { InterServerEvents } from "../../server/events/IEvents";

const SocketContext = createContext<Socket<InterServerEvents> | null>(null);
export default SocketContext;
