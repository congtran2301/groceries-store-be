import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'cart'
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cartItemSchema.virtual('product', {
  ref: 'product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});

cartItemSchema.virtual('cart', {
  ref: 'cart',
  localField: 'cartId',
  foreignField: '_id',
  justOne: true
});

const CartItem = mongoose.model('cartItem', cartItemSchema);

export default CartItem;
