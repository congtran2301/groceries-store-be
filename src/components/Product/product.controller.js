import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import productServices from '../Product/product.services';
import categoryServices from '../Category/category.services';
import paginationServices from '../../common/pagination';
import measureServices from '../Measure/measure.services';

const createProduct = async (req, res, next) => {
  try {
    const productBody = pick(req.body, [
      'name',
      'price',
      'description',
      'categoryId',
      'measureId',
      'imageUrls',
      'width',
      'height',
      'weight',
      'length',
      'status'
    ]);
    //verify category and measure is exist
    await categoryServices.getOneCategory({
      _id: productBody.categoryId
    });
    await measureServices.getMeasure({
      _id: productBody.measureId
    });

    const newProduct = await productServices.createProduct(productBody);

    return success({
      res,
      message: 'Product has been created',
      data: newProduct,
      statusCode: 201
    });
  } catch (err) {
    return next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const role = req.user ? req.user.role : null;
    const getProductsService =
      ['staff', 'owner'].indexOf(role) !== -1
        ? productServices.getProducts
        : productServices.getActiveProducts;

    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);

    const products = await getProductsService({
      query: {},
      pagination: { page, perPage }
    });

    const numberOfDocument = await productServices.countProducts();

    const pagination = paginationServices.makePaginationData({
      numberOfDocument,
      currentPage: page,
      perPage
    });
    return success({
      res,
      message: 'Get products successully',
      data: products,
      pagination,
      statusCode: 200
    });
  } catch (err) {
    next(err);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productBody = pick(req.body, [
      'name',
      'price',
      'categoryId',
      'measureId',
      'status',
      'imageUrls'
    ]);

    //verify category and measure is exist
    await categoryServices.getOneCategory({
      _id: productBody.categoryId
    });
    await measureServices.getMeasure({
      _id: productBody.measureId
    });

    const product = await productServices.updateProduct(
      { _id: id },
      productBody
    );
    return success({
      res,
      message: 'Product has been updated',
      data: product,
      statusCode: 200
    });
  } catch (err) {
    return next(err);
  }
};
const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isDelete } = await productServices.deleteProduct({ _id: id });

    if (isDelete)
      return success({
        res,
        message: 'Delete successfully',
        data: null,
        statusCode: 200
      });
  } catch (err) {
    return next(err);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const role = req.user ? req.user.role : null;
    const { id } = req.params;

    const status =
      ['staff', 'owner'].indexOf(role) !== -1 ? {} : { isDelete: false };

    const query = { _id: id };
    const product = await productServices.getProduct({
      ...query,
      ...status
    });
    return success({ res, message: 'Success', data: product });
  } catch (err) {
    next(err);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const { name } = req.query;

    const { count, matchProduct } = await productServices.searchProduct(name);

    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);

    const pagination = paginationServices.makePaginationData({
      numberOfDocument: count,
      currentPage: page,
      perPage
    });

    return success({
      res,
      message: 'success',
      data: matchProduct,
      pagination
    });
  } catch (err) {
    return next(err);
  }
};
export default {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  searchProduct
};
