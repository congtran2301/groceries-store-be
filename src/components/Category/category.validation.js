import Joi from 'joi';

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string(),
  imageUrl: Joi.string()
});
const updateCategorySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
  imageUrl: Joi.string()
});

export default { createCategorySchema, updateCategorySchema };
