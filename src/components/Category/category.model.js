import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'rgba(224, 224, 224, 0.25)'
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Category = mongoose.model('category', categorySchema);
export default Category;
