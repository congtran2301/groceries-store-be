import Joi from 'joi';
import { positiveNumber, mongoId } from '../../common/joiSchema';
import RequestTypes from '../../common/requestTypes';

const createProduct = {
  [RequestTypes.Body]: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string(),
    price: positiveNumber.message('Price must be greater than or equal to 0'),
    height: positiveNumber.message('Height must be greater than or equal to 0'),
    weight: positiveNumber.message('Weight must be greater than or equal to 0'),
    width: positiveNumber.message('Width must be greater than or equal to 0'),
    length: positiveNumber.message('Length must be greater than or equal to 0'),
    categoryId: mongoId.required(),
    measureId: mongoId,
    status: Joi.number().valid(0, 1, 2),
    imageUrls: Joi.array().items(Joi.string()).required()
  })
};
const updateProduct = {
  [RequestTypes.Body]: Joi.object({
    name: Joi.string().min(3).max(50),
    description: Joi.string(),
    price: positiveNumber.message('Price must be greater than or equal to 0'),
    height: positiveNumber.message('Height must be greater than or equal to 0'),
    weight: positiveNumber.message('Weight must be greater than or equal to 0'),
    width: positiveNumber.message('Width must be greater than or equal to 0'),
    length: positiveNumber.message('Length must be greater than or equal to 0'),
    categoryId: mongoId,
    measureId: mongoId,
    status: Joi.number().valid(0, 1, 2),
    imageUrls: Joi.array().items(Joi.string())
  })
};
const getProducts = {
  [RequestTypes.Query]: Joi.object({
    categoryId: mongoId
  })
};
export default { createProduct, updateProduct, getProducts };
