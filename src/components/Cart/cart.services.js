import Cart from '../Cart/cart.model';

const createEmptyCart = async (userId) => {
  const cart = new Cart({
    userId
  });
  await cart.save();
  return cart;
};

const getCartByUserId = async (userId) => {
  return await Cart.findOne({ userId });
};

export default {
  createEmptyCart,
  getCartByUserId
};
