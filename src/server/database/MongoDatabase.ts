import mongoose from "mongoose";
import { IDificuldade, IQuestion, ISubject } from "../questions/IQuestions";
import { IDatabase } from "./IDatabase";
import { perguntaModel } from "./MongoModels";
import "dotenv/config";

export class MongoDatabase implements IDatabase {
  constructor() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not defined");
    }
    mongoose.connect(MONGO_URI);
  }

  async getQuestions(
    N: number,
    subjects: ISubject[],
    dificuldade: IDificuldade
  ): Promise<IQuestion[]> {
    const perguntas = await perguntaModel.aggregate([
      { $match: { Materia: { $in: subjects } } },
      { $match: { Dificuldade: dificuldade } },
      { $sample: { size: N } },
    ]);
    return perguntas;
  }

  disconnect() {
    mongoose.disconnect();
  }
}
