import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";

function Play() {
  const [time, setTime] = useState(30);

  useEffect(() => {
    const localTime = localStorage.getItem("milhao-time");
    if (localTime) setTime(localTime - 1);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      localStorage.removeItem("milhao-time");
      return;
    }
    const timer = setInterval(function () {
      setTime(time - 1);
      localStorage.setItem("milhao-time", time);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen p-1">
        <TopBar name="Diego" time={time} />
        <Main />
      </div>
    </div>
  );
}

function Main() {
  return (
    <>
      <Pergunta
        pergunta="OS ANIMAIS CUJOS FILHOS SE DESENVOLVEM DENTRO DA BARRIGA DA FÊMEA SÃO
        CHAMADOS:"
      />
      <Respostas />
    </>
  );
}

function Alternativa({ texto, id }) {
  return (
    <button
      id={id}
      className="font-semibold text-lg border-4 border-color3 rounded-2xl cursor-pointer bg-white h-12 w-full overflow-hidden duration-200 outline-none
      shadow-[0_8px_0px_rgba(0,0,0,0.9)]
      active:translate-y-2 
      active:shadow-[0_0px_0px_rgba(0,0,0,0.9)]
      disabled:cursor-none disabled:duration-1000 disabled:opacity-25
      disabled:pointer-events-none"
    >
      {texto}
    </button>
  );
}

function Respostas({ alternativas }) {
  if (!alternativas) {
    alternativas = {
      r1: "Alternativa 1",
      r2: "Alternativa 2",
      r3: "Alternativa 3",
      r4: "Alternativa 4",
    };
  }
  return (
    <div className="flex flex-col gap-5 flex-1 my-3">
      {Object.keys(alternativas).map((key) => {
        return <Alternativa key={key} texto={alternativas[key]} id={key} />;
      })}
    </div>
  );
}

function Pergunta({ pergunta }) {
  return (
    <div className="box-border bg-color3 mt-2 py-4 px-6 rounded-xl text-white text-justify drop-shadow-lg">
      <h1>{pergunta}</h1>
    </div>
  );
}

function TopBar({ name, time }) {
  return (
    <header className="box-border bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
      <div className="flex justify-between font-extrabold">
        <h3>{name}</h3>
        <div className="flex items-center">
          <p className="text-lg mr-2">{time}</p>
          <BsStopwatch className="text-xl text-white" />
        </div>
      </div>
    </header>
  );
}

export default Play;
