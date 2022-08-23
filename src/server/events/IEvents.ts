import { IQuestion, ISubject } from "../questions/IQuestions";

export interface IResults {
  money: {
    question: number;
    calculated: number;
  };
  time: {
    remaining: number;
    started: number;
  };
  gains: {
    time: number;
    prize: number;
  };
  score: {
    money: number;
    time: number;
  };
  nextQuestion: {
    subject: ISubject;
    prize: number;
  };
}

export interface IHighlight {
  color?: "red" | "green";
  alternative?: number;
  blink?: boolean;
}

export interface InterServerEvents {
  uuidChange(uuid: string): void;

  newGame(payload: ISubject[]): void;
  playRequestQuestions: () => void;
  playRequestStartGame: () => void;
  changeState(state: "loading" | "start"): void;
  showQuestion(question: IQuestion): void;
  showStats(results: IResults): void;

  redirect(page: "/dash" | "/play" | "/login"): void;
  leaveGame(): void;

  clockSet(time: number): void;
  clockPause(bool: boolean): void;

  //play events
  inputEnable(): void;
  inputDisable(): void;
  playerAnswer(answer: number): void;
  highlight(payload?: IHighlight): void;
  toasterMessage(message: string): void;
}
