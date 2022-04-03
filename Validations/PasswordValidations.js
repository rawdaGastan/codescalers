const Joi = require('joi');

module.exports = {
    createSchema : Joi.object({
        FQDN: Joi.string().regex(RegExp('(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)')).required(),
        username: Joi.string().alphanum().min(3).max(25).trim(true).required(),
        password: Joi.string().min(4).required().strict()
    }),

    updateSchema : Joi.object({
        FQDN: Joi.string().regex(RegExp('(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)')),
        username: Joi.string().alphanum().min(3).max(25).trim(true),
        password: Joi.string().min(4).strict()
    }),
}