import { IQuestion } from "../../server/questions/IQuestions";

function Alternativa({
  texto,
  id,
  onClick,
}: {
  texto: string;
  id: string;
  onClick: (e) => void;
}) {
  return (
    <button
      id={id}
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
      <Alternativa texto={data.R1} onClick={(e) => handleClick(e)} id="1" />
      <Alternativa texto={data.R2} onClick={(e) => handleClick(e)} id="2" />
      <Alternativa texto={data.R3} onClick={(e) => handleClick(e)} id="3" />
      <Alternativa texto={data.R4} onClick={(e) => handleClick(e)} id="4" />
    </div>
  );
}

export function Pergunta({ pergunta }: { pergunta: string }) {
  return (
    <div className="box-border bg-color3 py-4 px-6 text-white text-justify">
      <h1 className="lowercase first-letter:capitalize text-lg">{pergunta}</h1>
    </div>
  );
}

export function PerguntaRespostas({ question }: { question: IQuestion }) {
  function handleClick(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.id);
  }

  return (
    <main className="animate-fade-in">
      <div className="h-96 bg-color3 bg-opacity-60 border-4 border-color3 rounded-xl">
        <Pergunta pergunta={question.Pergunta} />
        <Alternativas data={question} handleClick={handleClick} />
      </div>
    </main>
  );
}

export function Loading() {
  return (
    <main className="bg-color3 border-4 rounded-xl border-color3 text-white font-semibold text-xl flex flex-col items-center justify-center h-2/3 gap-6 animate-fade-in">
      <p className="text-5xl animate-[spin_2s_linear_infinite]">⚙️</p>
      <p className="text-center px-10">Carregando Perguntas...</p>
    </main>
  );
}
