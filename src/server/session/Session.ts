import { Socket } from "socket.io";
import { v4 } from "uuid";

export class Session {
  socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
  }

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuid-change", uuid);
  }
}
