import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
    price: {
      type: Number,
      required: true
    },
    imageUrls: {
      type: Array,
      default: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
      ]
    },
    // measureId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Measures',
    //   required: true
    // },
    features: {
      type: String
    },
    height: {
      type: Number
    },
    length: {
      type: Number
    },
    weight: {
      type: Number
    },
    priceBeforeDiscount: {
      type: Number
    },
    isDiscount: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.index({ name: 'text' });
productSchema.virtual('category', {
  ref: 'category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
});

const Product = mongoose.model('product', productSchema);
export default Product;
