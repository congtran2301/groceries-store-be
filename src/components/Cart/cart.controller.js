import { success, error } from '../../common/utils/response';
import cartItemServices from '../CartItem/cartItem.services';
import cartServices from './cart.services';

const getCart = async (req, res) => {
  try {
    console.log('getCart');
    const userId = req.user._id;
    const cart = await cartServices.getCartByUserId(userId);
    const cartItems = await cartItemServices.getCartItemsByCartId(cart._id);
    const data = {
      cart,
      cartItems
    };
    return success({ res, message: 'Get cart success', data });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  getCart
};
