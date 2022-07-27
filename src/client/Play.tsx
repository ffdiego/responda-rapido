import { Loading, PerguntaRespostas, PressStart } from "./components/play";
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
  const [screen, setScreen] = useState(3);
  const [loadText, setLoadText] = useState("");
  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  useEffect(() => {
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
