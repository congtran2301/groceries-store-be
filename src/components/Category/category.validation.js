import Joi from 'joi';

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});
const updateCategorySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string()
});

export default { createCategorySchema, updateCategorySchema };
