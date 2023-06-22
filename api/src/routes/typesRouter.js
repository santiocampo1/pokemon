const { Router } = require("express");
const typeRouter = Router();
const { getTypesHandler } = require("../handlers/typesHandlers");

typeRouter.get("/", getTypesHandler);

module.exports = typeRouter;
