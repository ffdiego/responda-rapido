import { IQuestion } from "../questions/IQuestions";
import { Session } from "./Session";

export class Round {
  session: Session;
  startTime: number = 0;
  timeSpent: number = -1;
  timer: NodeJS.Timeout | null = null;
  roundEnded = false;
  question: IQuestion;

  constructor(session: Session) {
    this.session = session;
    const playerTimeLeft = this.session.game?.time || 30;
    this.question = this.session.game.questions[this.session.round];
    this.timer = setTimeout(() => {
      if (!this.roundEnded) this.endRound();
    }, playerTimeLeft * 1000);
  }

  startRound() {
    this.startTime = new Date().getTime();
    this.session.emitQuestion();
  }

  registerAnswer(answer: number) {
    const correctAnswer = this.session.game?.questions;
    this.session.input(false);
  }

  endRound() {
    this.timeSpent = new Date().getTime() - this.startTime;
    this.roundEnded = true;
  }
}
