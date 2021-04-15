import userValidate from './user.validation';
import User from './user.model';
import { pick } from 'lodash';

const getOneUser = async (query, fields) => {
  return await User.findOne(query, fields);
};
const getUsers = async ({ query, pagination, populations = [], fields }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await User.find({ ...query, role: 'user' }, fields)
    .skip(skip)
    .limit(perPage);
};
const getStaffs = async ({ query, pagination, populations = [], fields }) => {
  const { page, perPage } = pagination;
  const skip = (page - 1) * perPage;
  return await User.find({ ...query, role: 'staff' }, fields)
    .skip(skip)
    .limit(perPage);
};
const createUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};
const updateUser = async (query, data) => {
  return await User.findOneAndUpdate(query, data);
};
const deleteUser = async (query) => {
  return await User.findOneAndUpdate(
    { ...query, role: 'user' },
    { status: 'inactive' }
  );
};
const deleteStaff = async (query) => {
  return await User.findOneAndUpdate(
    { ...query, role: 'staff' },
    { status: 'inactive' }
  );
};
const countUsers = async (query) => {
  return await User.countDocuments({ ...query, role: 'user' });
};

export default {
  getOneUser,
  createUser,
  getUsers,
  getStaffs,
  countUsers,
  updateUser,
  deleteUser,
  deleteStaff
};
