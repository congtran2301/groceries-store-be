import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import productServices from '../Product/product.services';
import categoryServices from '../Category/category.services';
import paginationServices from '../../common/pagination';

const createProduct = async (req, res) => {
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
      'length'
    ]);

    const category = await categoryServices.getOneCategory({
      _id: productBody.categoryId
    });
    // create and populate
    const newProduct = await productServices.createProduct(productBody, [
      { path: 'category', select: '-_id' }
    ]);

    return success({
      res,
      message: 'Product has been created',
      data: newProduct,
      statusCode: 201
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

const getProducts = async (req, res) => {
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

    const numberOfProducts = await productServices.countProducts();

    const totalPage = Math.ceil(numberOfProducts / perPage);

    const pagination = paginationServices.makePaginationData({
      totalPage,
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
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const getActiveProducts = async (req, res) => {
  try {
    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);

    const products = await productServices.getActiveProducts(
      {},
      { page, perPage }
    );
    const numberOfProducts = await productServices.countProducts();

    const totalPage = Math.ceil(numberOfProducts / perPage);

    const pagination = paginationServices.makePaginationData({
      totalPage,
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
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productInfo = pick(req.body, [
      'name',
      'price',
      'categoryId',
      'imageUrls'
    ]);

    const product = await productServices.updateProduct(
      { _id: id },
      productInfo
    );
    return success({
      res,
      message: 'Product has been updated',
      data: product,
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const deleteProductById = async (req, res) => {
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
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const getProductById = async (req, res) => {
  try {
    const role = req.user ? req.user.role : null;
    const { id } = req.params;

    const status =
      ['staff', 'owner'].indexOf(role) !== -1 ? {} : { isDelete: false };

    const query = { _id: id };
    console.log(query);
    const product = await productServices.getOneProduct({
      ...query,
      ...status
    });
    return success({ res, message: 'Success', data: product });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { text } = req.body;

    const { count, matchProduct } = await productServices.searchProduct(text);

    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    const totalPage = count / perPage;
    const pagination = paginationServices.makePaginationData({
      totalPage,
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
    return error({ res, message: err.message, statusCode: 400 });
  }
};
export default {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  getActiveProducts,
  searchProduct
};
