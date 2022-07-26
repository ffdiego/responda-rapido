import { useEffect, useRef, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { WhiteButton } from "../buttons";
import { MathComponent } from "mathjax-react";
import { TitleBar } from "../edges";

export function Results() {
  const timerRef = useRef(null);
  const [prizeAnimationStep, setPrizeAnimationStep] = useState(0);
  let initialmoney = 3423.66;
  let money = 1500;
  let time = 30;
  let timetotal = 30;
  let timeremaining = 25;
  let premio =
    prizeAnimationStep > 0 ? (money * timeremaining) / timetotal : money;
  let totalmoney =
    prizeAnimationStep > 1 ? initialmoney + premio : initialmoney;

  useEffect(() => {
    if (prizeAnimationStep < 2) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setPrizeAnimationStep(prizeAnimationStep + 1);
      }, 2000);
    }
  }, [prizeAnimationStep]);

  return (
    <main>
      <TitleBar text="Resultados" />
      <div className="h-96 bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col items-center justify-center text-white text-2xl">
        <div className="flex gap-1">
          <button
            className="cursor-default disabled:translate-x-[88px] duration-500"
            disabled={prizeAnimationStep > 1}
          >
            <MathComponent tex={String.raw`$${totalmoney}`} />
          </button>
          <button
            className="cursor-default disabled:-translate-x-10 disabled:opacity-0 duration-500 text-2xl"
            disabled={prizeAnimationStep > 1}
          >
            <MathComponent tex={String.raw`+ $${premio}`} />
          </button>
          <button
            className="cursor-default disabled:-translate-x-10 disabled:opacity-0 duration-500"
            disabled={prizeAnimationStep > 0}
          >
            <MathComponent
              tex={String.raw`\times\frac{${timeremaining}s}{${timetotal}s}`}
            />
          </button>
        </div>
        <p>
          <BsStopwatch className="inline" />
          {time}
        </p>
        <p>Animation: {prizeAnimationStep}</p>
        <p>timeRef: {timerRef.current}</p>

        <WhiteButton onClick={() => setPrizeAnimationStep((prev) => prev + 1)}>
          +1
        </WhiteButton>
        <WhiteButton onClick={() => setPrizeAnimationStep((prev) => prev - 1)}>
          -1
        </WhiteButton>
        <p>Prepare-se!</p>
        <div className="w-full h-4 bg-red-500">
          <div className="h-full bg-green-500 animate-fill-progress"></div>
        </div>
      </div>
    </main>
  );
}
