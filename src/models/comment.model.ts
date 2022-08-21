import { BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import User from './user.model';

@Table({ timestamps: true })
class Comment extends Model {
    @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column(DataType.TEXT)
    content!: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    postId!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    upvotes!: number;

    @BelongsTo(() => User, 'userId')
    user!: User;

    @BelongsTo(() => Comment, 'commentId')
    parent!: Comment;

    @HasMany(() => Comment, 'commentId')
    children!: Comment[];
}

export default Comment;
