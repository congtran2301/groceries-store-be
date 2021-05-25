import { Schema, model } from 'mongoose';

const warehouseTransactionSchema = new Schema(
  {
    warehouseItemId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: Number,
      enum: [0, 1],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const WarehouseTransaction = model(
  'warehousetransaction',
  warehouseTransactionSchema
);
export default WarehouseTransaction;
