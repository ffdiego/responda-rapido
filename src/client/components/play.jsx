function Alternativa({ texto, id }) {
  return (
    <button
      id={id}
      className="font-semibold text-lg border-4 border-color3 rounded-2xl cursor-pointer bg-white h-12 w-full overflow-hidden duration-200 outline-none
      shadow-[0_8px_0px_rgba(0,0,0,0.9)]
      active:translate-y-2 
      active:shadow-[0_0px_0px_rgba(0,0,0,0.9)]
      disabled:cursor-none disabled:duration-1000 disabled:opacity-25
      disabled:pointer-events-none"
    >
      {texto}
    </button>
  );
}

export function Respostas({ alternativas }) {
  if (!alternativas) {
    alternativas = {
      r1: "Alternativa 1",
      r2: "Alternativa 2",
      r3: "Alternativa 3",
      r4: "Alternativa 4",
    };
  }
  return (
    <div className="flex flex-col gap-5 flex-1 my-3">
      {Object.keys(alternativas).map((key) => {
        return <Alternativa key={key} texto={alternativas[key]} id={key} />;
      })}
    </div>
  );
}

export function Pergunta({ pergunta }) {
  return (
    <div className="box-border bg-color3 mt-2 py-4 px-6 rounded-xl text-white text-justify drop-shadow-lg">
      <h1>{pergunta}</h1>
    </div>
  );
}

export function PerguntaRespostas() {
  return (
    <>
      <Pergunta pergunta="Pants were invented by sailors in the sixteenth century to avoid Poseidon's wrath. It was believed that the sight of naked sailors angered the sea god." />
      <Respostas />
    </>
  );
}
