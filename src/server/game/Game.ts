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
  roundEnded: boolean = false;
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
    const stats = this.currentRound?.result;
    if (!stats) throw new Error("Error retrieving stats!");
    this.session.event.emitStats(stats);
    this.session.event.setClock(stats.score.time);
  }

  goToNextRound() {
    if (!this.roundEnded) return;
    const stats = this.currentRound?.result;
    if (!stats) throw new Error("Error retrieving stats!");
    this.results.push(stats);
    this.time += stats.gains.time;
    this.money += stats.gains.money;
    delete this.currentRound;
    this.roundNumber++;
  }

  getTime() {
    return this.time;
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
