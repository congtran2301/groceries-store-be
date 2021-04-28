import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    desription: {
      type: String
    },
    representation: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    provine: {
      type: String
    },
    city: {
      type: String
    },
    district: {
      type: String
    },
    ward: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const supplier = mongoose.model('supplier', supplierSchema);
export default supplier;
