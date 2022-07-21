import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NormalButton } from "./components/buttons";
import { Container } from "./components/container";
import { Subjects } from "./components/newgame";
import SocketContext from "./context/socketContext";

export default function NewGame() {
  const [subjects, setSubjects] = useState([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("redirect-playpage", () => {
      navigate("/play");
    });
  }, [socket]);

  function handleSubjectChange(subject) {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  }

  function handlePlayButton() {
    console.log("vou jogar!", subjects);
    socket.emit("newgame", subjects);
  }

  return (
    <Container>
      <Header />
      <div>
        <Subjects
          subjects={subjects}
          handleSubjectChange={handleSubjectChange}
        />
        <Footer btnEnabled={subjects.length >= 3} btnClick={handlePlayButton} />
      </div>
    </Container>
  );
}

function Header() {
  return (
    <h1 className="text-center text-white text-xl font-semibold mt-4 border-4 rounded-t-xl border-color3 bg-color3">
      Novo Jogo
    </h1>
  );
}

function Footer({ btnClick, btnEnabled }) {
  return (
    <div className="box-border border-4 border-color3 bg-color3 bg-opacity-40  py-2 drop-shadow-lg border-t-0 rounded-b-xl flex justify-end px-2">
      <NormalButton
        onClick={btnClick}
        className={btnEnabled ? "" : "opacity-50 cursor-not-allowed"}
        disabled={!btnEnabled}
      >
        Começar!
      </NormalButton>
    </div>
  );
}
