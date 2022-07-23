import TopBar from "./TopBar";

export function Container({ children }) {
  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen p-1">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
