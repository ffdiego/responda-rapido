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
    <main className="animate-fade-in">
      <TitleBar text="Resultados" />
      <div className="bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col justify-center text-white overflow-hidden">
        <div className="p-2 text-lg">
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_1s_both] pb-2">
            <p className="w-full font-semibold">Valor desta questão:</p>
            <div className="flex items-center justify-center text-normal">
              R${obj.prizeInitial} ×
              <div className="inline-block mx-2">
                <span className="block border-b-2">25s</span>
                <span className="block">30s</span>
              </div>
              =<u className="ml-2 font-semibold">R${obj.prizeWithDeductions}</u>
            </div>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_2s_both] border-t-4 py-2 flex">
            <p className="font-semibold">Total:</p>
            <div className="w-full pl-20">
              <p className="text-xl">
                {obj.correct ? "+" : "-"}
                <BsStopwatch className="inline mx-1" />
                <b>5s</b>
              </p>
              <p className="text-xl">
                + R$<b>{obj.correct ? obj.prizeWithDeductions : 0}</b>
              </p>
            </div>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_3s_both] flex flex-col text-center border-4 rounded-xl text-xl py-2">
            <p className="w-full font-semibold">Sua Pontuação agora:</p>
            <p>R${obj.moneyInitial}</p>
            <p>
              <BsStopwatch className="inline mr-1" />
              {obj.timeRemaining}s
            </p>
          </div>
        </div>

        <div className="border-t-4 border-color3 w-full text-left p-2 px-4">
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_4s_both]">
            <p className="w-full">Prepare-se!</p>
            <p>
              Pergunta de <b>{obj.nextQuestionSubject}</b>,
            </p>
            <p>
              valendo R$
              {obj.nextPrize / 1000} Mil!
            </p>
            <div className="w-[90%] h-4 bg-red-600 rounded-xl overflow-hidden mx-auto">
              <div className="bg-white h-full animate-[fill_60s_linear_1_4s_both]"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
