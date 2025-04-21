// utils/validate.js
const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
});

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'employee').optional()
});

module.exports = { loginSchema, registerSchema };