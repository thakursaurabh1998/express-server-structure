import { Sequelize } from 'sequelize-typescript';

import Comment from '../models/comment.model';
import User from '../models/user.model';

import { logger } from './logger';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/local.db', // or ':memory:'
    logging: logger.info.bind(logger),
    models: [User, Comment]
});

export async function init() {
    return { sequelize };
}
