import Cart from '../Cart/cart.model';
import CartItem from '../CartItem/cartItem.model';

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

// const updateCartProductQuantity = async ({ cartItemId, quantity }) => {
//   return await CartItem.findByIdAndUpdate(
//     { _id: cartItemId },
//     { quantity },
//     { new: true }
//   )
// }
// const createCartItem = async ({ productId, cartId, quantity }) => {
//   const newCartProduct = new CartItem({
//     productId,
//     cartId,
//     quantity
//   })
//   await newCartProduct.save()
//   return newCartProduct
// }
export default {
  createEmptyCart,
  getCartByUserId
};
