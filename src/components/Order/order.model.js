import mongoose from 'mongoose';
import { Statuses } from './order.config';
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number },
    price: { type: Number }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual('product', {
  ref: 'product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: Object.values(Statuses),
      default: 'pending'
    },
    date: {
      type: Date,
      default: Date.now
    },
    products: [productSchema]
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

orderSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});
orderSchema.virtual('staff', {
  ref: 'user',
  localField: 'staffId',
  foreignField: '_id',
  justOne: true
});

const Order = mongoose.model('order', orderSchema);
export default Order;
