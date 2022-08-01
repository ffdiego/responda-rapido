import { ISubject } from "../questions/IQuestions";

export interface IResults {}

export interface InterServerEvents {
  uuidChange(uuid: string): void;

  newGame(payload: ISubject[]): void;
  playRequestQuestions: () => void;
  playRequestStartGame: () => void;
  changeState(
    state: "loading" | "start" | "question" | "results",
    args?: IResults
  ): void;

  redirect(page: "/dash" | "/play" | "/login"): void;
}
