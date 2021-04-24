import passport from 'passport';
import { unauthorized } from '../../common/utils/response';

const isAuthentication = async (req, res, next) => {
  try {
    await passport.authenticate('jwt', {
      session: false
    })(req, res, next);
  } catch (error) {
    return unauthorized({ res });
  }
};

const hasOwnerPermission = (req, res, next) => {
  const { role } = req.user;
  console.log('role');
  if (role !== 'owner') return unauthorized({ res });
  next();
};

const hasStaffPermission = (req, res, next) => {
  const { role } = req.user;
  const allowedRole = ['staff', 'owner'];
  if (allowedRole.indexOf(role) === -1) return unauthorized({ res });
  next();
};
const selfModify = (req, res, next) => {
  if (req.params.id != req.user._id) return unauthorized({ res });
  next();
};
export default {
  isAuthentication,
  hasOwnerPermission,
  hasStaffPermission,
  selfModify
};
