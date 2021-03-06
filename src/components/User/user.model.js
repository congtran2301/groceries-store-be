import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        'https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640-300x300.png'
    },
    role: {
      type: String,
      enum: ['staff', 'user', 'owner'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
userSchema.virtual('product', {
  ref: 'product',
  localField: 'favorites',
  foreignField: '_id',
  justOne: true
});
userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
userSchema.methods.isFavorite = function (id) {
  console.log('User model check favorite');
  return this.favorites.some(function (favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};
userSchema.methods.favorite = async function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }
  return await this.save();
};
userSchema.methods.validatePassword = async function (data) {
  return bcrypt.compare(data, this.password);
};
const User = mongoose.model('user', userSchema);
export default User;
