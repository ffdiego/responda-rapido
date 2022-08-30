import {
  LoadingScreen,
  StartScreen,
  QuestionScreen,
  ResultsScreen,
  ToastMessage,
} from "../components/play";
import { useEffect, useState, useContext } from "react";
import { Container } from "../components/container";
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
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState<IQuestion>({ Pergunta: "Teste" });
  const [flash, setFlash] = useState<IHighlight>({});
  const [resultsData, setResultsData] = useState<IResults>();

  function handleStartGame() {
    //socket?.emit("playRequestStartGame");
  }

  function handleChoseAlternative(n: number) {
    //socket?.emit("playerAnswer", n);
  }

  function handleRequestNewRound() {
    //socket?.emit("playNextRound");
  }

  return (
    <>
      <ToastMessage message={message} />
      {screen == 0 && <LoadingScreen />}
      {screen == 1 && <StartScreen handleStartGame={handleStartGame} />}
      {screen == 2 && (
        <QuestionScreen
          data={question}
          handleClick={handleChoseAlternative}
          flash={flash}
        />
      )}
      {screen == 3 && (
        <ResultsScreen
          data={resultsData}
          handleRequestNewRound={handleRequestNewRound}
        />
      )}
    </>
  );
}
