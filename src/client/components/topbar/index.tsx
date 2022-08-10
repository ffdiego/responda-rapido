import { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import SocketContext from "../../socket/context";
import { Clock } from "./clock";
import { Modal } from "./modal";

export default function TopBar() {
  const [name, setName] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const localName = localStorage.getItem("rr-name");
    const localAvatar = localStorage.getItem("rr-avatar");
    if (localName) setName(localAvatar + " " + localName);
  }, []);

  function handleBackButton() {
    setModalOpen(true);
  }

  function handleExitButton() {
    if (location.pathname === "/dash") {
      localStorage.removeItem("rr-avatar");
      navigate("/");
    }
    if (location.pathname === "/play") {
      socket?.emit("leaveGame");
      navigate("/dash");
    }
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
          <Clock socket={socket} />
        </div>
      </header>
      {modalOpen && (
        <Modal
          handleExitButton={handleExitButton}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}
