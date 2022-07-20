import { MongoDatabase } from "../database/MongoDatabase";
import { IQuestion, ISubjects } from "../questions/IQuestions";

class Game {
  subjects: ISubjects[];
  questions: IQuestion[];

  constructor(subjects: ISubjects[]) {
    this.subjects = subjects;
    this.questions = [];
  }

  async prepareQuestions() {
    const database = new MongoDatabase();
    //easy questions
    let easy_subjects = [];
    do {
      for (let subject of this.subjects) {
      }
    } while (easy_subjects.length < 5);

    const easy = await database.getQuestions();
  }
}
