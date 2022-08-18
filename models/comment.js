import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/connections';
import User from './user';

const Comment = sequelize.define('User', {
    content: DataTypes.STRING,
    upvotes: DataTypes.INTEGER
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.hasMany(Comment, { as: 'children', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parentId' });

export default Comment;
