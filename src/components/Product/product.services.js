import Product from './product.model';
/**
 *
 * @param {*} product
 * @param {Product[]} populations
 * @returns {Promise<*>} {a: 123, b: 456}
 */
const createProduct = async (product, populations = []) => {
  const newProduct = new Product(product);
  await newProduct.save();
  return newProduct.populate(populations).execPopulate();
};

const getProducts = async ({ query, pagination, populations = [] }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await Product.find(query).skip(skip).limit(perPage);
};

const getActiveProducts = async ({ query, pagination, populations = [] }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await Product.find({ ...query, isDelete: false })
    .skip(skip)
    .limit(perPage);
};

const getOneProduct = async (query) => {
  const product = await Product.findOne(query);
  if (!product) throw new Error('Product not found');
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

const searchProduct = async (text) => {
  const matchProduct = await Product.find(
    { $text: { $search: text } },
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
  getOneProduct,
  deleteProduct,
  updateProduct,
  searchProduct
};
