import { IResults } from "../events/IEvents";
import { Game } from "../game/Game";
import { Prize } from "../game/Prize";
import { IQuestion } from "../questions/IQuestions";

export class Round {
  game: Game;
  timeRoundStart: number = 0;
  timeRoundEnd: number = 0;
  timeCreditsStart: number = 0;
  timeCreditsEnd: number = 0;
  timer?: NodeJS.Timeout;
  question: IQuestion;
  chosenAnswer: number = 0;
  result?: IResults;

  constructor(game: Game) {
    this.game = game;
    this.session = session;
    this.timeCreditsStart = this.game.session?.game.time;
    this.question = this.session.game.questions[this.session.roundNumber];
    this.timer = setTimeout(() => {
      this.endRound();
    }, this.timeCreditsStart * 1000);
  }

  startRound() {
    this.timeRoundStart = new Date().getTime();
    this.session.event.emitQuestion();
    this.session.event.inputAllow(true);
    this.session.event.setClock(this.session.game.time);
    this.session.event.pauseClock(false);
  }

  registerAnswer(answer: number) {
    console.log("player answered", answer);
    this.session.event.pauseClock(true);
    this.session.event.inputAllow(false);
    this.chosenAnswer = answer;
    this.endRound();
  }

  async endRound() {
    this.timer && clearTimeout(this.timer);
    this.timeRoundEnd = new Date().getTime();
    const timeSpent = (this.timeRoundEnd - this.timeRoundStart) / 1000;
    let prize = { money: 0, time: 0 };

    if (this.chosenAnswer)
      this.session.event.highlight("green", this.chosenAnswer, true);

    //check if answer is correct
    console.log("========");
    console.log(
      "Jogador escolheu:",
      this.chosenAnswer,
      "A correta é:",
      this.question.Certa
    );
    console.log("Tempo gasto:", timeSpent, "/", this.timeCreditsStart);
    console.log("========");
    await sleep(3000);
    if (this.question.Certa === this.chosenAnswer) {
      this.session.event.highlight("green", this.chosenAnswer, false);
      prize.money =
        Prize(this.session.roundNumber) *
        (1 - timeSpent / this.timeCreditsStart);
      prize.time = 5;
    } else {
      this.session.event.highlight("red", this.chosenAnswer, true);
      this.session.event.highlight("green", this.chosenAnswer, false);
      prize.time = -5;
    }
    await sleep(3000);

    this.result = {
      time: prize.time,
      money: prize.money,
    };
    this.session.goToNextRound();
  }
}
