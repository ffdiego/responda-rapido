import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { NormalButton, WhiteButton } from "./buttons";

export default function TopBar() {
  const [name, setName] = useState("");
  const [time, setTime] = useState(30);
  const [stopClock, setStopClock] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (time <= 0) return;
    const timer = setTimeout(() => {
      if (!stopClock) setTime(time - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    const localName = localStorage.getItem("rr-name");
    const localAvatar = localStorage.getItem("rr-avatar");
    if (localName) setName(localAvatar + localName);
  }, []);

  function handleBackButton() {
    if (location.pathname === "/rooms") setModalOpen(true);
    else navigate(-1);
  }

  return (
    <>
      <header className="box-border bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
        <div className="flex justify-between items-center font-bold px-2">
          <div
            className="p-2 px-4 bg-white bg-opacity-10 rounded-md hover:bg-opacity-30 duration-300 cursor-pointer"
            onClick={handleBackButton}
          >
            <BiArrowBack className="text-xl text-white " />
          </div>
          <h3 className="text-2xl">{name}</h3>
          <div className="text-2xl flex items-center gap-2">
            <p key={time} className="animalHappy">
              {time}
            </p>
            <BsStopwatch />
          </div>
        </div>
      </header>
      {modalOpen && (
        <Modal>
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
                Deseja sair do jogo?
              </p>
              <NormalButton onClick={() => navigate("/")}>Sair</NormalButton>
              <WhiteButton onClick={() => setModalOpen(false)}>
                Cancelar
              </WhiteButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ children }) {
  return createPortal(children, document.getElementById("modal"));
}
