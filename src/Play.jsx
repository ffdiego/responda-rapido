import { PerguntaRespostas } from "./components/play";
import { useEffect, useState } from "react";

export default function Play() {
  const [screen, setScreen] = useState(0);
  const screens = [<Loading />];

  return (
    <div>
      <PerguntaRespostas />
    </div>
  );
}

function Loading() {
  return "oi :D";
}
