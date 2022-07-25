export function NormalButton({ children, onClick, className, disabled }) {
  return (
    <button
      className={`text-lg font-semibold text-white bg-color3 p-2 px-4 rounded-xl hover:bg-opacity-70 duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function WhiteButton({ children, onClick }) {
  return (
    <button
      className="text-lg font-semibold bg-white border-2 border-color3 p-2 px-4 rounded-xl text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
