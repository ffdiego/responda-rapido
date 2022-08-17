import { IResults } from "../events/IEvents";
import { IQuestion } from "../questions/IQuestions";
import { Round } from "../round/Round";
import { Session } from "../session/Session";

export class Game {
  questions: IQuestion[] = [];
  rounds: Round[] = [];
  results: IResults[] = [];
  session: Session;

  roundNumber: number = 0;
  currentRound?: Round;
  time: number = 30;
  money: number = 0;

  constructor(session: Session) {
    this.session = session;
  }

  startRound() {
    console.log("starting question", this.roundNumber);
    this.currentRound = new Round(this);
    this.currentRound.startRound();
  }

  showResults() {
    this.currentRound?.endRound();
  }

  showStats() {
    this.session.event.emitStats();
  }

  goToNextRound() {
    this.saveResults(this.currentRound?.result);
    delete this.currentRound;
    this.roundNumber++;
  }

  getTime() {
    return this.time;
  }

  addTime(time: number) {
    this.time = time;
  }
  addMoney(money: number) {
    this.money += money;
  }

  saveRound(round: Round) {
    this.rounds.push(round);
  }
  saveResults(results?: IResults) {
    if (!results) return;
    this.results.push(results);
    console.log("--- Current Results ---");
    console.log(this.results);
  }
  saveGameToDB() {
    // TODO
  }
}
