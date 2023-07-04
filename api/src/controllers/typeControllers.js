const { Type } = require("../db"); // Modelo Type
const axios = require("axios");

// Función controller que devuelve los types.
const getTypes = async () => {
  const typesFromDB = await Type.findAll();

  if (typesFromDB.length === 0) {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const dataType = response.data.results;

    const types = dataType.map((type) => type.name);

    await Type.bulkCreate(types.map((type) => ({ name: type })));
  }

  const types = await Type.findAll();
  return types;
};

module.exports = { getTypes };
