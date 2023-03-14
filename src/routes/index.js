const express = require('express');
const router = express.Router();
const authRoutes = require("./auth.routes");
const pokemonRoutes = require("./pokemons.routes");

const routes = [
    {
        path: "/",
        route: authRoutes
    },
    {
        path: "/",
        route: pokemonRoutes
    }
]



routes.forEach((obj) => {
    router.use(obj.path, obj.route);
});

module.exports = router;