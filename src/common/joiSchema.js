import Joi from 'joi';

export const mongoId = Joi.string()
  .regex(new RegExp('^[0-9a-fA-F]{24}$'))
  .message('Invalid id');

export const email = Joi.string()
  .regex(
    new RegExp('^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$')
  )
  .message('Invalid email');

export const phoneNumber = Joi.string()
  .regex(new RegExp('^(84|0)([3|5|7|8|9])([0-9]{8})$'))
  .message('Invalid phone number');

export const isoDate = Joi.date().iso();

export const positiveNumber = Joi.number().min(0);

export const mongoIdSchema = Joi.object({
  id: Joi.string()
    .regex(new RegExp('^[0-9a-fA-F]{24}$'))
    .message('Invalid id')
    .required()
});
