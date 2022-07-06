import { useEffect, useRef, useState } from "react";

function Lobby() {
  const subjectsTemplate = {
    INGLES: false,
    PORTUGUES: false,
    CIENCIAS: false,
    MATEMATICA: false,
    GEOGRAFIA: false,
    HISTORIA: false,
    VARIEDADES: false,
  };
  const [subjects, setSubjects] = useState(subjectsTemplate);

  useEffect(() => {
    const localSubjects = JSON.parse(localStorage.getItem("milhao-subjects"));
    if (localSubjects) setSubjects(localSubjects);
  }, []);

  function handleSubjectChange(subject) {
    const newSubjects = { ...subjects, [subject]: !subjects[subject] };
    setSubjects(newSubjects);
    localStorage.setItem("milhao-subjects", JSON.stringify(newSubjects));
  }

  function handlePlayButton(e) {
    //get all checked inputs in the form
  }

  return (
    <div className="bg-color1">
      <div className="max-w-3xl mx-auto flex flex-col h-screen px-2">
        <div className="my-2 text-3xl w-full text-center">
          <h1 className="font-extrabold border-t-4 border-b-4 rounded">
            Perguntas!
          </h1>
        </div>
        <div className="flex flex-col mt-2">
          <input
            className="py-2 px-3 rounded ring-color3 ring-offset-1 focus:ring-4 ring-opacity-85 duration-200 outline-none"
            placeholder="Nome"
            type="text"
          />
          <button
            className="box-border mt-2 py-2 px-3 bg-color3 text-white rounded ring-white ring-offset-1 active:ring-4 duration-200"
            onClick={handlePlayButton}
          >
            Jogar
          </button>
        </div>

        <div className="mt-2 flex flex-wrap w-full gap-1 justify-between">
          {Object.keys(subjectsTemplate).map((subject) => (
            <SubjectButton
              key={subject}
              subject={subject}
              checked={subjects[subject]}
              handleSubjectChange={handleSubjectChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubjectButton({ subject, checked, handleSubjectChange }) {
  return (
    <div
      className={`basis-[32%] border-4 rounded-lg text-center py-2 bg-white border-color3 duration-500 ${
        checked && "bg-color3"
      }`}
      onClick={() => handleSubjectChange(subject)}
    >
      <p className={`w-full text-sm md:text-base ${checked && "text-white"}`}>
        {subject}
      </p>
    </div>
  );
}

function PlayersList({ Players }) {}

export default Lobby;
