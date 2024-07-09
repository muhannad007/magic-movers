import Joi from "joi";

const create = Joi.object({
  item_name: Joi.string().required(),
  item_weight: Joi.number().required(),
});

const update = Joi.object({
  item_name: Joi.string().required(),
  item_weight: Joi.number().required(),
});

export default { create, update };
