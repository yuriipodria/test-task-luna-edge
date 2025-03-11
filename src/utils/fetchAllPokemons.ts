import axios from "axios";
import { Pokemon } from "../types/Pokemons";

export const fetchAllPokemons = async (): Promise<Pokemon[][]>  => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};
