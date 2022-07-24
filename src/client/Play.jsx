import { PerguntaRespostas } from "./components/play";
import { useEffect, useState } from "react";
import { Container } from "./components/container";
import { useSocket } from "./helpers/useSocket";

export default function Layout() {
  return (
    <Container>
      <Play />
    </Container>
  );
}

function Play() {
  const [screen, setScreen] = useState(0);
  const screens = [<Loading />, <PerguntaRespostas />];

  const socket = useSocket();

  useEffect(() => {
    socket.on("show-loading", (text) => {
      setScreen(0);
    });
  }, []);

  return (
    <div className="bg-color3  p-2 rounded-xl min-h-[50%]">
      {screen == 0 && <Loading text="Carregando..." />}
      {screen == 1 && <PerguntaRespostas />}
    </div>
  );
}

function Loading({ text }) {
  return (
    <div className="text-white font-semibold text-xl flex flex-col items-center justify-center h-full">
      <p className="text-4xl animate-spin">🎹</p>
      <p>{text}</p>
    </div>
  );
}
