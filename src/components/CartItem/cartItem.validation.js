import Joi from 'joi';
import { mongoId } from '../../common/joiSchema';
const addToCartSchema = Joi.object({
  productId: mongoId,
  quantity: Joi.required()
});
const updateCartItemSchema = Joi.object({
  cartItemId: mongoId,
  quantity: Joi.required()
});

export default { addToCartSchema, updateCartItemSchema };
