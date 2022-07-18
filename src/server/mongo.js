const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

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

//o terceiro argumento de mongoose.model() é o nome da coleção.
const pergunta = mongoose.model("Pergunta", perguntaSchema, "Perguntas");

main().catch((err) => console.log(err));

async function main() {
  console.log("connectando ao banco de dados");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Verificando perguntas...");
  const perguntas = await pergunta.aggregate([{ $sample: { size: 10 } }]);
  console.log(perguntas);
}
