import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { NormalButton, WhiteButton } from "./buttons";

export default function TopBar() {
  const [name, setName] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localName = localStorage.getItem("rr-name");
    const localAvatar = localStorage.getItem("rr-avatar");
    if (localName) setName(localAvatar + " " + localName);
  }, []);

  function handleBackButton() {
    if (location.pathname === "/dash") setModalOpen(true);
    else navigate(-1);
  }

  function handleLogout() {
    localStorage.removeItem("rr-avatar");
    navigate("/");
  }

  return (
    <>
      <header className="box-border bg-color3 my-2 mb-4 py-2 px-1 rounded-xl text-white drop-shadow-lg">
        <div className="flex justify-between items-center font-bold px-2">
          <div
            className="p-2 px-4 bg-white bg-opacity-10 rounded-md hover:bg-opacity-30 duration-300 cursor-pointer"
            onClick={handleBackButton}
          >
            <BiArrowBack className="text-xl text-white " />
          </div>
          <h3 className="text-2xl">{name}</h3>
          <Clock />
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
              <NormalButton onClick={handleLogout}>Sair</NormalButton>
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

function Clock() {
  const [time, setTime] = useState(30);
  const [showClock, setShowClock] = useState(true);
  const [clockRunning, setClockRunning] = useState(false);

  useEffect(() => {
    if (time <= 0) return;
    const timer = setTimeout(() => {
      if (clockRunning) setTime(time - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return (
    <div className="text-2xl flex items-center gap-2">
      <p key={time} className="animalHappy">
        {(showClock && time) || ""}
      </p>
      <BsStopwatch />
    </div>
  );
}

function Modal({ children }) {
  return createPortal(children, document.getElementById("modal"));
}
