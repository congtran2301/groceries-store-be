import Joi from 'joi';
import RequestTypes from '../../common/requestTypes';
import { email, phoneNumber } from '../../common/joiSchema';

const createSupplierSchema = {
  [RequestTypes.Body]: Joi.object({
    name: Joi.string().min(2).required(),
    representation: Joi.string().required(),
    phone: phoneNumber.required(),
    email: email.required(),
    address: Joi.string().required(),
    description: Joi.string(),
    provine: Joi.string(),
    city: Joi.string(),
    district: Joi.string(),
    ward: Joi.string(),
    imageUrl: Joi.string()
  })
};

export default {
  createSupplierSchema
};
