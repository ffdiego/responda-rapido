import { useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { WhiteButton } from "../buttons";
import { MathComponent } from "mathjax-react";
import { TitleBar } from "../edges";

export function Results() {
  const [enabled, setEnabled] = useState(false);
  let money = 1500;
  let time = 30;
  let timetotal = 30;
  let timeremaining = 25;
  let premio = 1000;

  return (
    <main>
      <TitleBar text="Resultados" />
      <div className="h-96 bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col items-center justify-center text-white text-2xl">
        <div className="flex">
          <p>${money}</p>
          <button
            className="text-color2 cursor-default disabled:-translate-x-10 disabled:opacity-0 duration-500"
            disabled={!enabled}
          >
            +$666!
          </button>
          <button>
            <MathComponent tex={String.raw`$${premio}`} />
          </button>
          <button>
            <MathComponent
              tex={String.raw`\times\frac{${timeremaining}s}{${timetotal}s}`}
            />
          </button>
        </div>
        <p>
          <BsStopwatch className="inline" />
          {time}
        </p>
        <WhiteButton onClick={() => setEnabled(!enabled)}>TOGGLE</WhiteButton>
      </div>
    </main>
  );
}
