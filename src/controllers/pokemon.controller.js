const httpStatus = require("http-status");
const { catchAsync } = require("../utils/catchAsync");
const { pokemonService } = require("../services");
const path = require('path');
const axios = require("axios")

module.exports.addPokemon = catchAsync(async (req, res) => {
    const pokemon = await pokemonService.addPokemon(req.file,req.body);
    res.status(httpStatus.OK).json({ success: true , pokemon});
});
module.exports.getPokemons = catchAsync(async (req, res) => {
    const pokemon = await pokemonService.getPokemons(req.query);
    res.status(httpStatus.OK).json({ success: true , pokemon});
});
module.exports.addHp = catchAsync(async (req, res) => {
    const pokemon = await pokemonService.addHp();
    res.status(httpStatus.OK).json({ success: true , pokemon});
});
module.exports.multiplePokemon = catchAsync(async (req, res) => {
    // ;
    let data = await axios.get("https://api.pokemontcg.io/v2/cards?page=2&pageSize=10")
    const pokemon = await pokemonService.addMultiplePokemons(req.query,data);
    res.status(httpStatus.OK).json({ success: true , data});
});
