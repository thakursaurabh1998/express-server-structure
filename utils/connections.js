import { Sequelize } from 'sequelize';

import { logger } from './logger';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/local', // or ':memory:'
    logging: logger.info.bind(logger)
});
