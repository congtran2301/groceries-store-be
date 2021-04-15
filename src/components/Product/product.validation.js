import Joi from "joi";
const Product = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(0).required(),
  categoryId: Joi.string().required(),
  imageUrls: Joi.array().items(Joi.string()).required(),
});
export default Product;
