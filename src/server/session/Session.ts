import { Socket } from "socket.io";
import { v4 } from "uuid";
import { MongoDatabase } from "../database/MongoDatabase";
import { InterServerEvents } from "../events/IEvents";
import { Game } from "../game/Game";

export class Session {
  socket: Socket<InterServerEvents>;
  database: MongoDatabase;
  game: Game | null = null;
  round: number = 0;

  constructor(socket: Socket, database: MongoDatabase) {
    this.socket = socket;
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

  start() {
    this.emitQuestion(0);
    const now = new Date();
  }

  emitQuestion(round: number) {
    const currentQuestion = this.game?.questions[round];
    if (!currentQuestion) throw new Error("No question to emit!");
    this.socket.emit("showQuestion", currentQuestion);
  }

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuidChange", uuid);
  }
}
