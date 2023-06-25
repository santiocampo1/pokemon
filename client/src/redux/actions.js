import axios from "axios";
import { GET_POKEMONS } from "./action_types";

export const getPokemons = () => {
  return async (dispatch) => {
    const response = await axios("https://pokeapi.co/api/v2/pokemon?limit=50");
    return dispatch({
      type: GET_POKEMONS,
      payload: response.data,
    });
  };
};
