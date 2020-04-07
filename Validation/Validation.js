const Joi = require("@hapi/joi");

const registerValidation = () => {
  const Schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
};
