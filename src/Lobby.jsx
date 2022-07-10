import { AnimalChoice, SubjectButton, Subjects } from "./components/lobby";
import { useEffect, useState, useContext } from "react";
import { socket } from "./components/socket";
import { Link } from "react-router-dom";

function Lobby() {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const localSubjects = JSON.parse(localStorage.getItem("milhao-subjects"));
    const localName = localStorage.getItem("milhao-name");
    const localAvatar = localStorage.getItem("milhao-avatar");
    if (localSubjects) setSubjects(localSubjects);
    if (localName) setName(localName);
    if (localAvatar) setAvatar(localAvatar);
  }, []);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("uuid-change", (uuid) => {
      console.log("uuid-change", uuid);
      localStorage.setItem("uuid", uuid);
    });

    socket.on("pong", () => {
      const pong = Date.now();
      console.log("pong", pong);
    });

    return () => {
      socket.off();
    };
  }, []);

  function sendPing() {
    const time = Date.now();
    console.log("ping", time);
    setPing(time);
    socket.emit("ping");
  }

  function handleSubjectChange(subject) {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  }

  function handlePlayButton() {
    console.log("vou jogar!");
    const payload = {
      name,
      avatar,
      subjects,
      uuid: localStorage.getItem("uuid"),
    };
    socket.emit("play", payload);

    localStorage.setItem("milhao-name", name);
    localStorage.setItem("milhao-subjects", JSON.stringify(subjects));
    localStorage.setItem("milhao-avatar", avatar);
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
        <div className="box-border border-4 border-color3 bg-color3 bg-opacity-40 mt-2 py-2 px-1 rounded-xl drop-shadow-lg">
          <h1 className="text-center text-white">Escolha as matérias</h1>
          <div className="mt-2 flex flex-wrap w-full gap-1 justify-evenly">
            <Subjects
              subjects={subjects}
              handleSubjectChange={handleSubjectChange}
            />
          </div>
        </div>
        <AnimalChoice avatar={avatar} setAvatar={setAvatar} />
        <button
          className={`box-border mt-10 py-2 px-3 bg-color3 text-white text-xl rounded ring-white ring-offset-1 active:ring-4 duration-200 ${
            !avatar || !name || subjects.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handlePlayButton}
        >
          Jogar
        </button>
        <button
          className={`box-border mt-10 py-2 px-3 bg-color3 text-white text-xl rounded ring-white ring-offset-1 active:ring-4 duration-200`}
          onClick={sendPing}
        >
          PING!
        </button>
        <Link to="/play">/PLAY</Link>
      </div>
    </div>
  );
}

export default Lobby;
