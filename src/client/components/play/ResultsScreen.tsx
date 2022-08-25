import { BsStopwatch } from "react-icons/bs";
import { IResults } from "../../../server/events/IEvents";
import { WhiteButton } from "../buttons";
import { TitleBar } from "../edges";

export function ResultsScreen({
  data,
  handleRequestNewRound,
}: {
  data?: IResults;
  handleRequestNewRound: () => void;
}) {
  return (
    <main className="animate-fade-in">
      <TitleBar text="Resultados" />
      <div className="bg-color3 bg-opacity-60 border-x-4 border-b-4 rounded-b-xl border-color3 flex flex-col justify-center text-white overflow-hidden">
        <div className="p-2 text-lg">
          <div className="pb-2">
            <p className="w-full font-semibold">Ganhos:</p>
            <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_1s_both] flex items-center justify-center text-normal border rounded-lg mb-2 py-2">
              R${data?.questionValue} ×
              <div className="inline-block mx-2">
                <span className="block border-b-2">
                  {data?.time.remaining}s
                </span>
                <span className="block">{data?.time.started}s</span>
              </div>
              =<b className="ml-2">R${data?.gains.money}</b>
            </div>
            <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_2s_both] border rounded-lg py-2">
              <div className="text-xl text-center ">
                <BsStopwatch className="inline mx-1" />
                {data && data.gains.time > 0 ? "+" : "-"}
                <b>{Math.abs(data?.gains.time || 0)}s</b>
                <p className="text-sm">
                  {data && data.gains.time > 0 ? "(Acertou)" : "(Errou)"}
                </p>
              </div>
            </div>
          </div>
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_3s_both] flex flex-col text-center border-4 rounded-xl text-xl py-2 bg-orange-600 font-semibold">
            <p className="w-full font-normal">Sua pontuação agora:</p>
            <p className="font-semibold">R${data?.score.money}</p>
            <p>
              <BsStopwatch className="inline mr-1" />
              {data?.score.time}s
            </p>
          </div>
        </div>
        <div className="border-b-4 border-color3 w-full text-left pb-2 px-4">
          <div className="animate-[fadeInFromLeft_500ms_ease-in-out_1_4s_both]">
            <p className="w-full">Prepare-se!</p>
            <p>
              Pergunta de <b>{data?.nextQuestion?.subject}</b>,
            </p>
            <p>
              valendo R$
              {Math.round(data?.nextQuestion?.prize || 0 / 1000)} Mil!
            </p>
          </div>
        </div>
        <div className="text-right p-2">
          <WhiteButton onClick={handleRequestNewRound}>
            Estou pronto!
          </WhiteButton>
        </div>
      </div>
    </main>
  );
}
