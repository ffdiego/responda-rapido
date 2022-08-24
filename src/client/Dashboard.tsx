import { useNavigate } from "react-router-dom";
import { ISubject } from "../server/questions/IQuestions";
import { WhiteButton } from "./components/buttons";
import { Container } from "./components/container";

export default function Layout() {
  return (
    <Container>
      <Dashboard />
    </Container>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const salas: { score: number; subjects: ISubject[] }[] = [
    { score: 666.2, subjects: ["INGLES", "MATEMATICA"] },
    { score: 3430.2, subjects: ["PORTUGUES", "MATEMATICA"] },
  ];

  return (
    <div className="bg-color3 mt-2 rounded-xl p-2">
      <WhiteButton onClick={() => navigate("/newgame")}>Novo Jogo</WhiteButton>
      <h1 className="text-xl text-white mt-8">Histórico:</h1>
      {salas.map((item, index) => (
        <Sala key={index} score={item.score} subjects={item.subjects} />
      ))}
    </div>
  );
}

function Sala({ score, subjects }: { score: number; subjects: ISubject[] }) {
  return (
    <div className="bg-white bg-opacity-10 mt-2 rounded-xl p-2 text-white flex flex-col">
      <div className="flex justify-between items-center">
        <p className="">
          Pontuação: <br />
          R${score}
        </p>
        <button className="text-lg bg-color3 p-2 px-4 rounded-xl">
          Entrar
        </button>
      </div>
      <p className="text-right mt-2">{subjects.toString()}</p>
    </div>
  );
}
