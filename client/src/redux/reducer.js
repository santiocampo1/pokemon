import {
  GET_POKEMONS,
  GET_BY_NAME,
  GET_TYPES,
  CREATE_POKEMON,
} from "./action_types";

// Configuración de los estados globales.
let initialState = { allPokemons: [], pokemonsCopy: [], allTypes: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemonsCopy: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case CREATE_POKEMON:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
