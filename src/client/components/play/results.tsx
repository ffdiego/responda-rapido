import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { TitleBar } from "../edges";

export function Results() {
  const obj = {
    correct: true,
    timeRemaining: 25,
    timeTotal: 30,
    moneyInitial: 3423.66,
    prizeInitial: 1500,
    prizeWithDeductions: 1250,
    moneyTotal: 4673.66,
    nextQuestionSubject: "Matemática",
    nextPrize: 2000,
  };

  return (
    <main>
      <TitleBar text="Resultados" />
      <div className="bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col justify-center text-white overflow-hidden">
        <div className="p-2 text-lg">
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_1s_both]">
            <p className="w-full font-semibold">Valor desta questão:</p>
            <div className="ml-8 flex items-center text-normal">
              R${obj.prizeInitial} ×
              <div className="inline-block mx-2">
                <span className="block border-b-2">25s</span>
                <span className="block">30s</span>
              </div>
              = R${obj.prizeWithDeductions}
            </div>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_2s_both]">
            <p className="w-full font-semibold mt-2">Total:</p>
            <p className="ml-8 text-xl">
              {obj.correct ? "+" : "-"}
              <BsStopwatch className="inline mx-1" />
              5s
            </p>
            <p className="ml-8 text-xl">
              + R${obj.correct ? obj.prizeWithDeductions : 0}
            </p>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_3s_both]">
            <p className="w-full font-semibold mt-2">Sua Pontuação agora:</p>
            <p className="ml-8">R${obj.moneyInitial}</p>
            <p className="ml-8">
              <BsStopwatch className="inline mr-1" />
              {obj.timeRemaining}s
            </p>
          </div>
        </div>

        <div className="border-t-4 border-color3 w-full text-left p-2 px-4 mt-4">
          <div className="danimate-[fadeInFromLeft_500ms_ease-in-out_1_4s_both]">
            <p className="w-full">Prepare-se!</p>
            <p>
              Pergunta de <b>{obj.nextQuestionSubject}</b>, valendo R$
              {obj.nextPrize / 1000} Mil!
            </p>
            <div className="w-[90%] h-4 bg-red-500 rounded-xl overflow-hidden mx-auto">
              <div className="bg-green-500 h-full animate-[fill_3s_linear_1_1s_both]"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
