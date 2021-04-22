import Joi from 'joi';
import { mongoId } from '../../common/joiSchema';
const addToCart = Joi.object({
  productId: mongoId,
  quantity: Joi.required()
});

export default { addToCart };
