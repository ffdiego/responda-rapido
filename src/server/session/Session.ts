import { Socket } from "socket.io";
import { v4 } from "uuid";
import { MongoDatabase } from "../database/MongoDatabase";
import { InterServerEvents } from "../events/IEvents";
import { Game } from "../game/Game";
import { ISubject } from "../questions/IQuestions";
import { Round } from "./Round";

export class Session {
  socket: Socket<InterServerEvents>;
  database: MongoDatabase;
  subjects: ISubject[] = [];
  game: Game;
  round: number = 0;
  currentRound: Round | null = null;

  constructor(socket: Socket, database: MongoDatabase) {
    this.socket = socket;
    this.database = database;
    this.game = new Game();
    this.createListeners();
  }

  createListeners() {
    const socket = this.socket;
    socket.on("newGame", (subjects) => {
      this.subjects = subjects;
      socket.emit("redirect", "/play");
    });

    socket.on("playRequestQuestions", async () => {
      if (!this.game) {
        socket.emit("redirect", "/dash");
      } else {
        socket.emit("changeState", "loading");
        console.log("Preparing questions!");
        await this.prepareQuestions(this.subjects);
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

  async prepareQuestions(subjects: ISubject[]) {
    if (!subjects) {
      throw new Error("subjects not defined");
    }

    const easy = await this.database.getQuestions(5, subjects, 0);
    const medi = await this.database.getQuestions(5, subjects, 1);
    const hard = await this.database.getQuestions(5, subjects, 2);
    const mill = await this.database.getQuestions(1, subjects, 3);

    this.game.questions = [...easy, ...medi, ...hard, ...mill];
  }

  start() {
    this.currentRound = new Round(this);
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

  highlight(color: "red" | "green", alternative: number, flash?: boolean) {
    this.socket.emit("highlight", color, alternative, flash);
  }

  private emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuidChange", uuid);
  }
}
