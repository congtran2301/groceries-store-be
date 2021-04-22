import userServices from '../User/user.services';
import userValidate from '../User/user.validation';
import paginationServices from '../../common/pagination';

import { success, error } from '../../common/utils/response';
import { pick } from 'lodash';

const getStaffs = async (req, res) => {
  try {
    let { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    let fields = ['fullName', 'avatar', 'username', 'status'];

    const staffs = await userServices.getStaffs({
      query: {},
      pagination: { page, perPage },
      fields
    });

    const numberOfStaffs = await userServices.countUsers();
    const totalPage = Math.ceil(numberOfStaffs / perPage);
    const pagination = paginationServices.makePaginationData({
      totalPage,
      currentPage: page,
      perPage
    });
    return success({ res, message: 'Success', data: staffs, pagination });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

const createStaff = async (req, res) => {
  try {
    const userBody = pick(req.body, ['username', 'password', 'fullName']);

    const user = await userValidate.UserRegister.validateAsync(userBody);

    const existStaff = await userServices.getOneUser({
      username: user.username,
      status: 'active'
    });

    if (existStaff)
      return error({ res, message: 'Staff existed', statusCode: 400 });
    const newStaff = await userServices.createUser({ ...user, role: 'staff' });

    return success({
      res,
      message: 'Create new staff success',
      data: null,
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const deleteStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    await userServices.deleteStaff({ _id: id });
    return success({ res, message: 'Delete success' });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default { getStaffs, createStaff, deleteStaffById };
