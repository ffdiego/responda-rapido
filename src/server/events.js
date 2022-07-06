const { v4: uuidv4 } = require("uuid");

function createPlayerEvents(socket, partida) {
  const id = socket.id;
  let name = null;
  let uuid = null;
  let device = null;
  let subjects = null;

  socket.on("auth", (data) => {
    name = data.name;
    uuid = data.uuid || "";
    device = data.device;
    subjects = data.subjects;

    //setting uid if none
    if (uuid.length !== 36) {
      uuid = uuidv4();
      console.log("generating UUID for " + name + ": " + uuid);
      socket.emit("uuid-set", uuid);
    }

    //adding player to the game
    console.log(`[CON]Client ${name} (${uuid}) connected from ${device}`);
    player = partida.addPlayer(name, uuid, subjects, device, socket);
  });
  socket.emit("status", partida.getStatus());

  socket.on("subjects", (subjects) => {
    console.log("[CON]Player", player.name, "set subjects", subjects);
    player.setSubjects(subjects);
  });

  socket.on("disconnect", () => {
    console.log("[CON]Client", name, "disconnected");
    if (player) player.connected = false;
    if (partida.state === "LOBBY") partida.removePlayer(uuid);
  });
}

module.exports = createPlayerEvents;
