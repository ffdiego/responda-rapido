const mongoose = require("mongoose");
require("dotenv").config();

main().catch((err) => console.log(err));

const perguntaSchema = new mongoose.Schema({
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

const pergunta = mongoose.model("Perguntas", perguntaSchema);

console.log("ENV", process.env.MONGO_URI);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const saida = await pergunta.find({ N: 30 });
  console.log(saida);
}
