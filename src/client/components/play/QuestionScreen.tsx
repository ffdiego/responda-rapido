import { IHighlight } from "../../../server/events/IEvents";
import { IQuestion } from "../../../server/questions/IQuestions";

export function QuestionScreen({
  data,
  handleClick,
  flash,
}: {
  data: IQuestion;
  handleClick: (n: number) => void;
  flash?: IHighlight;
  inputDisabled?: boolean;
}) {
  function additionalClasses() {
    if (!flash) return "";
    if (flash.blink) {
      return "blink-" + flash.color;
    } else {
      return "blink-" + flash.color + "-once";
    }
  }

  return (
    <main className="animate-fade-in">
      <div className="h-96 bg-color3 bg-opacity-60 border-4 border-color3 rounded-xl">
        <div className="box-border bg-color3 py-4 px-6 text-white text-justify">
          <h1 className="lowercase first-letter:capitalize text-lg">
            {data.Pergunta}
          </h1>
        </div>
        <div className="flex flex-col gap-5 flex-1 my-3 px-1">
          <Alternativa
            texto={data.R1}
            onClick={() => handleClick(1)}
            classes={flash?.alternative === 1 ? additionalClasses() : ""}
          />
          <Alternativa
            texto={data.R2}
            onClick={() => handleClick(2)}
            classes={flash?.alternative === 2 ? additionalClasses() : ""}
          />
          <Alternativa
            texto={data.R3}
            onClick={() => handleClick(3)}
            classes={flash?.alternative === 3 ? additionalClasses() : ""}
          />
          <Alternativa
            texto={data.R4}
            onClick={() => handleClick(4)}
            classes={flash?.alternative === 4 ? additionalClasses() : ""}
          />
        </div>
      </div>
    </main>
  );
}

function Alternativa({
  texto,
  onClick,
  classes,
}: {
  texto?: string;
  onClick: () => void;
  classes?: string;
}) {
  return (
    <button
      className={
        `border-4 border-color3 rounded-2xl cursor-pointer bg-white h-12 w-full overflow-hidden duration-200 outline-none shadow-[0_8px_0px_rgba(0,0,0,0.9)] active:translate-y-2 active:shadow-[0_0px_0px_rgba(0,0,0,0.9)] disabled:cursor-none disabled:duration-1000 disabled:opacity-25 disabled:pointer-events-none ` +
        classes
      }
      onClick={onClick}
    >
      {texto || "RESPOSTAS kfjsljgsoi"}
    </button>
  );
}
