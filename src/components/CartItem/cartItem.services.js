import CartItem from './cartItem.model';

const addItemToCart = async ({ cartId, productId, quantity }) => {
  const cartItem = new CartItem({ cartId, productId, quantity });
  await cartItem.save();
  return cartItem;
};
const updateCartItem = async (query, data) => {
  return await CartItem.findOneAndUpdate(query, data, { new: true });
};
const deleteCartItem = async (query) => {
  return await CartItem.findOneAndRemove(query);
};
const getCartItemsByCartId = async (cartId) => {
  return await CartItem.find({ cartId })
    .populate([
      {
        path: 'product',
        select: ['name', 'price', 'imageUrls', 'measureId'],
        populate: { path: 'measure', select: ['sign', 'description'] }
      }
    ])
    .exec();
};
const getOneCartItem = async (query) => {
  return await CartItem.findOne(query);
};
export default {
  addItemToCart,
  updateCartItem,
  getOneCartItem,
  getCartItemsByCartId,
  deleteCartItem
};
