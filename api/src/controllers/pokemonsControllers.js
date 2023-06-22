const { Pokemon } = require("../db"); // Modelo Pokemon
const axios = require("axios");

// name - id - sprites - stats - height - weight
// sprites --> front-default === image
// stats[0].base_stat --> hp
// stats[1].base_stat --> attack
// stats[2].base_stat --> defense
// stats[5].base_stat --> speed

const getAllPokemons = async () => {
  const pokemonsDB = await Pokemon.findAll();
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );

  const apiData = response.data.results;

  const pokemonsApi = await Promise.all(
    apiData.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      const pokemonData = response.data;
      const { id, sprites, stats, height, weight } = pokemonData;
      const { front_default: image } = sprites;
      const hp = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const speed = stats[5].base_stat;

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
        inDB: false,
      };
    })
  );

  const combinedPokemons = [...pokemonsDB, ...pokemonsApi];
  return combinedPokemons;
};

const getPokemonByName = async (name) => {
  const lowerName = name.toLowerCase();

  const nameDB = await Pokemon.findOne({ where: { name: lowerName } });
  if (!nameDB) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${lowerName}`
    );
    const apiData = response.data;

    if (!apiData) {
      throw new Error(`El pokemon ${name} no existe`);
    }
    const { id, sprites, stats, height, weight } = apiData;
    const { front_default: image } = sprites;

    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const speed = stats[5].base_stat;

    const pokemonData = {
      name: lowerName,
      id,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      inDB: false, // --> si es false, viene de la api. Si es true, viene de la database.
    };

    return [pokemonData];
  }

  return [nameDB];
};

const createPokemonDB = async (
  id,
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  return await Pokemon.findOrCreate({
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
    },
  });
};

const getPokemonById = async (id) => {
  const source = isNaN(+id) ? "bdd" : "api";

  if (source === "api") {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = response.data;
    const { name, sprites, stats, height, weight } = pokemonData;
    const { front_default: image } = sprites;
    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const speed = stats[5].base_stat;

    return {
      name,
      id,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      inDB: false,
    };
  } else {
    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) throw new Error(`El pokemon con ID ${id} no existe`);

    return {
      name: pokemon.name,
      id: pokemon.id,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      height: pokemon.height,
      weight: pokemon.weight,
      inDB: true,
    };
  }
};

module.exports = {
  createPokemonDB,
  getPokemonById,
  getPokemonByName,
  getAllPokemons,
};
