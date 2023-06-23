const { Type } = require("../db"); // Modelo Type
const axios = require("axios");

const getTypes = async () => {
  const typesFromDB = await Type.findAll();

  if (typesFromDB.length === 0) {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const dataType = response.data.results;

    const types = dataType.map((type) => type.name);

    await Type.bulkCreate(types.map((type) => ({ name: type }))); // Guardar los tipos de la api en la base de datos
  }

  const types = await Type.findAll();
  return types;
};

module.exports = { getTypes };
