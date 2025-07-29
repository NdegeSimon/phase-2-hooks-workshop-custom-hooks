import { useState, useEffect } from "react";

export function usePokemon(query) {
  const [state, setState] = useState({
    data: null,
    status: "idle",
    errors: null
  });

  useEffect(() => {
    if (!query) {
      setState({ data: null, status: "idle", errors: null });
      return;
    }

    setState({ data: null, status: "pending", errors: null });

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        return r.text().then(text => {
          throw new Error(text || "Failed to fetch");
        });
      })
      .then(data => {
        setState({
          data: {
            id: data.id,
            name: data.name
          },
          status: "fulfilled",
          errors: null
        });
      })
      .catch(error => {
        setState({
          data: null,
          status: "rejected",
          errors: [error.message]
        });
      });
  }, [query]);

  return state;
}