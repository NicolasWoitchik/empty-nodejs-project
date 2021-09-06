import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const upload = multer(uploadConfig.multer);
const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// usersRouter.get('/', usersController.index);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().email().required(),
      password: Joi.string().email().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.create
);

usersRouter.use(ensureAuthenticated);
usersRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  usersController.show
);
usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.update
);
// usersRouter.delete('/:id', usersController.delete);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
