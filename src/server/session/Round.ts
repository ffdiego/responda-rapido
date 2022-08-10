import { IResults } from "../events/IEvents";
import { Prize } from "../game/Prize";
import { sleep } from "../helper/sleep";
import { IQuestion } from "../questions/IQuestions";
import { Session } from "./Session";

export class Round {
  session: Session;
  timeRoundStart: number = 0;
  timeRoundEnd: number = 0;
  timeCreditsStart: number = 0;
  timeCreditsEnd: number = 0;
  timer: NodeJS.Timeout | null = null;
  question: IQuestion;
  chosenAnswer: number = 0;
  result: IResults | null = null;

  roundEnd: Promise<void> | null = null;
  roundEnder?(value: void | PromiseLike<void>): void;

  constructor(session: Session) {
    this.session = session;
    this.timeCreditsStart = this.session.game.time;
    this.question = this.session.game.questions[this.session.roundNumber];
    this.timer = setTimeout(() => {
      this.endRound();
    }, this.timeCreditsStart * 1000);

    this.roundEnd = new Promise((resolve) => {
      this.roundEnder = resolve;
    });
  }

  async startRound() {
    this.timeRoundStart = new Date().getTime();
    this.session.emitQuestion();
    this.session.input(true);
  }

  registerAnswer(answer: number) {
    this.session.input(false);
    this.chosenAnswer = answer;
  }

  async endRound() {
    this.timer && clearTimeout(this.timer);
    this.timeRoundEnd = new Date().getTime();
    const timeSpent = this.timeRoundEnd - this.timeRoundStart;
    let prize = { money: 0, time: 0 };

    if (this.chosenAnswer)
      this.session.highlight("green", this.chosenAnswer, true);

    //check if answer is correct
    await sleep(3000);
    if (this.question.Certa === this.chosenAnswer) {
      this.session.highlight("green", this.chosenAnswer, false);
      prize.money =
        Prize(this.session.roundNumber) *
        (1 - timeSpent / this.timeCreditsStart);
      prize.time = 5;
    } else {
      this.session.highlight("red", this.chosenAnswer, true);
      this.session.highlight("green", this.chosenAnswer, false);
      prize.time = -5;
    }
    await sleep(3000);

    this.result = {
      time: prize.time,
      money: prize.money,
    };
    this.session.game.saveResults(this.result);

    if (this.roundEnder) this.roundEnder();
  }
}
