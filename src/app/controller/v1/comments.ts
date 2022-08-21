import { comments } from '../../request-schema/v1';
import { comments as commentsService } from '../../../services';
import { createResponse, verifyRequestSchema } from '../../../utils/helper';

export const add = verifyRequestSchema(async (req, res, next) => {
    const { content, userId, postId } = req.body;

    try {
        await commentsService.addComment(userId, postId, content);
        res.status(200).json(createResponse(true, null));
    } catch (error) {
        next(error);
    }
}, comments.add);

// paginate this
export const fetchAllComments = verifyRequestSchema(async (req, res, next) => {
    const { postId } = req.query;

    try {
        const comments = await commentsService.fetchAllComments(parseInt(postId as string));
        res.status(200).json(createResponse(true, null, { comments }));
    } catch (error) {
        next(error);
    }
}, comments.fetchAllComments);
