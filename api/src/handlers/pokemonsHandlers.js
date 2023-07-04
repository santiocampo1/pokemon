const {
  createPokemonDB,
  getPokemonById,
  getPokemonByName,
  getAllPokemons,
} = require("../controllers/pokemonsControllers");

// Handler para obtener los pokemons.
const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const pokemonByName = await getPokemonByName(name);
      return res.status(200).json(pokemonByName);
    }

    const response = await getAllPokemons();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handler para obtener los pokemons según Id pasado por parámetro.
const getPokemonIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getPokemonById(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handler para crear un pokemon en la Base de Datos. Recibe por body los datos.
const createPokemonHandler = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;

  if (!name || !image || !hp || !attack || !defense)
    return res.status(400).send("Faltan datos obligatorios.");

  try {
    await createPokemonDB(
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );

    res.status(200).send("Se ha creado el pokemon con éxito.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonsHandler,
  getPokemonIdHandler,
  createPokemonHandler,
};
