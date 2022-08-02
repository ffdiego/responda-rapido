export function NormalButton({
  children,
  onClick,
  className,
  disabled,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
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

export function WhiteButton({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="text-lg font-semibold bg-white border-2 border-color3 p-2 px-4 rounded-xl text-black hover:bg-gray-300 duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
