import Joi from 'joi';
import RequestTypes from '../../common/requestTypes';

const createCategorySchema = {
  [RequestTypes.Body]: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string(),
    imageUrl: Joi.string()
  })
};
const updateCategorySchema = {
  [RequestTypes.Body]: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    color: Joi.string(),
    imageUrl: Joi.string()
  })
};

export default { createCategorySchema, updateCategorySchema };
