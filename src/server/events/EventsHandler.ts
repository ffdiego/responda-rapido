import { Socket } from "socket.io";
import { v4 } from "uuid";
import { Session } from "../session/Session";
import { InterServerEvents } from "./IEvents";

export class EventsHandler {
  session: Session;
  socket: Socket<InterServerEvents>;

  constructor(session: Session, socket: Socket) {
    this.session = session;
    this.socket = socket;
    this.createListeners();
  }

  createListeners() {
    const socket = this.socket;
    const session = this.session;
    socket.on("newGame", (subjects) => {
      session.subjects = subjects;
      socket.emit("redirect", "/play");
    });

    socket.on("playRequestQuestions", async () => {
      if (!session.game) {
        socket.emit("redirect", "/dash");
      } else {
        socket.emit("changeState", "loading");
        console.log("Preparing questions!");
        await session.prepareQuestions();
        console.log("inviting players!");
        socket.emit("changeState", "start");
      }
    });
    socket.on("playRequestStartGame", () => {
      console.log(socket.id, "-- Started the game --");
      if (!session.game) {
        socket.emit("redirect", "/dash");
      } else {
        session.roundNumber = 0;
        session.gameRunning = true;
        session.startQuestion();
      }
    });
    socket.on("playerAnswer", (answer) => {
      if (session.currentRound) {
        session.currentRound.registerAnswer(answer);
      }
    });

    socket.on("leaveGame", () => {
      session.playerLeft();
    });
  }

  inputAllow(bool: boolean) {
    if (bool) {
      this.socket.emit("inputEnable");
    } else {
      this.socket.emit("inputDisable");
    }
  }

  highlight(color: "red" | "green", alternative: number, flash?: boolean) {
    this.socket.emit("highlight", color, alternative, flash);
  }

  setClock(time: number) {
    this.socket.emit("clockSet", time);
  }
  pauseClock(bool: boolean) {
    this.socket.emit("clockPause", bool);
  }

  emitQuestion() {
    const round = this.session.roundNumber;
    const currentQuestion = this.session.game.questions[round];
    if (!currentQuestion) throw new Error("No question to emit!");
    this.socket.emit("showQuestion", currentQuestion);
  }

  emitResults() {
    this.socket.emit(
      "showResults",
      this.session.game.results[this.session.roundNumber]
    );
  }

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuidChange", uuid);
  }
}
