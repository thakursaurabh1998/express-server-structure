import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/connections';

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    content: DataTypes.STRING,
    postId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    upvotes: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Comment.hasMany(Comment, { as: 'children', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parentId' });

Comment.belongsTo(sequelize.models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Comment;
