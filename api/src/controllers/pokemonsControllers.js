const { Pokemon, Type } = require("../db"); // Modelo Pokemon
const axios = require("axios");

// Función para traer 50 pokemones de la api.
const getPokemonsApi = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );
    const dataPokemon = response.data.results;

    const pokemons = await Promise.all(
      dataPokemon.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const pokemonData = response.data;
        const { id, sprites, stats, height, weight, types } = pokemonData;
        const image = sprites.other.dream_world.front_default;
        const hp = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const speed = stats[5].base_stat;
        const type = types.map((element) => element.type.name);

        return {
          name: pokemon.name,
          id,
          image,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          types: type,
        };
      })
    );
    return pokemons;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para obtener la info de la DB
const getPokemonsDb = async () => {
  const allPokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
    },
  });

  const mapPokeInfo = allPokemonsDb.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      attack: pokemon.attack,
      hp: pokemon.hp,
      defense: pokemon.defense,
      speed: pokemon.speed,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((type) => type.name),
    };
  });
  return mapPokeInfo;
};

const getAllPokemons = async () => {
  const pokemonsDataBase = await getPokemonsDb();
  const pokemonsApi = await getPokemonsApi();

  const combinedPokemons = [...pokemonsDataBase, ...pokemonsApi];
  return combinedPokemons;
};

const getPokemonByName = async (name) => {
  const lowerName = name.toLowerCase();

  const nameDB = await Pokemon.findOne({ where: { name: lowerName } });
  if (!nameDB) {
    const pokemonsApi = await getPokemonsApi();
    const pokemonName = pokemonsApi.filter(
      (pokemon) => pokemon.name === lowerName
    );

    if (!pokemonName) throw new Error("El pokemon que está buscando no existe");

    return pokemonName;
  }

  return nameDB;
};

const createPokemonDB = async (
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  // Verificar que no exista en la api.
  const pokemonsApi = await getPokemonsApi();
  const existingPokemonApi = pokemonsApi.find(
    (pokemonApi) => pokemonApi.name.toLowerCase() === name.toLowerCase()
  );

  if (existingPokemonApi) {
    throw new Error("¡Error! Ya existe un pokemon con ese nombre en la API.");
  }

  const [pokemon, created] = await Pokemon.findOrCreate({
    where: { name },
    defaults: {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    },
  });

  // Verificar que no exista en la bdd.
  if (!created)
    throw new Error(
      "Error! Ya existe un pokemón con ese nombre en la base de datos."
    );

  const type = await Type.findAll({ where: { name: types } }); // Buscar el tipo por nombre
  pokemon.setTypes(type); // Establecer la relación entre el pokemon y el tipo
};

const getPokemonById = async (id) => {
  const source = isNaN(id) ? "bdd" : "api"; // true | false

  if (source === "api") {
    const pokemonsApi = await getPokemonsApi();

    const foundPokemon = pokemonsApi.find((pokemon) => pokemon.id === +id);
    if (!foundPokemon) {
      throw new Error(`No se encontró el pokemon con el ID: ${id}`);
    }
    return foundPokemon;
  } else {
    const pokemonDb = await Pokemon.findByPk(id);

    if (!pokemonDb) throw new Error(`El pokemon con ID ${id} no existe`);

    return pokemonDb;
  }
};

module.exports = {
  createPokemonDB,
  getPokemonById,
  getPokemonByName,
  getAllPokemons,
};
