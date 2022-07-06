function Play() {
  const placar = true;
  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen">
        <TopBar name="Diego" connection="OK" />
        {(!placar && <Main />) || <Placar />}
      </div>
    </div>
  );
}

function Main() {
  return (
    <>
      <Pergunta
        pergunta="OS ANIMAIS CUJOS FILHOS SE DESENVOLVEM DENTRO DA BARRIGA DA FÊMEA SÃO
        CHAMADOS:"
      />
      <Respostas />
    </>
  );
}

function Placar() {
  return (
    <div>
      <h1>RODADA 01</h1>
      <h2>2 MIL</h2>
      <ul>
        <li>
          <p>Jogador 1</p>
          <p>R$0</p>
        </li>
        <li>
          <p>Idiota com sorte</p>
          <p>R$100</p>
        </li>
        <li>
          <p>Imbecil sem sorte</p>
          <p>R$0</p>
        </li>
      </ul>
    </div>
  );
}

function Alternativa({ texto, id }) {
  return (
    <button
      id={id}
      className="font-semibold text-lg border-4 border-color3 rounded-2xl cursor-pointer bg-white h-full w-full duration-200 outline-none
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

function Respostas({ alternativas }) {
  if (!alternativas) {
    alternativas = {
      r1: "Alternativa 1",
      r2: "Alternativa 2",
      r3: "Alternativa 3",
      r4: "Alternativa 4",
    };
  }
  return (
    <div className="flex flex-col justify-center gap-5 flex-1 my-3">
      {Object.keys(alternativas).map((key) => {
        return <Alternativa key={key} texto={alternativas[key]} id={key} />;
      })}
    </div>
  );
}

function Pergunta({ pergunta }) {
  return (
    <div className="box-border bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
      <h1>{pergunta}</h1>
      <h6>
        Tempo:
        <span id="tempo-restante">?</span>s
      </h6>
    </div>
  );
}

function TopBar({ name, connection }) {
  return (
    <header className="box-border bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
      <div className="flex justify-between font-extrabold">
        <h3>{name}</h3>
        <h3>
          Connection:
          <strong id="status" class="connection-ok">
            {connection}
          </strong>
        </h3>
      </div>
    </header>
  );
}

export default Play;
