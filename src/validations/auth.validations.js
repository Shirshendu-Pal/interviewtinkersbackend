const Joi = require("joi");

module.exports.register = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().required(),
    })
};

module.exports.login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};