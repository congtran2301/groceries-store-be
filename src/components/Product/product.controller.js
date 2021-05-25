import { pick, omit } from 'lodash';
import { success, error } from '../../common/utils/response';
import productServices from '../Product/product.services';
import categoryServices from '../Category/category.services';
import paginationServices from '../../common/pagination';
import measureServices from '../Measure/measure.services';
import userBehaviorServices from '../UserBehavior/userBehavior.services';
import warehouseItemServices from '../WareHouseItem/warehouseItem.services';

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

    await Promise.all([
      categoryServices.getOneCategory({
        _id: productBody.categoryId
      }),
      measureServices.getMeasure({
        _id: productBody.measureId
      })
    ]);
    //verify category and measure is exist

    const newProduct = await productServices.createProduct(productBody);
    await warehouseItemServices.create({ productId: newProduct._id });
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
    const query = req.query;
    const getProductsService =
      ['staff', 'owner'].indexOf(role) !== -1
        ? productServices.getProducts
        : productServices.getActiveProducts;

    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    const productQuery = omit(query, ['page', 'perPage']);
    const products = await getProductsService({
      query: productQuery,
      pagination: { page, perPage }
    });

    const numberOfDocument = await productServices.countProducts(productQuery);

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
    await Promise.all([
      categoryServices.getOneCategory({
        _id: productBody.categoryId
      }),
      measureServices.getMeasure({
        _id: productBody.measureId
      })
    ]);

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
    const userId = req.user ? req.user._id : null;

    const { id } = req.params;

    const status =
      ['staff', 'owner'].indexOf(role) !== -1 ? {} : { isDelete: false };
    const userBehavior = await userBehaviorServices.getUserBehavior({ userId });
    const query = { _id: id };
    const product = await productServices.getProduct(
      {
        ...query,
        ...status
      },
      userBehavior
    );
    const warehouseItem = await warehouseItemServices.getOne(
      { productId: id },
      'quantity'
    );
    return success({
      res,
      message: 'Success',
      data: {
        ...product,
        quantity: warehouseItem.quantity,
        warehouseItemId: warehouseItem._id
      }
    });
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
const changeFavoriteStatus = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const { productId, favorite } = req.body;
    await productServices.getProduct({ _id: productId });
    if (favorite == true) {
      await user.favorite(productId);
    }
    return success({ res, message: 'Success', statusCode: 200 });
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
  searchProduct,
  changeFavoriteStatus
};
