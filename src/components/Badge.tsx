import { XMarkIcon } from "@heroicons/react/24/solid";
import { Pokemon } from "../types/Pokemons";
import { useCallback } from "react";

interface Props {
  pokemon: Pokemon;
  handleRemovePokemon: (pokemon: Pokemon) => void;
}

export const Badge: React.FC<Props> = ({ pokemon, handleRemovePokemon }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex size-max cursor-default items-center gap-1 rounded-xl bg-gray-100 px-[10px] py-[2px] text-[10px] text-black"
    >
      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}

      <XMarkIcon
        className="size-3 cursor-pointer text-gray-500"
        onClick={() => handleRemovePokemon(pokemon)}
      />
    </div>
  );
};
