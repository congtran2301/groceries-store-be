import passport from 'passport';
import CustomError from '../../common/CustomError';
import { unauthorized } from '../../common/utils/response';

const isAuthentication = passport.authenticate('jwt', { session: false });

const optionalAuthentication = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) next();
    else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

const hasOwnerPermission = (req, res, next) => {
  const { role } = req.user;
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
  selfModify,
  optionalAuthentication
};
