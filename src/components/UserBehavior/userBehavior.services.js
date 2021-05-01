import UserBehavior from './userBehavior.model';

const addToFavorite = async (query, productId) => {
  let userBehavior = await UserBehavior.findOne(query);
  if (!userBehavior) {
    userBehavior = new UserBehavior({
      userId: query.userId,
      favorites: []
    });
  }
  const existFavorite = userBehavior.favorites.find(
    (favorite) => favorite.productId == productId
  );

  if (!existFavorite) userBehavior.favorites.push({ productId });

  return await userBehavior.save();
};

const removeToFavorite = async (query, productId) => {
  return await UserBehavior.findOneAndUpdate(query, {
    $pull: { favorites: { productId } }
  });
};

const getAllFavorite = async (query) => {
  return await UserBehavior.findOne(query, null, {
    populate: [
      {
        path: 'favorites.product',
        select: ['imageUrls', 'name', 'price', 'description', 'isDelete']
      }
    ]
  });
};

const getUserBehavior = async (query) => {
  console.log('query', query);
  const userBehavior = await UserBehavior.findOne(query);
  console.log(userBehavior);
  return userBehavior;
};
export default {
  addToFavorite,
  getAllFavorite,
  getUserBehavior,
  removeToFavorite
};
