import { Socket } from "socket.io";
import { v4 } from "uuid";
import { MongoDatabase } from "../database/MongoDatabase";
import { InterServerEvents } from "../events/IEvents";
import { Game } from "../game/Game";
import { Round } from "./Round";

export class Session {
  socket: Socket<InterServerEvents>;
  database: MongoDatabase;
  game: Game | null = null;
  round: number = 0;
  currentRound: Round | null = null;

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
    socket.on("playerAnswer", (answer) => {
      if (this.currentRound) {
        this.currentRound.registerAnswer(answer);
      }
    });
  }

  start() {
    this.emitQuestion();
    const now = new Date();
  }

  emitQuestion() {
    const round = this.round;
    const currentQuestion = this.game?.questions[round];
    if (!currentQuestion) throw new Error("No question to emit!");
    this.socket.emit("showQuestion", currentQuestion);
  }

  input(bool: boolean) {
    if (bool) {
      this.socket.emit("inputEnable");
    } else {
      this.socket.emit("inputDisable");
    }
  }

  highlight(alternative: number, flash: boolean) {
    this.socket.emit("highlight", alternative, flash);
  }

  private emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuidChange", uuid);
  }
}
