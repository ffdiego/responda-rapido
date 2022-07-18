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
      VARIEDADES: false,
      PORTUGUES: false,
      CIENCIAS: false,
      INGLES: false,
      MATEMATICA: false,
      GEOGRAFIA: false,
      HISTORIA: false,
    };
    this.questionSet = null;
    this.state = "LOBBY";
    this.owner = null;
    this.io = io;
    this.gameEnder = null;
    this.gameEnd = new Promise((resolve) => (this.gameEnder = resolve));
  }

  start() {
    if (this.state !== "LOBBY") {
      console.log("Jogo já iniciado");
      return;
    }
    if (!this.players.some((p) => p.ready === false)) {
      this.state = "RUNNING";
      this.players.map((player) => {
        for (const key in player.subjects) {
          if (player.subjects[key]) {
            this.addSubjects(key);
          }
        }
      });
      this.gameLoop();
    }
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

  getStatus() {
    return {
      state: this.state,
      admin: this.owner?.name || "❌",
      //subjects: this.subjects,
      players: this.players.map((player) => player.getStatus()),
      questionSet: this.questionSet,
    };
  }

  addPlayer(name, uuid, subjects, device, socket) {
    let player = this.findPlayerByUUID(uuid);
    if (player) {
      player.name = name;
      player.subjects = subjects;
      player.device = device;
      player.socket = socket;
    } else {
      player = new Player(this, name, uuid, subjects, device, socket);
      this.players.push(player);
    }
    player.socket.on("pressed", (n) => player.handlePress(n));

    if (this.players.length === 1) {
      this.changeAdmin(player);
    }
    this.sendLobbyReadyCheck();
    return player;
  }

  findPlayerByUUID(uuid) {
    return this.players.find((player) => player.uuid === uuid);
  }

  removePlayer(uuid) {
    const player = this.findPlayerByUUID(uuid);
    if (!player) {
      return false;
    }
    const index = this.players.indexOf(player);
    this.players.splice(index, 1);
    if (this.players.length === 0) {
      this.changeAdmin(null);
    } else {
      this.changeAdmin(this.players[0]);
    }
    this.sendLobbyReadyCheck();
    return true;
  }

  addSubjects(subject) {
    console.log("sujeitos", subject);
    if (!this.subjects.hasOwnProperty(subject)) {
      console.log(subject);
      throw new Error("Matéria não existe");
    }
    this.subjects[subject] = true;
  }
  sendLobbyReadyCheck() {
    this.enableClick();
    if (this.state === "LOBBY") {
      this.players.map((player) => {
        const readyQuestion = {
          Pergunta: "Pronto para começar?",
          R1: "Pronto",
          R2: "",
          R3: "",
          R4: player === this.owner ? "[Admin] Começar" : "",
        };
        player.restore();
        player.question(readyQuestion, 0);
        player.highlight(1, "red");
        player.hide(2);
        player.hide(3);
        player !== this.owner && player.hide(4);
      });
      this.updatePlayersInfo();
    }
  }

  changeAdmin(player) {
    this.owner = player;
    if (this.owner) console.log(`${this.owner.name} é o admin agora`);
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

  sendAllQuestion(question, time) {
    console.log("[QST]", question.Pergunta);
    this.io.emit("question", question, time);
  }

  updatePlayersInfo() {
    this.io.emit("scr-players", this.getStatus().players);
  }

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
