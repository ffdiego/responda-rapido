import TopBar from "./components/TopBar";

function RoomList() {
  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen p-1">
        <TopBar name="Diego" />
        <Main />
      </div>
    </div>
  );
}

function Main() {
  const salas = [
    { nome: "sala legal", jogadores: 1 },
    { nome: "sala paia ;/", jogadores: 5 },
  ];

  return (
    <div className="bg-color3 mt-2 rounded-xl p-2">
      <h1 className="text-xl text-white">Salas:</h1>
      {salas.map((item) => (
        <Sala nome={item.nome} jogadores={item.jogadores} />
      ))}
    </div>
  );
}

function Sala({ nome, jogadores }) {
  return (
    <div className="bg-white bg-opacity-10 mt-2 rounded-xl p-2 text-white flex flex-col">
      <div className="flex justify-between items-center">
        <p className="">{nome}</p>
        <button className="text-lg bg-color3 p-2 px-4 rounded-xl">
          Entrar
        </button>
      </div>
      <p className="text-right mt-2">{jogadores}/12</p>
    </div>
  );
}

export default RoomList;
