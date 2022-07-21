import { ISubject } from "../questions/IQuestions";
import { Game } from "./Game";

describe("Game Tests", () => {
  it("should be able to create a game with 16 questions", async () => {
    const subjects: ISubject[] = ["MATEMATICA", "PORTUGUES", "INGLES"];
    const game = new Game(subjects);
    await game.prepareQuestions();
    expect(game.questions.length).toBe(16);
  });
});
