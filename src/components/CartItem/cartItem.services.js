import CartItem from './cartItem.model';
/**
 * data = {
 *  cartId:
 *  productId: 1
 *  quantity:
 * }
 */
const addItemToCart = async ({ cartId, productId, quantity }) => {
  const cartItem = new CartItem({ cartId, productId, quantity });
  await cartItem.save();
  return cartItem;
};
const updateCartItem = async (query, data) => {
  return await CartItem.findOneAndUpdate(query, data);
};
const getCartItemsByCartId = async (cartId) => {
  return await CartItem.find({ cartId });
};
const getOneCartItem = async (query) => {
  return await CartItem.findOne(query);
};
export default {
  addItemToCart,
  updateCartItem,
  getOneCartItem,
  getCartItemsByCartId
};
