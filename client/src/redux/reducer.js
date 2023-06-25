import { GET_POKEMONS } from "./action_types";
let initialState = { allPokemons: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
