import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiCog } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { NormalButton } from "./buttons";

export default function TopBar() {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const localName = localStorage.getItem("rr-name");
    if (localName) setName(localName);
  }, []);

  return (
    <header className="box-border bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
      <div className="flex justify-between font-extrabold px-2">
        <h3 className="">{name}</h3>
        <div
          className="p-2 bg-white bg-opacity-10 rounded-md group z-20"
          onClick={() => navigate("/")}
        >
          <HiCog className="text-xl text-white group-hover:rotate-90 duration-500" />
          <Modal>
            <div className="fixed right-0 top-0 bg-gray-600 bg-opacity-50 h-full w-full z-20 flex items-center justify-center">
              <div className="bg-white rounded-xl p-4 border-4 border-color3 flex flex-col">
                <p className="mb-4">Deseja sair do jogo?</p>
                <NormalButton>Sair</NormalButton>
                <button className="p-4">Cancelar</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
}

function Modal({ children }) {
  return createPortal(children, document.getElementById("modal"));
}
