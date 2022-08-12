import { IResults } from "../events/IEvents";
import { IQuestion } from "../questions/IQuestions";
import { Round } from "../round/Round";
import { Session } from "../session/Session";

export class Game {
  questions: IQuestion[] = [];
  rounds: Round[] = [];
  results: IResults[] = [];
  session?: Session;

  roundNumber: number = 0;
  currentRound?: Round;
  time: number = 30;
  money: number = 0;

  constructor(session: Session) {
    this.session = session;
  }

  startGame() {
    console.log("starting question", this.roundNumber);
    this.currentRound = new Round(this);
    this.currentRound.startRound();
  }

  showResults() {}

  async goToNextRound() {
    this.event.emitResults();
    await sleep(5000);
    this.game.saveResults(this.currentRound?.result);
    delete this.currentRound;
    this.roundNumber++;
    this.startQuestion();
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
