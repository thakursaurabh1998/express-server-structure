import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

import config from './config';
import * as routes from './routes';
import { createResponse, errorResponse } from '../utils/helper';
import { requestLogger, logger } from '../utils/logger';
import { sequelize } from '../utils/connections';
import { fillData } from '../seed';

const app = express();

app.use(requestLogger);
app.use(bodyParser.json());

app.get('/health', (_req, res) => {
    res.status(200).json(createResponse(true, null, "I'm Healthy!"));
});

app.use('/v1/', routes.v1);

app.use((_req, res) => {
    res.status(404).json(createResponse(false, ['Not Found']));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const { statusCode, response } = errorResponse(err);
    if (statusCode >= 500) {
        logger.error(err);
    } else {
        logger.info(err);
    }
    res.status(statusCode).json(response);
});

export let httpServer: http.Server;

export async function start() {
    await sequelize.sync({ alter: true });
    await fillData();
    httpServer = app.listen(config.server.port);
    logger.info(`API running on port - ${config.server.port}`);
}

// manage graceful shutdown with this function
export async function stop() {
    if (!httpServer) {
        throw new Error('Server not started yet');
    }
    // await sequelize.query('DROP TABLE Users_backup');
    // await sequelize.query('DROP TABLE Comments_backup');
    httpServer.close();
}
