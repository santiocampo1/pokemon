import {
  GET_POKEMONS,
  GET_BY_NAME,
  GET_TYPES,
  CREATE_POKEMON,
  ORDER_BY_NAME,
  FILTER_BY_TYPE,
  ORDER_BY_ATTACK,
  FILTER_BY_ORIGIN,
  GET_BY_ID,
} from "./action_types";

// Configuración de los estados globales.
let initialState = {
  allPokemons: [],
  allTypes: [],
  pokemonsOrderedByName: [],
  pokemonsOrderedByAttack: [],
  pokemonsFiltered: [],
  pokemonsByOrigin: [],
  pokemonDetail: {},
  orderName: false,
  orderAttack: false,
  filterType: false,
  filterOrigin: false,
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

    case GET_BY_ID:
      return {
        ...state,
        pokemonDetail: action.payload,
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

    case ORDER_BY_NAME:
      if (action.payload === "ascendente") {
        return {
          ...state,
          orderName: true,
          pokemonsOrderedByName: [...state.allPokemons].sort(
            (prevPoke, nextPoke) => {
              if (prevPoke.name > nextPoke.name) return -1;
              if (prevPoke.name < nextPoke.name) return 1;
              return 0;
            }
          ),
        };
      } else if (action.payload === "descendente") {
        return {
          ...state,
          orderName: true,
          pokemonsOrderedByName: [...state.allPokemons].sort(
            (prevPoke, nextPoke) => {
              if (prevPoke.name > nextPoke.name) return 1;
              if (prevPoke.name < nextPoke.name) return -1;
              return 0;
            }
          ),
        };
      } else {
        return {
          ...state,
          orderName: false,
        };
      }

    case ORDER_BY_ATTACK:
      if (action.payload === "ascendente") {
        return {
          ...state,
          orderAttack: true,
          pokemonsOrderedByAttack: [...state.allPokemons].sort(
            (prevPoke, nextPoke) => {
              if (prevPoke.attack > nextPoke.attack) return -1;
              if (prevPoke.attack < nextPoke.attack) return 1;
              return 0;
            }
          ),
        };
      } else if (action.payload === "descendente") {
        return {
          ...state,
          orderAttack: true,
          pokemonsOrderedByAttack: [...state.allPokemons].sort(
            (prevPoke, nextPoke) => {
              if (prevPoke.attack > nextPoke.attack) return 1;
              if (prevPoke.attack < nextPoke.attack) return -1;
              return 0;
            }
          ),
        };
      } else {
        return {
          ...state,
          orderAttack: false,
        };
      }

    case FILTER_BY_TYPE:
      let pokemonsTypeFiltered;
      if (action.payload === "-") {
        return {
          ...state,
          filterType: false,
        };
      } else {
        pokemonsTypeFiltered = state.allPokemons.filter((poke) =>
          poke.types.includes(action.payload)
        );
      }
      return {
        ...state,
        filterType: true,
        pokemonsFiltered: pokemonsTypeFiltered,
      };

    case FILTER_BY_ORIGIN:
      if (action.payload === "Base de datos") {
        return {
          ...state,
          filterOrigin: true,
          pokemonsByOrigin: [...state.allPokemons].filter(
            (poke) => typeof poke.id === "string"
          ),
        };
      } else if (action.payload === "API") {
        return {
          ...state,
          filterOrigin: true,
          pokemonsByOrigin: [...state.allPokemons].filter(
            (poke) => typeof poke.id === "number"
          ),
        };
      } else {
        return {
          ...state,
          filterOrigin: false,
        };
      }

    default:
      return state;
  }
};

export default reducer;
