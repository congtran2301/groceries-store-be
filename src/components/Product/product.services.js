import Product from './product.model';
import CustomError from '../../common/CustomError';

// const populateOptions = {
// category: {
// path: 'category',
// select: ['color', 'imageUrl', 'name', 'description']
// },
// measure: {
// path: 'measure',
// select: ['sign', 'description']
// }
// };

const createProduct = async (product, populations = []) => {
  const newProduct = new Product(product);
  await newProduct.save();
  return newProduct.populate(populations).execPopulate();
};

const getProducts = async ({ query, pagination, populations = [] }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await Product.find(query, null, { populate: populations })
    .skip(skip)
    .limit(perPage)
    .exec();
};

const getActiveProducts = async ({ query, pagination, populations = [] }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await Product.find({ ...query, isDelete: false })
    .skip(skip)
    .limit(perPage);
};

const getProduct = async (query) => {
  const product = await Product.findOne(query, null, {
    populate: [
      {
        path: 'category',
        select: ['color', 'imageUrl', 'name', 'description']
      },
      {
        path: 'measure',
        select: ['sign', 'description']
      }
    ]
  });
  if (!product) throw new CustomError('Product not found', 400);
  return product;
};
const countProducts = async (query = {}) => {
  return await Product.countDocuments(query);
};

const deleteProduct = async (query) => {
  return await Product.findOneAndUpdate(
    query,
    { isDelete: true },
    { new: true }
  );
};

const searchProduct = async (text, query = { isDelete: false }) => {
  const matchProduct = await Product.find(
    { ...query, $text: { $search: text } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
  const count = await Product.find(
    { $text: { $search: text } },
    { score: { $meta: 'textScore' } }
  ).countDocuments();
  return {
    count,
    matchProduct
  };
};

const updateProduct = async (query, data) => {
  return await Product.findOneAndUpdate(query, data, { new: true });
};

export default {
  getProducts,
  getActiveProducts,
  countProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  searchProduct
};
