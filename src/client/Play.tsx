import { Loading, PerguntaRespostas } from "./components/play";
import { PressStart } from "./components/play/pressStart";
import { Results } from "./components/play/results";
import { useEffect, useState } from "react";
import { Container } from "./components/container";
import { useContext } from "react";
import SocketContext from "./socket/context";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  return (
    <Container>
      <Play />
    </Container>
  );
}

function Play() {
  const [screen, setScreen] = useState(0);
  const [loadText, setLoadText] = useState(
    "Gerando questões, por favor aguarde..."
  );
  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket?.emit("play-enterpage");
    socket?.on("redirect-dash", () => {
      navigate("/dash");
    });
    socket?.on("play-showloading", (text) => {
      setLoadText(text);
      setScreen(0);
    });
    socket?.on("play-showpressstart", () => {
      setScreen(1);
    });
    return () => {
      socket?.off();
    };
  }, [socket]);

  return (
    <>
      {screen == 0 && <Loading text={loadText} />}
      {screen == 1 && <PressStart />}
      {screen == 2 && <PerguntaRespostas />}
      {screen == 3 && <Results />}
    </>
  );
}
