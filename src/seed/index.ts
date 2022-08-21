import Comment from '../models/comment.model';
import User from '../models/user.model';
import { logger } from '../utils/logger';

const Users = [
    { name: 'Saurabh Thakur', userName: 'thakursaurabh98' },
    { name: 'Rohan Joshi', userName: 'joshi_rohan' },
    { name: 'Lewis Hamilton', userName: 'hamilton_goat' },
    { name: 'Daniel Ricciardo', userName: 'ritchiardo' },
    { name: 'Mindy Kaling', userName: 'mindy_kaling' }
];

const Comments = [
    { content: 'Awesome stuff!!', userId: 1, postId: 1 },
    { content: 'Awesome stuff!!', userId: 2, postId: 1 },
    { content: 'Awesome stuff!!', userId: 3, postId: 1 },
    { content: 'Awesome stuff!!', userId: 4, postId: 1 },
    { content: 'Awesome stuff G!!', userId: 5, postId: 1 },
    { content: 'Awesome stuff!!', userId: 2, postId: 2 },
    { content: 'Awesome stuff!!', userId: 2, postId: 2 }
];

export async function fillData() {
    await Promise.all(
        Users.map((user) =>
            User.build(user)
                .save()
                .catch((err) => logger.warn(err.message))
        )
    );
    await Promise.all(
        Comments.map((comment) =>
            Comment.build(comment)
                .save()
                .catch((err) => logger.warn(err.message))
        )
    );
}
