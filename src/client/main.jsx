import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketProvider from "./socket/provider";
import "./index.css";

//Pages
import Login from "./Login";
import NewGame from "./NewGame";
import Play from "./Play";
import Dashboard from "./Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/newgame" element={<NewGame />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>
);
