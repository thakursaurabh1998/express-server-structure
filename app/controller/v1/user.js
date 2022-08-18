import { user } from '../../request-schema/v1';
import { user as userService } from '../../../services';
import { createResponse, verifyRequestSchema } from '../../../utils/helper';

export const create = verifyRequestSchema(async (req, res, next) => {
    try {
        const { userId, name } = req.body;
        const userData = await userService.create(userId, name);
        res.status(200).json(createResponse(true, null, userData));
    } catch (error) {
        next(error);
    }
}, user.create);

export const all = verifyRequestSchema(async (_req, res, next) => {
    try {
        const userData = await userService.all();
        res.status(200).json(createResponse(true, null, userData));
    } catch (error) {
        next(error);
    }
});
