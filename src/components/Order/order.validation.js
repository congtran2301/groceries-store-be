import Joi from 'joi';
import { Statuses } from './order.config';
const createOrder = Joi.object({
  phone: Joi.string().required(),
  address: Joi.string().required(),
  productIds: Joi.array()
    .items(
      Joi.object({
        quantity: Joi.number()
          .integer()
          .min(1)
          .message('quantity must be greater than or equal to 1'),
        id: Joi.string()
      })
    )
    .required()
});
const updateOrder = Joi.object({
  status: Joi.string().valid(...Object.values(Statuses)),
  isPaid: Joi.boolean()
});

export default {
  createOrder,
  updateOrder
};
