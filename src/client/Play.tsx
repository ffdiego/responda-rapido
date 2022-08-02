import { Loading, PerguntaRespostas } from "./components/play";
import { PressStart } from "./components/play/pressStart";
import { Results } from "./components/play/results";
import { useEffect, useState } from "react";
import { Container } from "./components/container";
import { useContext } from "react";
import SocketContext from "./socket/context";
import { useNavigate } from "react-router-dom";
import { IResults } from "../server/events/IEvents";
import { IQuestion } from "../server/questions/IQuestions";

export default function Layout() {
  return (
    <Container>
      <Play />
    </Container>
  );
}

function Play() {
  const [screen, setScreen] = useState(0);
  const [resultsData, setResultsData] = useState<IResults>({});
  const [question, setQuestion] = useState<IQuestion>({});
  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket?.emit("playRequestQuestions");
    socket?.on("redirect", (page) => {
      navigate(page);
    });
    socket?.on("changeState", (state) => {
      if (state === "loading") {
        setScreen(0);
      } else if (state === "start") {
        setScreen(1);
      }
    });
    socket?.on("showQuestion", (question) => {
      setScreen(2);
      setQuestion(question);
    });

    return () => {
      socket?.off();
    };
  }, [socket]);

  function handleStartGame() {
    socket?.emit("playRequestStartGame");
  }

  return (
    <>
      {screen == 0 && <Loading />}
      {screen == 1 && <PressStart handleStartGame={handleStartGame} />}
      {screen == 2 && <PerguntaRespostas question={question} />}
      {screen == 3 && <Results />}
    </>
  );
}
