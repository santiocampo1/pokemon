const { getTypes } = require("../controllers/typeControllers");

const getTypesHandler = async (req, res) => {
  try {
    const typesPokemons = await getTypes();

    res.status(200).json(typesPokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypesHandler };
