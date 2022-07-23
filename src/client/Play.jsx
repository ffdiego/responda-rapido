import { PerguntaRespostas } from "./components/play";
import { useEffect, useState } from "react";
import { Container } from "./components/container";

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

  return (
    <div className="bg-color3  p-2 rounded-xl min-h-[50%]">
      {screens[screen]}
    </div>
  );
}

function Loading() {
  return (
    <div className="text-white font-semibold text-xl flex flex-col items-center justify-center h-full">
      <p className="text-4xl animate-spin">⚙️</p>
      <p>Gerando questões...</p>
    </div>
  );
}
