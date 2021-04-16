import userServices from '../User/user.services';
import cartServices from '../Cart/cart.services';
import { success, error } from '../../common/utils/response';
import { pick } from 'lodash';
import { sign } from 'jsonwebtoken';
import '../../common/utils/envConfig';

const register = async (req, res) => {
  try {
    const userBody = pick(req.body, ['username', 'password', 'fullName']);

    const existUser = await userServices.getOneUser({
      username: userBody.username,
      status: 'active'
    });

    if (existUser)
      return error({ res, message: 'Username existed', statusCode: 400 });

    const newUser = await userServices.createUser({
      ...userBody,
      role: 'user'
    });
    await cartServices.createEmptyCart(newUser._id);

    return success({
      res,
      message: 'Register success',
      data: null,
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = pick(req.body, ['username', 'password']);

    const user = await userServices.getOneUser({ username, status: 'active' });

    const correctPassword = await user.validatePassword(password);
    if (!correctPassword)
      return error({ res, message: 'Wrong password', statusCode: 400 });

    const userInfo = pick(user, ['username', 'fullName', 'role']);
    const token = sign(userInfo, process.env.MY_SECRET, { expiresIn: '20d' });
    return success({
      res,
      message: 'Login successfully',
      data: { token, userInfo },
      statusCode: 200
    });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default { register, login };
