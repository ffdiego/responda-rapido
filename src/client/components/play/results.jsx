import { useEffect, useRef, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { WhiteButton } from "../buttons";
import { MathComponent } from "mathjax-react";
import { TitleBar } from "../edges";

export function Results() {
  const timerRef = useRef(null);
  const obj = {
    timeRemaining: 25,
    timeTotal: 30,
    moneyInitial: 3423.66,
    prizeInitial: 1500,
    prizeWithDeductions: 1250,
    moneyTotal: 4673.66,
    nextQuestionSubject: "Matemática",
    nextPrize: 2000,
  };
  const [animationStep, setAnimationStep] = useState(0);

  let premio = animationStep > 0 ? obj.prizeWithDeductions : obj.prizeInitial;
  let money = animationStep > 1 ? obj.moneyTotal : obj.moneyInitial;

  useEffect(() => {
    if (animationStep < 2) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setAnimationStep(animationStep + 1);
      }, 2000);
    }
  }, [animationStep]);

  return (
    <main>
      <TitleBar text="Resultados" />
      <div className="bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col justify-center text-white text-2xl">
        <div className="px-2">
          <p className="w-full font-semibold">Seu dinheiro:</p>
          <p className="ml-8">R${obj.moneyInitial}</p>
          <p className="w-full font-semibold">Prêmio:</p>
          <div className="ml-8 flex items-center">
            R${premio} ×
            <div className="inline-block mx-2">
              <span className="block border-b-2">25s</span>
              <span className="block">30s</span>
            </div>
            = R${obj.prizeWithDeductions}
          </div>
        </div>
        <p>
          <BsStopwatch className="inline" />
          {obj.timeRemaining}
        </p>

        <WhiteButton onClick={() => setAnimationStep((prev) => prev + 1)}>
          {animationStep}++
        </WhiteButton>
        <WhiteButton onClick={() => setAnimationStep((prev) => prev - 1)}>
          {animationStep}--
        </WhiteButton>
        <div className="border-t-4 border-color3 w-full text-left p-2 px-4 mt-4">
          <div
            className={`${
              animationStep === 2 ? "animate-fade-in-top" : "opacity-0"
            }`}
          >
            <p className="w-full">Prepare-se!</p>
            <p>
              Pergunta de <b>{obj.nextQuestionSubject}</b>, valendo R$
              {obj.nextPrize / 1000} Mil!
            </p>
            <div className="w-[90%] h-4 bg-red-500 rounded-xl overflow-hidden">
              <div
                className={`h-full bg-green-500 ${
                  animationStep === 2 ? "animate-fill-progress" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
