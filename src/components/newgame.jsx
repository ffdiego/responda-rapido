export function Subjects({ subjects, handleSubjectChange }) {
  const subjectsTemplate = [
    "INGLES",
    "PORTUGUES",
    "CIENCIAS",
    "MATEMATICA",
    "GEOGRAFIA",
    "HISTORIA",
    "VARIEDADES",
  ];

  return (
    <>
      <div className="box-border border-4 border-color3 bg-color3 bg-opacity-40  py-2 px-1 drop-shadow-lg">
        <h1 className="text-center text-white">Escolha 3 ou mais matérias</h1>
        <div className="mt-2 flex flex-wrap w-full gap-1 justify-evenly">
          {subjectsTemplate.map((subject) => (
            <SubjectButton
              key={subject}
              subject={subject}
              checked={subjects && subjects?.includes(subject)}
              handleSubjectChange={handleSubjectChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function SubjectButton({ subject, checked, handleSubjectChange }) {
  return (
    <button
      className={`basis-[32%] border-4 rounded-lg text-center py-2 outline-none border-color3 duration-500 ${
        checked ? "bg-color3" : "bg-white"
      }`}
      onClick={() => handleSubjectChange(subject)}
    >
      <p
        className={`w-full text-xs md:text-base ${checked ? "text-white" : ""}`}
      >
        {subject}
      </p>
    </button>
  );
}
