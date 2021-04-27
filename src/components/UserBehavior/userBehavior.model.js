import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'product' }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual('product', {
  ref: 'product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});
const userBehaviorSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    favoriteIds: [productSchema]
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userBehaviorSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

userBehaviorSchema.methods.isFavorite = function (id) {
  return this.favoriteIds.some(function (favoriteId) {
    return favoriteId.productId.toString() === id.toString();
  });
};
// userBehaviorSchema.methods.favorite = async function (id) {
//   if (this.favoriteIds.indexOf(id) === -1) {
//     this.favoriteIds.push(id);
//   }
//   return await this.save();
// };

const UserBehavior = mongoose.model('userBehavior', userBehaviorSchema);
export default UserBehavior;
