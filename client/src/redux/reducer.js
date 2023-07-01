import {
  GET_POKEMONS,
  GET_BY_NAME,
  GET_TYPES,
  CREATE_POKEMON,
  ORDER,
  FILTER,
} from "./action_types";

// Configuración de los estados globales.
let initialState = {
  allPokemons: [],
  allTypes: [],
  pokemonsOrdered: [],
  pokemonsFiltered: [],
  orders: false,
  filters: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
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

    case ORDER:
      if (action.payload === "ascendente") {
        return {
          ...state,
          orders: true,
          pokemonsOrdered: [...state.allPokemons].sort((prevPoke, nextPoke) => {
            if (
              prevPoke.name > nextPoke.name &&
              prevPoke.attack > nextPoke.attack
            )
              return -1;
            if (
              prevPoke.name < nextPoke.name &&
              prevPoke.attack < nextPoke.attack
            )
              return 1;
            return 0;
          }),
        };
      } else if (action.payload === "descendente") {
        return {
          ...state,
          orders: true,
          pokemonsOrdered: [...state.allPokemons].sort((prevPoke, nextPoke) => {
            if (
              prevPoke.name > nextPoke.name &&
              prevPoke.attack > nextPoke.attack
            )
              return 1;
            if (
              prevPoke.name < nextPoke.name &&
              prevPoke.attack < nextPoke.attack
            )
              return -1;
            return 0;
          }),
        };
      }

    case FILTER:
      return {
        ...state,
        pokemonsFiltered: [...state.allPokemons].filter((pokemon) =>
          pokemon.type.includes(action.payload)
        ),
        filters: true,
      };

    default:
      return state;
  }
};

export default reducer;
