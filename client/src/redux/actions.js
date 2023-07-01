import axios from "axios";
import {
  GET_POKEMONS,
  GET_BY_NAME,
  GET_TYPES,
  ORDER,
  POST_POKEMON,
  FILTER,
} from "./action_types";

// Actions
export const getPokemons = () => {
  try {
    return async (dispatch) => {
      const response = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getByName = (name) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTypes = () => {
  try {
    return async (dispatch) => {
      const response = await axios("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const postPokemon = (info) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/pokemons", info);
      alert("El pokemón ha sido creado exitosamente.");
      return dispatch({
        type: POST_POKEMON,
        payload: response.status,
      });
    } catch (error) {
      alert("No se ha podido crear el Pokemón. Verifica que no esté repetido.");
    }
  };
};

export const order = (orden) => {
  return (dispatch) => {
    return dispatch({
      type: ORDER,
      payload: orden,
    });
  };
};

export const filterTypes = (tipo) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER,
      payload: tipo,
    });
  };
};
