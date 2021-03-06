import { success } from '../../common/utils/response';
import productServices from '../Product/product.services';
import userBehaviorServices from './userBehavior.services';

const addToFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    await productServices.getProduct({ _id: productId, isDelete: false });
    const favoritedItem = await userBehaviorServices.addToFavorite(
      { userId },
      productId
    );
    return success({
      res,
      data: favoritedItem,
      message: 'Product successfully added to your favorite',
      statusCode: 200
    });
  } catch (err) {
    next(err);
  }
};
const removeFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    await userBehaviorServices.removeToFavorite({ userId }, productId);
    return success({
      res,
      message: 'Product successfully removed to your favorite',
      statusCode: 200
    });
  } catch (err) {
    next(err);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const favorites = await userBehaviorServices.getAllFavorite({ userId });
    return success({
      res,
      message: 'Success',
      data: favorites ? favorites.favorites : [],
      statusCode: 200
    });
  } catch (err) {
    next(err);
  }
};

export default {
  addToFavorite,
  removeFavorite,
  getFavorites
};
