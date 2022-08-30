import { useEffect } from "react";
import { useState } from "react";

import { Container } from "../components/container";
import { Subjects } from "../components/newgame";
import { TitleBar, Footer } from "../components/edges";

import { ISubject } from "../server/questions/IQuestions";

export default function Layout() {
  return (
    <Container>
      <NewGame />
    </Container>
  );
}

function NewGame() {
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem("rr-materias") || ""));
  }, []);

  function handleSubjectChange(subject: ISubject) {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  }

  function handlePlayButton() {
    localStorage.setItem("rr-materias", JSON.stringify(subjects));
    console.log("vou jogar!", subjects);
  }

  return (
    <div>
      <TitleBar text="Novo Jogo" />
      <div>
        <Subjects
          subjects={subjects}
          handleSubjectChange={handleSubjectChange}
        />
        <Footer
          btnText="Começar"
          btnEnabled={subjects.length >= 3}
          btnClick={handlePlayButton}
        />
      </div>
    </div>
  );
}
