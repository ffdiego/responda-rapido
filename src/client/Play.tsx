import {
  LoadingScreen,
  StartScreen,
  QuestionScreen,
  ResultsScreen,
  ToastMessage,
} from "./components/play";
import { useEffect, useState, useContext } from "react";
import { Container } from "./components/container";
import SocketContext from "./socket/context";
import { useNavigate } from "react-router-dom";
import { IHighlight, IResults } from "../server/events/IEvents";
import { IQuestion } from "../server/questions/IQuestions";

export default function Layout() {
  return (
    <Container>
      <Play />
    </Container>
  );
}

function Play() {
  const [screen, setScreen] = useState(3);
  const [message, setMessage] = useState("Corrataa!");
  const [question, setQuestion] = useState<IQuestion>({ Pergunta: "Teste" });
  const [flash, setFlash] = useState<IHighlight>({});
  const [resultsData, setResultsData] = useState<IResults>();
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
    socket?.on("showStats", (results) => {
      setScreen(3);
      setResultsData(results);
    });
    socket?.on("highlight", (payload: IHighlight) => {
      setFlash(payload);
    });
    socket?.on("sendOverlayMessage", (message) => {
      setMessage(message);
    });

    return () => {
      socket?.off();
    };
  }, [socket]);

  function handleStartGame() {
    socket?.emit("playRequestStartGame");
  }

  function handleClick(n: number) {
    socket?.emit("playerAnswer", n);
  }

  return (
    <>
      {screen == 0 && <LoadingScreen />}
      {screen == 1 && <StartScreen handleStartGame={handleStartGame} />}
      {screen == 2 && (
        <QuestionScreen
          data={question}
          handleClick={handleClick}
          flash={flash}
        />
      )}
      {screen == 3 && <ResultsScreen data={resultsData} />}
      <ToastMessage message={message} />
    </>
  );
}
