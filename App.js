import React from "react";
import "./App.css";
import Abilities from "./pages/Abilities";
import PokeCard from "../src/Pokecard/PokeCard";
import Pokepage from "./Pokepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Starred from "./Starred";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Pokepage />}></Route>
      </Routes>
      <Routes>
        <Route path="/pokemon/:name" element={<Abilities />}></Route>
      </Routes>
      <Routes>
        <Route path="/starred" element={<Starred />}></Route>
      </Routes>
    </div>
  );
}

export default App;
