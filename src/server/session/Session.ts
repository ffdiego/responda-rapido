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
      console.log(socket.id, "play-enterpage");
      if (!this.game) {
        socket.emit("redirect-dash");
      } else {
        socket.emit("play-showloading", "Carregando perguntas...");
        console.log("Preparing questions!");
        await this.game.prepareQuestions();
        console.log("inviting players!");
        socket.emit("play-showpressstart");
        //this.game.start();
      }
    });
    socket.on("play-startgame", () => {
      console.log(socket.id, "-- Started the game --");
      if (!this.game) {
        socket.emit("redirect-dash");
      } else {
        this.start();
      }
    });
  }

  start() {}

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuid-change", uuid);
  }
}
