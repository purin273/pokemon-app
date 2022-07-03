import React, { useEffect, useState } from "react";
import PokeCard from "../src/Pokecard/PokeCard";
import "./pokepage.css";

function Pokepage() {
  return (
    <div>
      <img
        className="pokeImg"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
        alt=""
      />
      <PokeCard />
    </div>
  );
}

export default Pokepage;
