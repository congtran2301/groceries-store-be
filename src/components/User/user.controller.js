import userServices from './user.services';
import { success, error } from '../../common/utils/response';
import { pick } from 'lodash';
import paginationServices from '../../common/pagination';

const getUsers = async (req, res) => {
  try {
    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    let fields = ['fullName', 'avatar', 'username'];

    const users = await userServices.getUsers({
      query: {},
      pagination: { page, perPage },
      fields
    });

    const numberOfDocument = await userServices.countUsers();
    const pagination = paginationServices.makePaginationData({
      numberOfDocument,
      currentPage: page,
      perPage
    });
    return success({ res, message: 'Success', data: users, pagination });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let fields = ['fullName', 'avatar', 'username'];

    const user = await userServices.getOneUser({ _id: id }, fields);

    return success({ res, message: 'Success', data: user });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = pick(req.body, ['fullName', 'avatar']);

    await userServices.updateUser({ _id: id }, updateUser);

    return success({ res, message: 'Update success' });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await userServices.deleteUser({ _id: id });
    return success({ res, message: 'Delete success' });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
export default { getUsers, getUserById, updateUserById, deleteUserById };
