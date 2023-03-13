const mongoose = require("mongoose");



const pokemonSchema = new mongoose.Schema({

        name: String,
        attacks:Array,
        abilities: Array,
        image: String,
        hp: String,

})



module.exports = mongoose.model("Pokemon", pokemonSchema);
