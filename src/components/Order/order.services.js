import Order from './order.model';
import mongoose from 'mongoose';
import cartServices from '../Cart/cart.services';
import cartItemServices from '../CartItem/cartItem.services';
import CartItem from '../CartItem/cartItem.model';
const createOrderAndPushProductsToOrder = async ({
  userId,
  products,
  address,
  phone
}) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cart = await cartServices.getCartByUserId(userId);

    let totalPrice = 0;
    let order = new Order({
      _id: new mongoose.Types.ObjectId(),
      userId,
      address,
      phone
    });
    products.forEach(async ({ _id, quantity, price }) => {
      order.products.push({
        productId: _id,
        quantity,
        price
      });
      totalPrice += price;
      await CartItem.findOneAndDelete({
        cartId: cart._id,
        productId: _id
      }).session(session);
    });
    order.totalPrice = totalPrice;
    order = await order.save({ session });
    await session.commitTransaction();
    return await Order.findOne({ _id: order._id }, null, {
      populate: [{ path: 'products.product', select: 'name price' }]
    });
  } catch (error) {
    session.abortTransaction();
  } finally {
    session.endSession();
  }
};

const updateOrder = async (query, data) => {
  return await Order.findOneAndUpdate(query, data, { new: true });
};

const getOrders = async ({ query, pagination, populations = [] }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await Order.find(query, null, { populate: populations })
    .skip(skip)
    .limit(perPage);
};
const getOrder = async ({ query, populations = [] }) => {
  return await Order.findOne(query, null, { populate: populations });
};
const countOrders = async (query = {}) => {
  return await Order.countDocuments(query);
};

export default {
  createOrderAndPushProductsToOrder,
  updateOrder,
  getOrders,
  getOrder,
  countOrders
};
