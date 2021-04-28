import Joi from 'joi';
import RequestTypes from '../../common/requestTypes';
import { Statuses } from './order.config';
import { mongoId, positiveNumber, phoneNumber } from '../../common/joiSchema';

const createOrder = {
  [RequestTypes.Body]: Joi.object({
    phone: phoneNumber.required(),
    address: Joi.string().required(),
    productIds: Joi.array()
      .items(
        Joi.object({
          quantity: positiveNumber.message(
            'quantity must be greater than or equal to 1'
          ),
          id: mongoId
        })
      )
      .required()
  })
};
const updateOrder = {
  [RequestTypes.Body]: Joi.object({
    status: Joi.string().valid(...Object.values(Statuses)),
    isPaid: Joi.boolean()
  })
};

export default {
  createOrder,
  updateOrder
};
