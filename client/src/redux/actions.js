import axios from "axios";
import {
  GET_POKEMONS,
  GET_BY_NAME,
  GET_TYPES,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  POST_POKEMON,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  GET_BY_ID,
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

export const getById = (id) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error.message);
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

export const orderByName = (orden) => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_BY_NAME,
      payload: orden,
    });
  };
};

export const orderByAttack = (orden) => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_BY_ATTACK,
      payload: orden,
    });
  };
};

export const filterByType = (tipo) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_TYPE,
      payload: tipo,
    });
  };
};

export const filterByOrigin = (origen) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_ORIGIN,
      payload: origen,
    });
  };
};
