import { createPortal } from "react-dom";
import { NormalButton, WhiteButton } from "../buttons";

export function Modal({
  handleExitButton,
  setModalOpen,
}: {
  handleExitButton: () => void;
  setModalOpen: (_: boolean) => void;
}) {
  return createPortal(
    <>
      <div
        className="fixed right-0 top-0 bg-gray-600 bg-opacity-70 h-full w-full z-20 flex items-start justify-center"
        onClick={(e) => {
          setModalOpen(false);
        }}
      >
        <div
          className="bg-white mt-12 rounded-2xl p-4 border-8 border-color3 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-4 text-xl font-bold text-color3">
            {location.pathname === "/play"
              ? "Deseja sair do jogo?"
              : "Deseja trocar seu nome?"}
          </p>
          <NormalButton onClick={handleExitButton}>Sair</NormalButton>
          <WhiteButton onClick={() => setModalOpen(false)}>
            Cancelar
          </WhiteButton>
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
}
