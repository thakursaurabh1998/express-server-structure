import { Router } from 'express';

import { v1 as controllers } from '../../controller';

const commentsRouter = Router();

commentsRouter.put('/add', controllers.comments.add);
commentsRouter.get('/fetchAll', controllers.comments.fetchAllComments);

export default commentsRouter;
