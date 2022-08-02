import { Footer, TitleBar } from "../edges";

export function StartScreen({
  handleStartGame,
}: {
  handleStartGame: () => void;
}) {
  return (
    <main className="animate-fade-in">
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
      <Footer btnText="Começar" btnClick={handleStartGame} btnEnabled={true} />
    </main>
  );
}
