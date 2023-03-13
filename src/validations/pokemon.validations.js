const Joi = require("joi");

module.exports.addPokemon = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        attacks: Joi.array().required(),
        abilities: Joi.array().required(),
        image: Joi.string().optional().allow(null, ""),
        userId: Joi.string().required()
    })
};



  module.exports.visitor_get = {
    query: Joi.object().keys({
        page: Joi.number().required(),
        pageSize: Joi.number().required()
    })
}