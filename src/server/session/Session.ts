import { Socket } from "socket.io";
import { v4 } from "uuid";
import { Game } from "../game/Game";
import { ISubject } from "../questions/IQuestions";

export class Session {
  socket: Socket;
  game: Game | null;
  constructor(socket: Socket) {
    this.socket = socket;
    this.game = null;
    this.createListeners();
  }

  createListeners() {
    const socket = this.socket;
    socket.on("newgame", (payload: ISubject[]) => {
      this.game = new Game(payload);
      socket.emit("redirect-playpage");
    });
  }

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuid-change", uuid);
  }
}
