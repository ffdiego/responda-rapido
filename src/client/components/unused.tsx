function PlayersList() {
  const jogadores = [
    { nome: "Diego", mat: 6 },
    { nome: "João", mat: 7 },
    { nome: "Maria", mat: 8 },
    { nome: "Diego", mat: 6 },
    { nome: "João", mat: 7 },
    { nome: "Maria", mat: 8 },
  ];
  return (
    <div className="flex flex-col justify-center gap-5 flex-1 my-3">
      <div className="box-border border-4 border-color3 bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
        <h1 className="text-center">Jogadores Conectadossss</h1>
        {jogadores.map((jogador, index) => (
          <div
            className="flex justify-between even:bg-black even:bg-opacity-20 px-4"
            key={index}
          >
            <span className="">{jogador.nome}</span>
            <span className="text-right">{jogador.mat} matérias</span>
          </div>
        ))}
      </div>
    </div>
  );
}
