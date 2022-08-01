import { Socket } from "socket.io";
import { v4 } from "uuid";
import { MongoDatabase } from "../database/MongoDatabase";
import { InterServerEvents } from "../events/IEvents";
import { Game } from "../game/Game";
import { ISubject } from "../questions/IQuestions";

export class Session {
  socket: Socket<InterServerEvents>;
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
    socket.on("newGame", (payload) => {
      this.game = new Game(payload, this.database, this.socket);
      socket.emit("redirect", "/play");
    });

    socket.on("playRequestQuestions", async () => {
      console.log(socket.id, "play-enterpage");
      if (!this.game) {
        socket.emit("redirect", "/dash");
      } else {
        socket.emit("changeState", "loading");
        console.log("Preparing questions!");
        await this.game.prepareQuestions();
        console.log("inviting players!");
        socket.emit("changeState", "start");
      }
    });
    socket.on("playRequestStartGame", () => {
      console.log(socket.id, "-- Started the game --");
      if (!this.game) {
        socket.emit("redirect", "/dash");
      } else {
        this.start();
      }
    });
  }

  start() {}

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuidChange", uuid);
  }
}
