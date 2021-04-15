import Joi from 'joi';

export const mongoIdSchema = Joi.object({
  id: Joi.string()
    .regex(new RegExp('^[0-9a-fA-F]{24}$'))
    .message('Invalid id')
    .required()
});
