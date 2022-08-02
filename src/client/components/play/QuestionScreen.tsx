import { IQuestion } from "../../../server/questions/IQuestions";

export function QuestionScreen({ data }: { data: IQuestion }) {
  function handleClick(n: number): void {
    console.log(n);
  }

  return (
    <main className="animate-fade-in">
      <div className="h-96 bg-color3 bg-opacity-60 border-4 border-color3 rounded-xl">
        <Pergunta pergunta={data.Pergunta} />
        <Alternativas data={data} handleClick={handleClick} />
      </div>
    </main>
  );
}

function Alternativa({
  texto,
  onClick,
}: {
  texto: string;
  onClick: () => void;
}) {
  return (
    <button
      className="border-4 border-color3 rounded-2xl cursor-pointer bg-white h-12 w-full overflow-hidden duration-200 outline-none
      shadow-[0_8px_0px_rgba(0,0,0,0.9)]
      active:translate-y-2 
      active:shadow-[0_0px_0px_rgba(0,0,0,0.9)]
      disabled:cursor-none disabled:duration-1000 disabled:opacity-25
      disabled:pointer-events-none"
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export function Alternativas({
  data,
  handleClick,
}: {
  data: IQuestion;
  handleClick: Function;
}) {
  return (
    <div className="flex flex-col gap-5 flex-1 my-3 px-1">
      <Alternativa texto={data.R1} onClick={() => handleClick(1)} />
      <Alternativa texto={data.R2} onClick={() => handleClick(2)} />
      <Alternativa texto={data.R3} onClick={() => handleClick(3)} />
      <Alternativa texto={data.R4} onClick={() => handleClick(4)} />
    </div>
  );
}

function Pergunta({ pergunta }: { pergunta: string }) {
  return (
    <div className="box-border bg-color3 py-4 px-6 text-white text-justify">
      <h1 className="lowercase first-letter:capitalize text-lg">{pergunta}</h1>
    </div>
  );
}