import { Router } from 'express';

import userRouter from './user';
import commentsRouter from './comments';

const v1Router = Router();

v1Router.use('/user', userRouter);
v1Router.use('/comments', commentsRouter);

export default v1Router;
