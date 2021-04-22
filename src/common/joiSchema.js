import Joi from 'joi';

export const mongoId = Joi.string()
  .regex(new RegExp('^[0-9a-fA-F]{24}$'))
  .message('Invalid id');

export const isoDate = Joi.date().iso();

export const positiveNumber = Joi.number().integer().min(1);

export const mongoIdSchema = Joi.object({
  id: Joi.string()
    .regex(new RegExp('^[0-9a-fA-F]{24}$'))
    .message('Invalid id')
    .required()
});
