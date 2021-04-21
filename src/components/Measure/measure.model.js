import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const measureSchema = new Schema(
  {
    sign: {
      type: String
    },
    description: {
      type: String
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Measure = mongoose.model('measure', measureSchema);
export default Measure;
