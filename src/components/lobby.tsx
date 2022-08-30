export function AnimalChoice({ avatar, setAvatar }) {
  const animals = ["🐶", "🐱", "🐭", "🐹", "🐢", "🐷"];

  return (
    <div className="box-border border-4 border-color3 bg-color3 bg-opacity-40 mt-2 py-2 px-1 rounded-xl text-white drop-shadow-lg">
      <h1 className="text-center">Escolha seu avatar</h1>
      <div className="mt-2 flex flex-wrap gap-2 justify-evenly">
        {animals.map((animal) => (
          <button
            key={animal}
            onClick={() => setAvatar(animal)}
            className={`basis-1/4 rounded-lg p-2 border-color3 border-4 duration-500 outline-none  ${
              avatar === animal
                ? "bg-color3"
                : "hover:bg-color3 hover:bg-opacity-50"
            }`}
          >
            <p
              className={`text-4xl text-center ${
                avatar === animal ? "animalHappy" : ""
              }`}
            >
              {animal}
            </p>
          </button>
        ))}
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}
