import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import productServices from '../Product/product.services';
import paginationServices from '../../common/pagination';
import handleDuplicateProduct from '../../common/utils/handleDuplicateProduct';
import orderServices from './order.services';

const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orderBody = pick(req.body, ['address', 'phone', 'productIds']);

    const productOrderDetail = handleDuplicateProduct(orderBody.productIds);

    const products = await Promise.all(
      productOrderDetail.map(async (prod) => {
        const product = await productServices.getProduct({
          _id: prod.id,
          isDelete: false
        });
        return {
          ...product,
          price: prod.quantity * product.price,
          quantity: prod.quantity
        };
      })
    );
    const order = await orderServices.createOrderAndPushProductsToOrder({
      userId,
      products,
      address: orderBody.address,
      phone: orderBody.phone
    });
    return success({ res, message: 'success', data: order });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const staffId = req.user._id;

    if (updateData.isPaid) {
      updateData.staffId = staffId;
    }

    await orderServices.updateOrder({ _id: id }, updateData);
    return success({ res, message: 'update success', statusCode: 200 });
  } catch (err) {
    return next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user._id;

    const userOrder = ['staff', 'owner'].indexOf(role) !== -1 ? {} : { userId };

    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);

    const orders = await orderServices.getOrders({
      query: { ...userOrder },
      pagination: { page, perPage }
    });

    const numberOfDocument = await orderServices.countOrders();

    const pagination = paginationServices.makePaginationData({
      numberOfDocument,
      currentPage: page,
      perPage
    });

    return success({ res, message: 'success', data: orders, pagination });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user._id;

    const { id } = req.params;
    const userOrder = ['staff', 'owner'].indexOf(role) !== -1 ? {} : { userId };
    console.log({ ...userOrder, id });
    const order = await orderServices.getOrder({ ...userOrder, _id: id });
    return success({ res, message: 'success', data: order });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  createOrder,
  updateOrder,
  getOrders,
  getOrder
};
