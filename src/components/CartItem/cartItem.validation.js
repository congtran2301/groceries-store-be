import Joi from 'joi';
const AddToCart = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.required()
});
const UpdateCartItem = Joi.object({
  cartItemId: Joi.string().required(),
  quantity: Joi.required()
});

export default { AddToCart, UpdateCartItem };
