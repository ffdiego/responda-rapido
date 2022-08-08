import { Session } from "./Session";

class Round {
  session: Session;
  startTime: number = 0;
  timeSpent: number = -1;
  timer: NodeJS.Timeout | null = null;
  roundEnded = false;

  constructor(session: Session) {
    this.session = session;
    const playerTimeLeft = this.session.game?.time || 30;
    this.timer = setTimeout(() => {
      if (!this.roundEnded) this.endRound();
    }, playerTimeLeft * 1000);
  }

  startRound() {
    this.startTime = new Date().getTime();
    this.session.emitQuestion();
  }

  endRound() {
    this.timeSpent = new Date().getTime() - this.startTime;
    this.roundEnded = true;
  }
}
