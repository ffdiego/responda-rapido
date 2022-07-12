export function NormalButton({ children, onClick }) {
  return (
    <button
      className="text-lg font-semibold text-white bg-color3 p-2 px-4 rounded-xl hover:bg-opacity-70 duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function WhiteButton({ children, onClick }) {
  return (
    <button
      className="text-lg font-semibold bg-white border-2 border-color3 p-2 px-4 rounded-xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
