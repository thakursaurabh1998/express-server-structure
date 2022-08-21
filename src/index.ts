import * as server from './app/server';
import * as socketServer from './socket/server';
import * as connections from './utils/connections';
import { logger } from './utils/logger';

(async function () {
    await connections.init();
    await server.start();
    socketServer.start(server.httpServer);
})();

function handleKillSignals(signal: NodeJS.Signals) {
    logger.info(`${signal} SIGNAL RECEIVED`);
    server.stop();
    logger.info('HTTP Server closed');
}

process.on('SIGINT', handleKillSignals);
process.on('SIGTERM', handleKillSignals);
process.on('uncaughtException', logger.fatal);
