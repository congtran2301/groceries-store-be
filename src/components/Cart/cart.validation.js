import Joi from 'joi'
const CartProduct = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.required()
})

export default { CartProduct }
