import Joi from "joi";

const create = Joi.object({
  items: Joi.object().required(),
  mover_id: Joi.number().required(),
  carry_weight: Joi.number().required(),
  weight_limit: Joi.number().required(),
});

const update = Joi.object({
  items: Joi.object().required(),
  mover_id: Joi.number().required(),
  carry_weight: Joi.number().required(),
  weight_limit: Joi.number().required(),
});

export default { create, update };
