import { AnimalChoice } from "./components/lobby";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "./socket/context";

export default function Layout() {
  return <Login />;
}

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    const localName = localStorage.getItem("rr-name");
    const localAvatar = localStorage.getItem("rr-avatar");
    if (localName) setName(localName);
    if (localAvatar) navigate("/dash");
  }, []);

  function handlePlayButton() {
    console.log("vou jogar!");
    const payload = {
      name,
      avatar,
      uuid: localStorage.getItem("uuid"),
    };
    socket?.emit("play", payload);

    localStorage.setItem("rr-name", name);
    localStorage.setItem("rr-avatar", avatar);

    navigate("/dash");
  }

  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen px-2">
        <div className="my-2 text-3xl w-full text-center">
          <h1 className="font-extrabold border-t-4 border-b-4 rounded">
            Responda, Rápido!
          </h1>
        </div>
        <div className="flex flex-col mt-2">
          <input
            className="py-2 px-3 rounded ring-color3 ring-offset-1 focus:ring-4 ring-opacity-85 duration-200 outline-none text-center text-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={10}
            placeholder="Nome"
            type="text"
          />
        </div>

        <AnimalChoice avatar={avatar} setAvatar={setAvatar} />
        <button
          className={`box-border mt-10 py-2 px-3 bg-color3 text-white text-xl rounded ring-white ring-offset-1 active:ring-4 duration-200 ${
            !avatar || name.length <= 2
              ? "opacity-50 cursor-not-allowed disabled"
              : ""
          }`}
          disabled={!avatar || name.length <= 2}
          onClick={handlePlayButton}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
