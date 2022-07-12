import { NormalButton } from "./components/buttons";
import { Container } from "./components/container";
import { Subjects } from "./components/newgame";

export default function NewGame() {
  return (
    <Container>
      <h1 className="text-center text-white text-xl font-semibold mt-4 border-4 rounded-t-xl border-color3 bg-color3">
        Novo Jogo
      </h1>
      <Main />
    </Container>
  );
}

function Main() {
  return (
    <div>
      <Subjects />
      <GameModes />
    </div>
  );
}

function GameModes() {
  return (
    <div className="box-border border-4 border-color3 bg-color3 bg-opacity-40  py-2 drop-shadow-lg border-t-0 rounded-b-xl flex justify-end px-2">
      <NormalButton>Começar!🤘</NormalButton>
    </div>
  );
}
