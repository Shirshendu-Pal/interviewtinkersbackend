const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { pokemonValidation } = require("../validations");
const { pokemonController } = require("../controllers");
const multer = require("multer");
const {upload} = require("../uploads/multer.uploads")
const {authCheck} = require("../middlewares/auth.js")

router.post("/add-pokemon",upload.single("image"), validate(pokemonValidation.addPokemon), pokemonController.addPokemon)
router.get("/add-multiple-pokemon", pokemonController.multiplePokemon)
router.get("/pokemons",authCheck, validate(pokemonValidation.getPokemons), pokemonController.getPokemons)
router.post("/static-add-hp-pokemons", pokemonController.addHp)

module.exports = router;