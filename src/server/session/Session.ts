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

  async gameLoop() {
    while (this.gameRunning && this.game.roundNumber <= 15) {
      this.game.startRound();
      await Promise.race([
        sleep(this.game.time * 1000),
        this.game.currentRound?.endPromise,
      ]);
      this.game.showResults();
      await sleep(3000);
      this.game.showStats();
      await sleep(3000);
      this.game.goToNextRound();
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
    this.gameRunning = true;
  }

  detachGame() {
    console.log("player left");
    this.gameRunning = false;
    delete this.currentRound;
    this.game = new Game();
  }
}
