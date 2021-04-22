import Joi from 'joi';
import { positiveNumber, mongoId } from '../../common/joiSchema';

const createMeasure = {
  body: Joi.object({
    sign: Joi.string().min(1).max(6),
    description: Joi.string()
  })
};

export default {
  createMeasure
};
