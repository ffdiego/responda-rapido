const sleep = require("./helper");
const Player = require("./Player");
const QuestionSet = require("./QuestionSet");
const Round = require("./Round");

class Game {
  constructor(io) {
    this.players = [];
    this.lobby = [];
    this.round = null;
    this.subjects = {
      INGLES: false,
      PORTUGUES: false,
      CIENCIAS: false,
      MATEMATICA: false,
      GEOGRAFIA: false,
      HISTORIA: false,
      VARIEDADES: false,
    };
    this.questionSet = null;
    this.state = "LOBBY";
    this.io = io;
    this.gameEnder = null;
    this.gameEnd = new Promise((resolve) => (this.gameEnder = resolve));
  }

  start() {
    this.gameLoop();
  }

  async gameLoop() {
    console.log(":: Starting Game! ::");
    this.questionSet = new QuestionSet(this.subjects);
    for (let i = 1; i <= 16; i++) {
      this.changeRound(new Round(this, i));
      this.round.start();
      await Promise.race([this.round.roundEnd, this.gameEnd]);
      this.restore();
    }
    console.log(":: Terminou o jogo ::");
  }

  end() {
    this.gameEnder();
  }

  changeRound(round) {
    this.round = round;
    this.players.map((player) => {
      player.question(
        { Pergunta: `Começando a Rodada ${round.n} (R$${round.prize} MIL)` },
        0
      );
    });
    this.hide([1, 2, 3, 4]);
    this.updatePlayersInfo();
    this.io.emit("scr-round", {
      Round: this.round.n,
      Prize: this.round.prize,
    });
  }

  //playerActions
  clearPlayerChoices() {
    console.log("[CLEAR]");
    this.players.map((player) => {
      player.marked = null;
    });
  }
  enableClick() {
    this.players.map((player) => {
      player.disableClick(false);
    });
  }

  flash(n, color, speed) {
    this.io.emit("flash", { n, color, speed });
  }
  restore() {
    this.io.emit("restore");
  }
  sound(src) {
    this.io.emit("sound-screen", src);
    this.io.emit("sound", src);
  }
  hide(n) {
    let list = [];
    list = list.concat(n);
    this.players.map((player) => {
      player.hide(list);
    });
  }
}

module.exports = Game;
