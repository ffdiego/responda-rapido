import { Footer, TitleBar } from "./edges";

function Alternativa({
  texto,
  id,
  onClick,
}: {
  texto: string;
  id: string;
  onClick: () => void;
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
  alternativas,
  handleClick,
}: {
  alternativas: { 1: string; 2: string; 3: string; 4: string };
  handleClick: Function;
}) {
  if (!alternativas) {
    alternativas = {
      1: "REQUEIJÃO",
      2: "GELÉIA",
      3: "MARGARINA",
      4: "PATÊ",
    };
  }
  return (
    <div className="flex flex-col gap-5 flex-1 my-3 px-1">
      {Object.keys(alternativas).map((key) => {
        return (
          <Alternativa
            key={key}
            texto={alternativas[key]}
            id={key}
            onClick={(e) => handleClick(e)}
          />
        );
      })}
    </div>
  );
}

export function Pergunta({ pergunta }) {
  return (
    <div className="box-border bg-color3 py-4 px-6 text-white text-justify">
      <h1 className="lowercase first-letter:capitalize text-lg">{pergunta}</h1>
    </div>
  );
}

export function PerguntaRespostas() {
  function handleClick(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.id);
  }

  return (
    <main>
      <div className="h-96 bg-color3 bg-opacity-60 border-4 border-color3 rounded-xl">
        <Pergunta pergunta="QUAL DESSES INGREDIENTES TAMBÉM É USADO NA FRITURA DE ALIMENTOS?" />
        <Alternativas handleClick={handleClick} />
      </div>
    </main>
  );
}

export function PressStart() {
  return (
    <main>
      <TitleBar text="Responda Rápido!" />
      <div className="text-white border-x-4 border-color3">
        <div className="flex flex-col gap-2 text-lg bg-green-700 p-2">
          <p>
            Prepare-se! Você terá 30 segundos para responder uma bateria de
            questões.
          </p>
          <div className="font-semibold">
            Acertos
            <ul className="font-normal list-disc ml-6">
              <li>⏱️ + 5s</li>
              <li>💲 + % do prêmio</li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Erros:</p>
            <ul className="list-disc ml-6">
              <li>⏱️ - 5s</li>
            </ul>
          </div>
          <p>O jogo acaba quando seu tempo zerar.</p>
        </div>
      </div>
      <Footer
        btnText="Começar"
        btnClick={() => setScreen(1)}
        btnEnabled={true}
      />
    </main>
  );
}

export function Loading({ text }: { text: string }) {
  return (
    <div className="bg-color3 border-4 rounded-xl border-color3 text-white font-semibold text-xl flex flex-col items-center justify-center h-2/3 gap-6 animate-[fadeIn_300ms_ease-in-out_1]">
      <p className="text-5xl animate-spin">⚙️</p>
      <p className="text-center px-10">{text}</p>
    </div>
  );
}
