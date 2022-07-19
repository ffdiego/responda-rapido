const { getQuestions } = require("./mongo");

class Questions {
  constructor(nome) {
    getQuestions().then((perguntas) => {
      this.questions = perguntas;
      console.log(this.questions);
    });
  }
}

module.exports = Questions;
