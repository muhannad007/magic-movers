import Joi from "joi";

const create = Joi.object({
  title: Joi.string().required(),
  state: Joi.string().required(),
  mover_id: Joi.string().required(),
});

const update = Joi.object({
  title: Joi.string().required(),
  state: Joi.string().required(),
  mover_id: Joi.string().required(),
});

export default { create, update };
