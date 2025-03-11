import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
  UseFormRegister,
} from "react-hook-form";
import { FormField } from "./FormField";
import { FormFields } from "../types/FormFields";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Dropdown } from "./Dropdown";
import { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemons";
import { fetchAllPokemons } from "../utils/fetchAllPokemons";
import { Badge } from "./Badge";

interface Props {
  control: Control<FormFields, any>;
  error?:
    | Merge<
        FieldError,
        (
          | Merge<
              FieldError,
              FieldErrorsImpl<{
                name: string;
                url: string;
              }>
            >
          | undefined
        )[]
      >
    | undefined;
  heightClass?: string;
  widthClass?: string;
  selectedPokemons?: Pokemon[];
}

export const PokemonSelect: React.FC<Props> = ({
  control,
  error,
  heightClass = "h-8",
  widthClass = "w-full",
  selectedPokemons = [],
}) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [pokemonsFromServer, setPokemonsFromServer] = useState<Pokemon[]>([]);

  const { field: selectedPokemonsField } = useController({
    name: "selectedPokemons",
    control,
    defaultValue: selectedPokemons,
    rules: {
      validate: (value) =>
        value.length === 4 || "You msut have 4 pokemons in your team",
    },
  });

  const handleClick = useCallback(() => {
    setIsDropdownShown((cur) => !cur);
  }, []);

  const handleClearPokemons = useCallback(() => {
    setPokemonsFromServer((cur) => [...selectedPokemonsField.value, ...cur]);
    selectedPokemonsField.onChange([]);
  }, [selectedPokemonsField.value]);

  const handleXClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation();
      handleClearPokemons();
    },
    [handleClearPokemons],
  );

  const handleSelectPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (selectedPokemonsField.value.length >= 4) {
        return;
      }

      selectedPokemonsField.onChange([...selectedPokemonsField.value, pokemon]);
      setPokemonsFromServer((cur) =>
        cur.filter((p) => p.name !== pokemon.name),
      );
    },
    [selectedPokemonsField.value],
  );

  const handleRemovePokemon = useCallback(
    (pokemon: Pokemon) => {
      selectedPokemonsField.onChange(
        selectedPokemonsField.value.filter(
          (p: Pokemon) => p.name !== pokemon.name,
        ),
      );

      setPokemonsFromServer((cur) => [pokemon, ...cur]);
    },
    [selectedPokemonsField.value],
  );

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const pokemons = await fetchAllPokemons();
        setPokemonsFromServer(pokemons.flat());
      } catch (error) {
        console.error(error);
      }
    };

    loadPokemons();
  }, []);

  return (
    <FormField
      label="Gather the strongest pokemon team!"
      required={true}
      info="Select the pokemons you would like to see in your team"
    >
      <div onClick={handleClick}>
        <div className="absolute end-0 flex cursor-pointer gap-1 rounded-sm bg-white px-3 py-2">
          {selectedPokemonsField.value.length !== 0 && (
            <XMarkIcon className="size-4" onClick={handleXClick} />
          )}

          {isDropdownShown ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </div>

        <button
          type="button"
          className={`flex ${heightClass} ${widthClass} cursor-pointer gap-1 rounded-sm px-3 py-2 text-start text-xs text-gray-400 shadow outline outline-gray-300 transition hover:outline-3 hover:outline-purple-800 focus:outline-3 focus:outline-purple-800`}
        >
          {selectedPokemonsField.value.length === 0
            ? "Select your pokemons!"
            : selectedPokemonsField.value.map((pokemon) => {
                return (
                  <Badge
                    pokemon={pokemon}
                    handleRemovePokemon={handleRemovePokemon}
                    key={pokemon.name}
                  />
                );
              })}
        </button>
      </div>

      {isDropdownShown && (
        <Dropdown
          pokemons={pokemonsFromServer}
          onSelect={handleSelectPokemon}
        />
      )}

      <p className="text-gray-400">{error?.message}</p>
    </FormField>
  );
};
