const { Router } = require("express");
const pokemonRouter = require("./pokemonsRouter");
const typeRouter = require("./typesRouter");

const router = Router();
// Configurar los router:
router.use("/pokemons", pokemonRouter);
router.use("/types", typeRouter);

module.exports = router;
