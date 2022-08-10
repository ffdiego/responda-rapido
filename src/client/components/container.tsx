import TopBar from "./topbar";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen p-1">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
