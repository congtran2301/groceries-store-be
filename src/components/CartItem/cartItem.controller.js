import cartServices from '../Cart/cart.services';
import productServices from '../Product/product.services';
import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import cartItemServices from './cartItem.services';

const addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItem = pick(req.body, ['productId', 'quantity']);

    const cart = await cartServices.getCartByUserId(userId);
    const product = await productServices.getOneProduct({
      _id: cartItem.productId
    });

    const productExistInCart = await cartItemServices.getOneCartItem({
      cartId: cart._id,
      productId: product._id
    });

    if (!productExistInCart) {
      await cartItemServices.addItemToCart({
        cartId: cart._id,
        productId: product._id,
        quantity: cartItem.quantity
      });
    } else {
      let quantity = productExistInCart.quantity + cartItem.quantity;
      await cartItemServices.updateCartItem(
        { _id: productExistInCart._id },
        { quantity }
      );
    }
    return success({ res, message: 'Success' });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const updateCartItem = pick(req.body, ['cartItemId', 'quantity']);

    const cart = await cartServices.getCartByUserId(userId);

    await cartItemServices.updateCartItem(
      { _id: updateCartItem.cartItemId, cartId: cart._id },
      { quantity: updateCartItem.quantity }
    );
    return success({ res, message: 'Success' });
  } catch (error) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  addItemToCart,
  updateCart
};
