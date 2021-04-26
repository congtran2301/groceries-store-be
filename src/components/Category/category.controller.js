import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import categoryServices from './category.services';

const createCategory = async (req, res, next) => {
  try {
    const categoryBody = pick(req.body, [
      'name',
      'description',
      'color',
      'imageUrls'
    ]);
    const newCategory = await categoryServices.createCategory(categoryBody);
    return success({
      res,
      message: 'Create category successfully',
      data: newCategory,
      statusCode: 201
    });
  } catch (err) {
    return next(err);
  }
};
const updateCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let categoryInfo = pick(req.body, [
      'name',
      'description',
      'color',
      'imageUrl'
    ]);
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
    return next(err);
  }
};
const deleteCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isDelete } = await categoryServices.deleteCategory({ _id: id });

    if (isDelete) return success({ res, message: 'Category has been deleted' });
  } catch (err) {
    return next(err);
  }
};
const getActiveCategories = async (req, res, next) => {
  try {
    const categories = await categoryServices.getActiveCategories();
    return success({
      res,
      message: 'Success',
      data: categories,
      statusCode: 200
    });
  } catch (err) {
    return next(err);
  }
};
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryServices.getCategories();
    return success({
      res,
      message: 'Success',
      data: categories,
      statusCode: 200
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  getActiveCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategories
};
