const getTypesHandler = (req, res) => {
  res.status(200).send("Aca van todos los types de pokemons");
};

module.exports = { getTypesHandler };
