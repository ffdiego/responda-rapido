const Game = require("../src/Game");
jest.useFakeTimers();

const mockio = {
  emit: () => {
    console.log("a");
  },
};
const mocksocket = {
  on: () => {},
  emit: () => {},
};
let uuid1 = "00000-00000-00000-00000";
let uuid2 = "00000-00000-00000-00001";
let subjects1 = { PORTUGUES: true };
let subjects2 = { MATEMATICA: true, GEOGRAFIA: true };

describe("Game Tests", () => {
  let game;
  beforeEach(() => {
    game = new Game(mockio);
  });

  test("Adicionar um jogador", () => {
    //addPlayer(name, uuid, subjects, device, socket)
    const player = game.addPlayer(
      "Johnn",
      uuid1,
      subjects1,
      "Android",
      mocksocket
    );
    expect(player.name).toBe("Johnn");
    expect(game.players.length).toBe(1);
  });

  test("Adicionar um jogador com uuid existente só troca o nome", () => {
    //addPlayer(name, uuid, subjects, device, socket)
    game.addPlayer("John", uuid1, subjects1, "device", mocksocket);
    expect(game.players[0].name).toBe("John");
    game.addPlayer("Marcelinho", uuid1, subjects2, "device", mocksocket);
    expect(game.players.length).toBe(1);
    expect(game.players[0].name).toBe("Marcelinho");
  });

  test("Remover um jogador que não existe e um que existe", () => {
    game.addPlayer("John", uuid1, subjects1, "device", mocksocket);
    expect(game.removePlayer(uuid2)).toBe(false);
    expect(game.removePlayer(uuid1)).toBe(true);
    expect(game.players.length).toBe(0);
  });
});

describe("Game States", () => {
  let game;
  beforeEach(() => {
    game = new Game(mockio);
  });

  it("Adicionar matéria que existem e não existe", () => {
    game.addSubjects("CIENCIAS");
    expect(game.subjects["CIENCIAS"]).toBe(true);
    expect(game.subjects["MATEMATICA"]).toBe(false);
    expect(() => game.addSubjects("ESPANHOL")).toThrow("Matéria não existe");
  });

  it("Deve Gerar Questões", () => {
    game.addSubjects("CIENCIAS");
    game.addSubjects("MATEMATICA");
    game.start();
    expect(game.questionSet.questions["FACIL"].length).toBe(5);
    expect(game.questionSet.questions["MEDIO"].length).toBe(5);
    expect(game.questionSet.questions["DIFICIL"].length).toBe(5);
    expect(game.questionSet.questions["MILHAO"].length).toBe(1);
  });

  it("Não começar enquanto um jogador não estiver pronto", () => {
    game.addPlayer("Johnn", uuid1, subjects1, "Android", mocksocket);
    game.addPlayer("Jim", uuid2, subjects2, "iOS", mocksocket);
    game.players[0].ready = true;
    game.start();

    expect(game.state).toBe("LOBBY");
  });

  it("Adicionar matérias corretamente com dois jogadores", () => {
    //addPlayer(name, uuid, subjects, device, socket)
    game.addPlayer("Johnn", uuid1, subjects1, "Android", mocksocket);
    game.addPlayer("Jim", uuid2, subjects2, "iOS", mocksocket);
    game.players.map((player) => {
      player.ready = true;
    });

    game.start();
    game.end();
    expect(game.subjects["MATEMATICA"]).toBe(true);
    expect(game.subjects["PORTUGUES"]).toBe(true);
    expect(game.subjects["GEOGRAFIA"]).toBe(true);
  });
});
