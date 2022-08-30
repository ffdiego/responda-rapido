export function LoadingScreen() {
  return (
    <main className="bg-color3 border-4 rounded-xl border-color3 text-white font-semibold text-xl flex flex-col items-center justify-center h-2/3 gap-6 animate-fade-in">
      <p className="text-5xl animate-[spin_2s_linear_infinite]">⚙️</p>
      <p className="text-center px-10">Carregando Perguntas...</p>
    </main>
  );
}
