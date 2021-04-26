import Joi from 'joi';
import { mongoId, mongoIdSchema } from '../../common/joiSchema';
import RequestTypes from '../../common/requestTypes';

const addToCartSchema = {
  [RequestTypes.Body]: Joi.object({
    productId: mongoId,
    quantity: Joi.required()
  })
};

const updateCartItemSchema = {
  [RequestTypes.Body]: Joi.object({
    cartItemId: mongoId,
    quantity: Joi.required()
  })
};

const deleteCartItemSchema = {
  [RequestTypes.Params]: mongoIdSchema
};

export default { addToCartSchema, updateCartItemSchema, deleteCartItemSchema };
