import Category from './category.model';
import CustomError from '../../common/CustomError';

const createCategory = async (category) => {
  const newCategory = new Category(category);
  await newCategory.save();
  return newCategory;
};
const getOneCategory = async (query) => {
  const category = await Category.findOne(query);
  if (!category) throw new CustomError('Category does not exist', 400);
  return category;
};

const deleteCategory = async (query) => {
  return await Category.findOneAndUpdate(
    query,
    { isDelete: true },
    { new: true }
  );
};
const updateCategory = async (query, data) => {
  return await Category.findOneAndUpdate(query, data, { new: true });
};
const getActiveCategories = async (query) => {
  return await Category.find({ ...query, isDelete: false });
};
const getCategories = async (query) => {
  return await Category.find(query);
};

export default {
  createCategory,
  getCategories,
  getActiveCategories,
  getOneCategory,
  deleteCategory,
  updateCategory
};
