import {
  LoadingScreen,
  StartScreen,
  QuestionScreen,
  ResultsScreen,
} from "./components/play";
import { useEffect, useState, useContext } from "react";
import { Container } from "./components/container";
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
  const [resultsData, setResultsData] = useState<IResults>({ moneyTotal: 0 });
  const [question, setQuestion] = useState<IQuestion>({ Pergunta: "Teste" });
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
      {screen == 0 && <LoadingScreen />}
      {screen == 1 && <StartScreen handleStartGame={handleStartGame} />}
      {screen == 2 && <QuestionScreen data={question} />}
      {screen == 3 && <ResultsScreen data={resultsData} />}
    </>
  );
}
