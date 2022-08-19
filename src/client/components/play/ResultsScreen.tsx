import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { IHighlight, IResults } from "../../../server/events/IEvents";
import { TitleBar } from "../edges";

export function ResultsScreen({ data }: { data?: IResults }) {
  if (!data) {
    data = {
      money: {
        question: 1500,
        calculated: 1250,
      },
      time: {
        remaining: 25,
        started: 30,
      },
      gains: {
        time: 5,
        prize: 1250,
      },
      score: {
        money: 3423.66,
        time: 25,
      },
      nextQuestion: {
        subject: "INGLES",
        prize: 666000,
      },
    };
  }

  return (
    <main className="animate-fade-in">
      <TitleBar text="Resultados" />
      <div className="bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col justify-center text-white overflow-hidden">
        <div className="p-2 text-lg">
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_1s_both] pb-2">
            <p className="w-full font-semibold">Valor desta questão:</p>
            <div className="flex items-center justify-center text-normal">
              R${data.money.question} ×
              <div className="inline-block mx-2">
                <span className="block border-b-2">25s</span>
                <span className="block">30s</span>
              </div>
              =<u className="ml-2 font-semibold">R${data.money.calculated}</u>
            </div>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_2s_both] border-t-4 py-2 flex">
            <p className="font-semibold">Total:</p>
            <div className="w-full pl-20">
              <p className="text-xl">
                {data.gains.time > 0 ? "+" : "-"}
                <BsStopwatch className="inline mx-1" />
                <b>{Math.abs(data.gains.time)}s</b>
              </p>
              <p className="text-xl">
                + R$<b>{data.gains.prize}</b>
              </p>
            </div>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_3s_both] flex flex-col text-center border-4 rounded-xl text-xl py-2">
            <p className="w-full font-semibold">Sua Pontuação agora:</p>
            <p>R${data.score.money}</p>
            <p>
              <BsStopwatch className="inline mr-1" />
              {data.score.time}s
            </p>
          </div>
        </div>

        <div className="border-t-4 border-color3 w-full text-left p-2 px-4">
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_4s_both]">
            <p className="w-full">Prepare-se!</p>
            <p>
              Pergunta de <b>{data.nextQuestion.subject}</b>,
            </p>
            <p>
              valendo R$
              {Math.round(data.nextQuestion.prize / 1000)} Mil!
            </p>
            <div className="w-[90%] h-4 bg-red-600 rounded-xl overflow-hidden mx-auto">
              <div className="bg-white h-full animate-[fill_20s_linear_1_4s_both] duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
