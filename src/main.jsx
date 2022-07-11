import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Lobby from "./Lobby";
import Play from "./Play";
import RoomList from "./RoomsList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
