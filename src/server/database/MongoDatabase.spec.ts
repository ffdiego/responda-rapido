// getQuestions(N: number, subject: ISubjects)

import { MongoDatabase } from "./MongoDatabase";

describe("Mongo Database", () => {
  const mongoDatabase = new MongoDatabase();

  it("should return 10 english questions", async () => {
    const questions = await mongoDatabase.getQuestions(10, "INGLES");
    expect(questions.length).toBe(10);
    for (const question of questions) {
      expect(question.Materia).toBe("INGLES");
    }
  });

  it("should return 10 math questions", async () => {
    const questions = await mongoDatabase.getQuestions(10, "MATEMATICA");
    expect(questions.length).toBe(10);
    for (const question of questions) {
      expect(question.Materia).toBe("MATEMATICA");
    }
  });

  afterAll(() => {
    mongoDatabase.disconnect();
  });
});
