import { Socket } from "socket.io";
import { v4 } from "uuid";
import { IQuestion } from "../questions/IQuestions";
import { Session } from "../session/Session";
import { IHighlight, InterServerEvents } from "./IEvents";

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
      console.log(socket.id, "requested game");
      console.log(session.gameRunning, "game running");
      if (!session.gameRunning && session.game.questions) {
        console.log("starting the game loop");
        session.gameLoop();
      } else {
        socket.emit("redirect", "/dash");
      }
    });
    socket.on("playerAnswer", (answer) => {
      if (session.game.currentRound) {
        session.game.currentRound.registerAnswer(answer);
      }
    });

    socket.on("leaveGame", () => {
      session.detachGame();
    });
    socket.on("disconnect", () => {
      session.detachGame();
    });
  }

  inputAllow(bool: boolean) {
    if (bool) {
      this.socket.emit("inputEnable");
    } else {
      this.socket.emit("inputDisable");
    }
  }

  highlight(payload?: IHighlight) {
    this.socket.emit("highlight", payload);
  }

  setClock(time: number) {
    this.socket.emit("clockSet", time);
  }
  pauseClock(bool: boolean) {
    this.socket.emit("clockPause", bool);
  }

  showToasterMessage(message: string) {
    this.socket.emit("toasterMessage", message);
  }

  emitQuestion(question: IQuestion) {
    if (!question) throw new Error("No question to emit!");
    this.socket.emit("showQuestion", question);
  }

  emitStats() {
    this.socket.emit(
      "showStats",
      this.session.game.results[this.session.game.roundNumber]
    );
  }

  emitNewUUID() {
    const uuid = v4();
    this.socket.emit("uuidChange", uuid);
  }
}
