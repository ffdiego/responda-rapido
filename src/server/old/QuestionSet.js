const silvio = require("./silvio.json");

class QuestionSet {
  constructor(subjects) {
    if (subjects.length === 0) {
      throw new Error("Nenhuma matéria foi definida");
    }
    this.subjects = [];
    this.questions = {
      FACIL: [],
      MEDIO: [],
      DIFICIL: [],
      MILHAO: [],
    };

    for (const key in subjects) {
      //push truthy subjects to this.subjects
      if (subjects[key]) this.subjects.push(key);
    }

    this.generateQuestions();
  }

  generateQuestions() {
    const subjects = this.subjects;
    for (const difficulty in this.questions) {
      //on the case of MILHAO difficulty, only one question is requested
      if (difficulty === "MILHAO") {
        this.questions[difficulty].push(
          this.getRandomQuestion(
            difficulty,
            subjects[Math.floor(Math.random() * subjects.length)]
          )
        );
        continue;
      }

      //this block get at least one question from each subject before repeating the subject
      let availableSubjects = [];
      for (let i = 0; i < 5; i++) {
        if (availableSubjects.length === 0) {
          availableSubjects = [...subjects];
        }

        const randomSubject = Math.floor(
          Math.random() * availableSubjects.length
        );
        let subjectForThisQuestion = availableSubjects[randomSubject];
        availableSubjects.splice(randomSubject, 1);

        this.questions[difficulty].push(
          this.getRandomQuestion(difficulty, subjectForThisQuestion)
        );
      }
    }
  }

  getRandomQuestion(difficulty, subject) {
    const questions = silvio[subject][difficulty];
    const random = Math.floor(Math.random() * questions.length);
    //console.log(`chosen a ${difficulty} ${subject} question`);
    return questions[random];
  }

  getQuestion(index) {
    if (index <= 5) {
      return this.questions["FACIL"][index - 1];
    }
    if (index <= 10) {
      return this.questions["MEDIO"][index - 6];
    }
    if (index <= 15) {
      return this.questions["DIFICIL"][index - 11];
    }
    return this.questions["MILHAO"][0];
  }
}

module.exports = QuestionSet;
