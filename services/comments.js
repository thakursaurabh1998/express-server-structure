import Comment from '../models/Comment';
import User from '../models/user';

export async function addComment(userId, postId, content) {
    const comment = Comment.build({
        userId,
        content,
        postId
    });

    return comment.save();
}

// paginate this
export async function fetchAllComments(postId) {
    return Comment.findAll({
        where: { postId },
        include: { model: User, attributes: ['name', 'displayPicture'] }
    });
}
