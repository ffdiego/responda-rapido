import { Socket } from "socket.io";
import { EventsHandler } from "../events/EventsHandler";
import { MongoDatabase } from "../database/MongoDatabase";
import { Game } from "../game/Game";
import { ISubject } from "../questions/IQuestions";
import { Round } from "../round/Round";
import { sleep } from "../helper/sleep";

export class Session {
  event: EventsHandler;
  database: MongoDatabase;
  subjects: ISubject[] = [];
  game: Game;
  gameRunning: boolean = false;
  roundNumber: number = 0;
  currentRound?: Round;

  constructor(socket: Socket, database: MongoDatabase) {
    this.database = database;
    this.event = new EventsHandler(this, socket);
    this.game = new Game();
  }

  async gameLoop() {}

  async prepareQuestions() {
    if (!this.subjects) {
      throw new Error("subjects not defined");
    }
    const subjects = this.subjects;
    const easy = await this.database.getQuestions(5, subjects, 0);
    const medi = await this.database.getQuestions(5, subjects, 1);
    const hard = await this.database.getQuestions(5, subjects, 2);
    const mill = await this.database.getQuestions(1, subjects, 3);

    this.game.questions = [...easy, ...medi, ...hard, ...mill];
    this.gameRunning = true;
  }

  detachGame() {
    console.log("player left");
    this.gameRunning = false;
    delete this.currentRound;
    this.game = new Game();
  }
}
