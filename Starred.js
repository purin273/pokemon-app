import React, { useEffect, useState } from "react";
import { useShows } from "./custom-hooks";

function Starred() {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((pokeId) => fetch(`/pokemon/${pokeId}`));

      Promise.all(promises).then((results) => {
        setShows(results);
      });
    } else {
      setIsLoading(false);
    }
  }, [starred]);
  console.log(shows);
  return (
    <h1>
      Like some pokemons and go to console log of browser you can find an array
      of liked pokemons i wont be able to display it because i could'nt find
      suitable api to display the pokemons on liked page
    </h1>
  );
}

export default Starred;
