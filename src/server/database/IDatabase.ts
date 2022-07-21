import { IDificuldade, IQuestion, ISubject } from "../questions/IQuestions";

export interface IDatabase {
  //get n questions from a specific subject
  getQuestions(
    N: number,
    subjects: ISubject[],
    dificuldade: IDificuldade
  ): Promise<IQuestion[]>;
}
