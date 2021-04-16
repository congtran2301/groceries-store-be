import Joi from 'joi';
import { positiveNumber, mongoId } from '../../common/joiSchema';
const createProduct = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: positiveNumber.message('Price must be greater than or equal to 1'),
  categoryId: mongoId,
  imageUrls: Joi.array().items(Joi.string()).required()
});
export default { createProduct };
