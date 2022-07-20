import { IQuestion, ISubjects } from "../questions/IQuestions";

export interface IDatabase {
  //get n questions from a specific subject
  getQuestions(N: number, subject: ISubjects): Promise<IQuestion[]>;
}
