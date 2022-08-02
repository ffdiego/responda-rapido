import { Socket } from "socket.io";
import { IDatabase } from "../database/IDatabase";
import { IQuestion, ISubject } from "../questions/IQuestions";

import { writeFile } from "fs";

export class Game {
  subjects: ISubject[];
  questions: IQuestion[];
  database: IDatabase;
  socket: Socket;

  constructor(subjects: ISubject[], database: IDatabase, socket: Socket) {
    if (!subjects) {
      throw new Error("subjects not defined");
    }
    this.subjects = subjects;
    this.database = database;
    this.socket = socket;
    this.questions = [];
  }

  async prepareQuestions() {
    const database = this.database;

    const easy = await database.getQuestions(5, this.subjects, 0);
    const medi = await database.getQuestions(5, this.subjects, 1);
    const hard = await database.getQuestions(5, this.subjects, 2);
    const mill = await database.getQuestions(1, this.subjects, 3);

    this.questions = [...easy, ...medi, ...hard, ...mill];
    writeFile(
      "questions.log",
      JSON.stringify(this.questions, null, 4),
      (err) => {}
    );
  }

  saveGameToDB() {
    // TODO
  }
}
