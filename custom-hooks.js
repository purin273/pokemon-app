import { useEffect, useReducer } from "react";

function showsReducer(prevState, action) {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.pokeId];
    }
    case "REMOVE": {
      return prevState.filter((pokeId) => pokeId !== action.pokeId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispach] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispach];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}
