import { IQuestion, ISubject } from "../questions/IQuestions";

export interface IResults {
  moneyTotal: number;
}

export interface InterServerEvents {
  uuidChange(uuid: string): void;

  newGame(payload: ISubject[]): void;
  playRequestQuestions: () => void;
  playRequestStartGame: () => void;
  changeState(state: "loading" | "start"): void;
  showQuestion(question: IQuestion): void;
  showResults(results: IResults): void;

  redirect(page: "/dash" | "/play" | "/login"): void;
}
