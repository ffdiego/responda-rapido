import { IResults } from "../events/IEvents";
import { IQuestion } from "../questions/IQuestions";
import { Round } from "../session/Round";

export class Game {
  questions: IQuestion[] = [];
  rounds: Round[] = [];
  results: IResults[] = [];
  time: number = 30;
  money: number = 0;

  saveRound(round: Round) {
    this.rounds.push(round);
  }
  saveResults(results: IResults) {
    this.results.push(results);
  }
  saveGameToDB() {
    // TODO
  }
}
