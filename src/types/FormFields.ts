import { Pokemon } from "./Pokemons";

export interface FormFields {
  firstName: string;
  lastName: string;
  selectedPokemons: Pokemon[];
}