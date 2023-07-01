const {
  createPokemonDB,
  getPokemonById,
  getPokemonByName,
  getAllPokemons,
} = require("../controllers/pokemonsControllers");

const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const pokemonByname = await getPokemonByName(name);
      return res.status(200).json(pokemonByname);
    }

    const response = await getAllPokemons();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getPokemonById(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;

  if (!name || !image || !hp || !attack || !defense)
    return res.status(400).send("Faltan datos obligatorios.");

  try {
    const response = await createPokemonDB(
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

    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonsHandler,
  getPokemonIdHandler,
  createPokemonHandler,
};
