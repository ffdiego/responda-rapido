const sleep = require("./helper");

class Round {
  constructor(game, roundNumber) {
    this.game = game;
    this.question = null;
    this.prize = [
      0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000,
    ][roundNumber];
    this.n = roundNumber;
    this.time = 30;
    this.running = false;
    this.answers = 0;
    this.roundEnder = null;
    this.roundEnd = new Promise((resolve) => (this.roundEnder = resolve));
  }

  async start() {
    console.log(
      `[Silvio]: Pergunta valendo R$${this.prize}.000,00 (Round ${this.n})`
    );
    this.running = true;
    this.game.sound(this.prize + "000");
    await sleep(6000);
    console.log("[Silvio]: Qual é a resposta certa?");
    this.question = this.game.questionSet.getQuestion(this.n);
    this.game.sound("Quale");
    this.game.sendAllQuestion(this.question, this.time);
    this.game.restore();
    this.game.enableClick();
    setTimeout(() => {
      if (this.running) this.end();
    }, this.time * 1000);
  }

  checkIfEverybodyResponded() {
    console.log("checking if everybody responded");
    if (this.game.players.some((player) => player.marked === null)) {
      return false;
    }
    console.log("Todo mundo respondeu!");
    this.running = false;
    this.end();
  }

  async end() {
    console.log("ending round", this.n);
    this.game.restore();
    this.game.players.map((player) => {
      if (player.marked) player.flash(player.marked, "blue");
    });
    const correta = this.question.Certa;
    console.log("A resposta correta é", correta);
    const voz = "Certeza" + [2, 3][Math.floor(Math.random() * 2)];
    this.game.sound(voz);
    await sleep(3000);
    this.game.players.map((player) => {
      player.restore();
      if (player.marked == correta) {
        console.log(
          `Jogador ${player.name} Acertou!!! (Marcou ${player.marked})`
        );
        player.correct(this.prize);
        player.flash(correta, "green");
        player.sound("Correta");
      } else {
        console.log(
          `Jogador ${player.name} Errou... (Marcou ${player.marked})`
        );
        player.sound("Errada");
        player.incorrect();
        player.marked && player.flash(player.marked, "red");
        player.highlight(correta, "green");
      }
    });
    await sleep(4000);
    this.game.restore();
    this.game.clearPlayerChoices();
    this.roundEnder();
  }
}

module.exports = Round;
