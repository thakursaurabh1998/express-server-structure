import Comment from '../models/comment.model';
import User from '../models/user.model';

export async function addComment(userId: string, postId: number, content: string) {
    const comment = Comment.build({
        userId,
        content,
        postId
    });

    return comment.save();
}

// paginate this
export async function fetchAllComments(postId: number) {
    return Comment.findAll({
        where: { postId },
        include: { model: User, attributes: ['name', 'displayPicture'] }
    });
}
