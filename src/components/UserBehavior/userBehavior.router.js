import { Router } from 'express';
import userBehaviorController from './userBehavior.controller';
import authServices from '../Auth/auth.services';
import userBehaviorValidation from './userBehavior.validation';
import validate from '../../common/middleware/validation';

const router = Router();

router.use(authServices.isAuthentication);
router
  .route('/favorite')
  .get(userBehaviorController.getFavorites)
  .all(validate(userBehaviorValidation.changeFavoriteStatus))
  .post(userBehaviorController.addToFavorite)
  .delete(userBehaviorController.removeFavorite);

export default router;
