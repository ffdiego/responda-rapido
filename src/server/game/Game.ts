import { IQuestion } from "../questions/IQuestions";
import { Round } from "../session/Round";

export class Game {
  questions: IQuestion[] = [];
  rounds: Round[] = [];
  time: number = 30;
  money: number = 0;

  saveRound(round: Round) {
    this.rounds.push(round);
  }
  saveGameToDB() {
    // TODO
  }
}
