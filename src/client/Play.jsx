import { PerguntaRespostas } from "./components/play";
import { useEffect, useState } from "react";
import { Container } from "./components/container";
import { useContext } from "react";
import SocketContext from "./socket/context";
import { useNavigate } from "react-router-dom";
import { NormalButton, WhiteButton } from "./components/buttons";

export default function Layout() {
  return (
    <Container>
      <Play />
    </Container>
  );
}

function Play() {
  const [screen, setScreen] = useState(1);
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
    <div className="rounded-xl min-h-[50%] border-4 border-color3">
      {screen == 0 && <Loading text={loadText} />}
      {screen == 1 && <PressStart />}
      {screen == 2 && <PerguntaRespostas />}
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

function PressStart() {
  return (
    <div className="text-white rounded-t-xl">
      <h1 className="text-center text-xl font-semibold bg-color3">
        ⚡️ Responda Rápido! ⚡️
      </h1>
      <div className="flex flex-col gap-2 text-lg bg-color3 bg-opacity-40 p-2 mb-4">
        <p>
          Prepare-se! Você terá 30 segundos para responder uma bateria de
          questões.
        </p>
        <p className="font-semibold">
          Acertos
          <ul className="font-normal list-disc ml-4">
            <li>⏱️ + 5s</li>
            <li>💲 + % do prêmio</li>
          </ul>
        </p>
        <div>
          <p className="font-bold">Erros:</p>
          <ul className="list-disc ml-4">
            <li>⏱️ - 5s</li>
          </ul>
        </div>
        <p>O jogo acaba quando seu tempo zerar.</p>
      </div>
      <div className="text-right bg-color3 bg-opacity-40">
        <WhiteButton>Começar</WhiteButton>
      </div>
    </div>
  );
}
