import mongoose from "mongoose";
import { IQuestion } from "../questions/IQuestions";

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

interface IUser {
  name: string;
  avatar: string;
  uuid: string;
}

const usuarioSchema = new mongoose.Schema<IUser>({
  name: String,
  avatar: String,
  uuid: String,
});

const perguntaModel = mongoose.model("Pergunta", perguntaSchema, "Perguntas");
const usuarioModel = mongoose.model("Usuario", usuarioSchema, "Usuarios");

export { perguntaModel, usuarioModel };
