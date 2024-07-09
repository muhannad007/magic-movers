import Joi from "joi";

const create = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  weight_limit: Joi.number().required(),
  energy: Joi.number().required(),
  quest_state: Joi.string().required(),
});

const update = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  weight_limit: Joi.number().required(),
  energy: Joi.number().required(),
  quest_state: Joi.string().required(),
});

export default { create, update };
