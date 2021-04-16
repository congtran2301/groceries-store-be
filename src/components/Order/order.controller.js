import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import productServices from '../Product/product.services';
import paginationServices from '../../common/pagination';
import handleDuplicateProduct from '../../common/utils/handleDuplicateProduct';
import orderServices from './order.services';

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderBody = pick(req.body, ['address', 'phone', 'productIds']);

    const productOrderDetail = handleDuplicateProduct(orderBody.productIds);

    const products = await Promise.all(
      productOrderDetail.map(async (prod) => {
        const product = await productServices.getOneProduct({
          _id: prod.id
        });
        return {
          ...product.toObject(),
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
    return error({ res, message: err.message, statusCode: 400 });
  }
};

const updateOrder = async (req, res) => {
  try {
    console.log('update order');
    const { orderId } = req.params;
    const updateData = req.body;
    const staffId = req.user._id;

    if (updateData.isPaid) {
      updateData.staffId = staffId;
    }

    await orderServices.updateOrder({ _id: orderId }, updateData);
    return success({ res, message: 'update success', statusCode: 200 });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

const getOrders = async (req, res) => {
  try {
    console.log('get order controller');
    const role = req.user.role;
    const userId = req.user._id;
    const populations = [
      {
        path: 'products.product',
        select: 'name price'
      }
    ];

    const userOrder = ['staff', 'owner'].indexOf(role) !== -1 ? {} : { userId };

    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);

    const orders = await orderServices.getOrders({
      query: { ...userOrder },
      pagination: { page, perPage },
      populations
    });

    const numberOfOrders = await orderServices.countOrders();
    const totalPage = Math.ceil(numberOfOrders / perPage);

    const pagination = paginationServices.makePaginationData({
      totalPage,
      currentPage: page,
      perPage
    });

    return success({ res, message: 'success', data: orders, pagination });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

const getOrder = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user._id;
    const populations = [
      {
        path: 'products.product',
        select: 'name price'
      }
    ];

    const { orderId } = req.params;
    const userOrder = ['staff', 'owner'].indexOf(role) !== -1 ? {} : { userId };

    const order = await orderServices.getOrder({
      query: { ...userOrder, orderId },
      populations
    });
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
