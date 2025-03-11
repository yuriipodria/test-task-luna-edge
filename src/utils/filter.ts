import { Pokemon } from "../types/Pokemons";

export const filter = (pokemons: Pokemon[], query: string) => {
  return pokemons.filter((p) =>
    p.name.trim().toLowerCase().includes(query.trim().toLowerCase()),
  );
};
