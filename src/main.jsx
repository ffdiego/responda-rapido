import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketContext from "./context/socketContext";
import "./index.css";
import Lobby from "./Lobby";
import NewGame from "./NewGame";
import Play from "./Play";
import RoomList from "./RoomsList";
import CreateSocket from "./helpers/createSocket";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContext.Provider value={CreateSocket()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/newgame" element={<NewGame />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>
);
