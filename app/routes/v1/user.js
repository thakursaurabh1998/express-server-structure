import { Router } from 'express';

import { v1 as controllers } from '../../controller';

const userRouter = Router();

userRouter.put('/create', controllers.user.create);
userRouter.get('/all', controllers.user.all);

export default userRouter;
