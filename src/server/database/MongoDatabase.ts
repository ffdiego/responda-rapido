import mongoose from "mongoose";
import { IDificuldade, IQuestion, ISubject } from "../questions/IQuestions";
import { IDatabase } from "./IDatabase";
import "dotenv/config";

const perguntaSchema = new mongoose.Schema<IQuestion>({
  N: Number,
  Pergunta: String,
  Materia: String,
  Dificuldade: Number,
  R1: String,
  R2: String,
  R3: String,
  R4: String,
  Certa: Number,
});
const perguntaModel = mongoose.model("Pergunta", perguntaSchema, "Perguntas");

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
