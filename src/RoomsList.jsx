import { WhiteButton } from "./components/buttons";
import { Container } from "./components/container";
import TopBar from "./components/TopBar";

function RoomList() {
  return (
    <Container>
      <Main />
    </Container>
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
      <WhiteButton>Novo Jogo</WhiteButton>
      {salas.map((item, index) => (
        <Sala key={index} nome={item.nome} jogadores={item.jogadores} />
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
