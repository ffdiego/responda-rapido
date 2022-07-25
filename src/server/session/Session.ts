import { Socket } from "socket.io";
import { v4 } from "uuid";
import { MongoDatabase } from "../database/MongoDatabase";
import { Game } from "../game/Game";
import { ISubject } from "../questions/IQuestions";

export class Session {
  socket: Socket;
  database: MongoDatabase;
  game: Game | null;

  constructor(socket: Socket, database: MongoDatabase) {
    this.socket = socket;
    this.game = null;
    this.database = database;
    this.createListeners();
  }

  createListeners() {
    const socket = this.socket;
    socket.on("newgame", (payload: ISubject[]) => {
      console.log(socket.id, "newgame", payload);
      this.game = new Game(payload, this.database, this.socket);
      socket.emit("redirect-play");
    });

    socket.on("play", async () => {
      console.log(socket.id, "play");
      if (!this.game) {
        socket.emit("redirect-dash");
      } else {
        socket.emit("play-showloading", "Carregando perguntas...");
        await this.game.prepareQuestions();
        socket.emit("play-showpressstart");
        //this.game.start();
      }
    });
  }

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuid-change", uuid);
  }
}
