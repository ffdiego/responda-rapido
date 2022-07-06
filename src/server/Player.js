class Player {
  constructor(game, name, uuid, subjects, device, socket) {
    this.game = game;
    this.name = name;
    this.uuid = uuid;
    this.device = device;
    this.socket = socket;
    this.money = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.connected = null;
    this.ready = false;
    this.subjects = subjects;
    this.marked = null;
    this.state = {
      flash: [],
      highlight: [],
      hide: [],
      disableClick: false,
    };
  }

  getStatus() {
    return {
      name: this.name,
      uuid: this.uuid,
      device: this.device,
      ready: this.ready,
      //subjects: this.subjects,
      money: this.money * 1000,
      //correctAnswers: this.correctAnswers,
      //wrongAnswers: this.wrongAnswers,
      connected: this.connected,
      state: this.state,
      admin: this.game.owner === this,
    };
  }
  restoreEventsOnReconnection() {
    const state = this.state;
    state.flash.forEach((o) => this.flash(o.n, o.color, o.speed));
    state.highlight.forEach((o) => this.highlight(o.n, o.color));
    state.hide.forEach((n) => this.hide(n));
  }
  //Game Events
  handlePress(n) {
    if (this.game.state === "LOBBY") {
      if (n === 1) {
        //Powers on the Ready Button
        this.ready = !this.ready;
        if (this.ready) this.highlight(1, "green");
        else this.highlight(1, "red");
        this.game.updatePlayersInfo();
      }
      if (n === 4) {
        //if the player is the game owner, start the game
        if (this.game.owner === this) {
          this.game.start();
        }
      }
    } else if (this.game.state === "RUNNING") {
      this.markAlternative(n);
      this.game.round.checkIfEverybodyResponded();
      this.highlight(n, "blue");
      this.disableClick(true);
    }
  }

  question(question, time) {
    this.socket.emit("question", question, time);
  }
  markAlternative(n) {
    if (!this.marked && n > 0 && n <= 4) {
      this.marked = n;
      this.disableClick();
    }
  }
  correct(prize) {
    this.money += prize;
    this.correctAnswers++;
  }
  incorrect() {
    this.wrongAnswers++;
  }

  sound(src) {
    this.socket.emit("sound", src);
  }

  hide(n) {
    let list = [];
    list = list.concat(n);
    list.map((o) => {
      this.socket.emit("hide", o);
      this.state.hide.push(o);
    });
  }
  flash(n, color, fast) {
    console.log("[FLASH]", n, color, (fast && "fast") || "normal");
    const obj = { n, color, fast };
    this.socket.emit("flash", obj);
    this.state.flash.push(obj);
  }
  highlight(n, color) {
    const obj = { n, color };
    this.socket.emit("highlight", obj);
    this.state.highlight.push(obj);
  }
  restore() {
    this.state.flash = [];
    this.state.hide = [];
    this.state.highlight = [];
    this.socket.emit("restore");
  }
  disableClick(disable) {
    this.socket.emit("disable-click", disable);
    this.state.disableClick = disable;
  }
}

module.exports = Player;
