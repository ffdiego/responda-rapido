import { MongoDatabase } from "../database/MongoDatabase";
import { IQuestion, ISubject } from "../questions/IQuestions";

export class Game {
  subjects: ISubject[];
  questions: IQuestion[];

  constructor(subjects: ISubject[]) {
    if (!subjects) {
      throw new Error("subjects not defined");
    }
    this.subjects = subjects;
    this.questions = [];
  }

  async prepareQuestions() {
    const database = new MongoDatabase();

    const easy = await database.getQuestions(5, this.subjects, 0);
    const medi = await database.getQuestions(5, this.subjects, 1);
    const hard = await database.getQuestions(5, this.subjects, 2);
    const mill = await database.getQuestions(1, this.subjects, 3);

    database.disconnect();
    this.questions = [...easy, ...medi, ...hard, ...mill];
  }

  saveGameToDB() {
    // TODO
  }
}
