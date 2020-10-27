import { Router } from 'express';
import { userRouter } from '../../../../modules/users/infrastructure/web/routes';

const v1Router = Router();

v1Router.use('/users', userRouter);

export { v1Router };
