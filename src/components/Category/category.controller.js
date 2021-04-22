import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import categoryServices from './category.services';

const createCategory = async (req, res) => {
  try {
    const categoryBody = pick(req.body, ['name', 'description', 'color']);
    const newCategory = await categoryServices.createCategory(categoryBody);
    return success({
      res,
      message: 'Create category successfully',
      data: newCategory,
      statusCode: 201
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    let categoryInfo = pick(req.body, ['name', 'description', 'color']);
    const category = await categoryServices.updateCategory(
      {
        _id: id
      },
      categoryInfo
    );
    return success({
      res,
      message: 'Category has been updated',
      data: category,
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDelete } = await categoryServices.deleteCategory({ _id: id });

    if (isDelete) return success({ res, message: 'Category has been deleted' });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const getActiveCategories = async (req, res) => {
  try {
    const categories = await categoryServices.getActiveCategories();
    return success({
      res,
      message: 'Success',
      data: categories,
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await categoryServices.getCategories();
    return success({
      res,
      message: 'Success',
      data: categories,
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  getActiveCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategories
};
