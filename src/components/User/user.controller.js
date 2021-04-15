import userServices from './user.services';
import { success, error } from '../../common/utils/response';
import { pick } from 'lodash';
import paginationServices from '../../common/pagination';
import userValidation from './user.validation';

const getUsers = async (req, res) => {
  try {
    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    let fields = ['fullName', 'avatar', 'username'];

    const users = await userServices.getUsers({
      query: {},
      pagination: { page, perPage },
      fields
    });

    const numberOfUsers = await userServices.countUsers();
    const totalPage = Math.ceil(numberOfUsers / perPage);
    const pagination = paginationServices.makePaginationData({
      totalPage,
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
    const updateUserBody = pick(req.body, ['fullName', 'avatar']);
    const updateUser = await userValidation.UserUpdate.validateAsync(
      updateUserBody
    );
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
