import UserBehavior from './userBehavior.model';

const addToFavorite = async (query, productId) => {
  let userBehavior = await UserBehavior.findOne(query);
  if (!userBehavior) {
    userBehavior = new UserBehavior({
      userId: query.userId,
      favoriteIds: []
    });
  }
  const existFavorite = userBehavior.favoriteIds.find(
    (favorite) => favorite.productId == productId
  );

  if (!existFavorite) userBehavior.favoriteIds.push({ productId });

  return await userBehavior.save();
};

const removeToFavorite = async (query, productId) => {
  return await UserBehavior.findOneAndUpdate(query, {
    $pull: { favoriteIds: { productId } }
  });
};

const getAllFavorite = async (query) => {
  return await UserBehavior.find(query, null, {
    populate: [
      {
        path: 'favoriteIds.product',
        select: ['imageUrls', 'name', 'price', 'description']
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
