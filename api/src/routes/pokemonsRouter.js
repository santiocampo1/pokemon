const { Router } = require("express");
const pokemonRouter = Router();
const {
  getPokemonsHandler,
  getPokemonIdHandler,
  createPokemonHandler,
} = require("../handlers/pokemonsHandlers");

pokemonRouter.get("/", getPokemonsHandler);

pokemonRouter.get("/:id", getPokemonIdHandler);

pokemonRouter.post("/", createPokemonHandler);

module.exports = pokemonRouter;
