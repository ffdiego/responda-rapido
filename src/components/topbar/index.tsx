import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { OrangeButton, WhiteButton } from "../buttons";
import { Clock } from "./clock";

export default function TopBar() {
  const [name, setName] = useState("");

  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const localName = localStorage.getItem("rr-name");
    const localAvatar = localStorage.getItem("rr-avatar");
    if (localName) setName(localAvatar + " " + localName);
  }, []);

  function handleBackButton() {
    setModalOpen((v) => !v);
  }

  function handleExitButton() {
    //if (location.pathname === "/dash") {
    //  localStorage.removeItem("rr-avatar");
    //  navigate("/");
    //}
    //if (location.pathname === "/play") {
    //  socket?.emit("leaveGame");
    //  navigate("/dash");
    //}
  }

  return (
    <div className="relative mb-2">
      <header className="relative box-border bg-color3 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg z-20 ">
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
      <div
        className={`absolute -mt-2 p-2 w-full border-orange-600 border-4 border-t-0 rounded-b-xl z-0 overflow-hidden transition-all duration-500 ${
          modalOpen ? "h-28 bg-color3" : "h-0 pt-0 bg-color3"
        }`}
      >
        <p className="text-center text-white font-semibold my-2">
          Tem certeza que deseja sair?
        </p>
        <div className="text-center">
          <WhiteButton onClick={handleExitButton}>Sim</WhiteButton>{" "}
          <OrangeButton onClick={() => setModalOpen(false)}>Não</OrangeButton>
        </div>
      </div>
    </div>
  );
}
