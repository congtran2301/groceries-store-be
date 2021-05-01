import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const warehouseItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  quantity: {
    type: Number,
    default: 0
  }
});

warehouseItemSchema.virtual('product', {
  ref: 'product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});

const WarehouseItem = mongoose.model('warehouseitem', warehouseItemSchema);
export default WarehouseItem;
