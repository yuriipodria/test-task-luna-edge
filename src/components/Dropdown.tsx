import { useCallback, useMemo, useState } from "react";
import { Pokemon } from "../types/Pokemons";
import { filter } from "../utils/filter";

interface Props {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

export const Dropdown: React.FC<Props> = ({ pokemons, onSelect }) => {
  const [query, setQuery] = useState("");
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );
  const toDisplay = filter(pokemons.flat(), query);

  return (
    <div className="absolute left-1/2 z-10 mt-11 flex max-h-80 w-90 origin-top-right -translate-x-1/2 transform flex-col justify-start overflow-y-scroll rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        className="my-2 w-4/5 self-center rounded-lg p-2 text-sm shadow outline outline-gray-300 hover:outline-gray-400 focus:outline-gray-500"
        placeholder="Filter by name..."
      />

      {toDisplay.map((pokemon) => (
        <p
          key={pokemon.name}
          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => onSelect(pokemon)}
        >
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </p>
      ))}
    </div>
  );
};
