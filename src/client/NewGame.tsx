import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NormalButton } from "./components/buttons";
import { Container, Container as div } from "./components/container";
import { Subjects } from "./components/newgame";
import { TitleBar, Footer } from "./components/edges";
import SocketContext from "./socket/context";

export default function Layout() {
  return (
    <Container>
      <NewGame />
    </Container>
  );
}

function NewGame() {
  const [subjects, setSubjects] = useState([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("redirect-play", () => {
      navigate("/play");
    });

    return () => socket?.off();
  }, [socket]);

  useEffect(() => {
    if (localStorage.getItem("rr-materias")) {
      setSubjects(JSON.parse(localStorage.getItem("rr-materias")));
    }
  }, []);

  function handleSubjectChange(subject) {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  }

  function handlePlayButton() {
    localStorage.setItem("rr-materias", JSON.stringify(subjects));
    console.log("vou jogar!", subjects);
    socket.emit("newgame", subjects);
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
