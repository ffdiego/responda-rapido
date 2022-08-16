import { IResults } from "../events/IEvents";
import { Game } from "../game/Game";
import { Prize } from "../game/Prize";
import { IQuestion } from "../questions/IQuestions";

export class Round {
  game: Game;

  timeStart: number = 0;
  timeEnd: number = 0;

  question: IQuestion;
  chosenAnswer: number = 0;
  result?: IResults;

  endPromise: Promise<void>;
  endPromiseResolver?: () => void;

  constructor(game: Game) {
    this.game = game;
    this.question = this.game.questions[this.game.roundNumber];
    this.endPromise = new Promise((resolve) => {
      this.endPromiseResolver = resolve;
    });
  }

  startRound() {
    this.timeStart = new Date().getTime();
    this.game.session.event.emitQuestion();
    this.game.session.event.inputAllow(true);
    this.game.session.event.setClock(this.game.time);
    this.game.session.event.pauseClock(false);
  }

  registerAnswer(answer: number) {
    console.log("player answered", answer);
    this.game.session.event.pauseClock(true);
    this.game.session.event.inputAllow(false);
    this.chosenAnswer = answer;
    this.endRound();
  }

  endRound() {
    this.timeEnd = new Date().getTime();
    const timeSpent = (this.timeEnd - this.timeStart) / 1000;

    //check if answer is correct
    console.log("========");
    console.log(
      "Jogador escolheu:",
      this.chosenAnswer,
      "A correta é:",
      this.question.Certa
    );
    console.log("Tempo gasto:", timeSpent, "/", this.game.time);
    console.log("========");

    let prize = { money: 0, time: 0 };
    //Acertou
    if (this.question.Certa === this.chosenAnswer) {
      this.game.session.event.highlight("green", this.chosenAnswer, true);
      prize.money =
        Prize(this.game.roundNumber) * (1 - timeSpent / this.game.time);
      prize.time = 5;
    }
    //Errou
    else {
      this.game.session.event.highlight("red", this.chosenAnswer, true);
      this.game.session.event.highlight("green", this.chosenAnswer, false);
      prize.time = -5;
    }

    this.game.time = this.game.time + prize.time - timeSpent;
  }
}
