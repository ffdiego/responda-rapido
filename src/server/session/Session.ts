import { Socket } from "socket.io";
import { EventsHandler } from "../events/EventsHandler";
import { MongoDatabase } from "../database/MongoDatabase";
import { Game } from "../game/Game";
import { ISubject } from "../questions/IQuestions";
import { sleep } from "../helper/sleep";

export class Session {
  event: EventsHandler;
  database: MongoDatabase;
  subjects: ISubject[] = [];
  game: Game;
  gameRunning: boolean = false;

  constructor(socket: Socket, database: MongoDatabase) {
    this.database = database;
    this.event = new EventsHandler(this, socket);
    this.game = new Game(this);
  }

  async playOneRound() {
    if (this.game.roundNumber <= 15) {
      console.log("[SESSION] starting round", this.game.roundNumber);
      this.game.startRound();
      await Promise.race([
        sleep(this.game.time * 1000),
        this.game.currentRound?.endPromise,
      ]);
      await sleep(1000);
      console.log("[SESSION] show results");
      this.game.showResults();
      await sleep(3000);
      console.log("[SESSION] show stats");
      this.game.showStats();
    }
  }

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
  }

  detachGame() {
    console.log("player left");
    this.gameRunning = false;
    this.game = new Game(this);
  }
}
