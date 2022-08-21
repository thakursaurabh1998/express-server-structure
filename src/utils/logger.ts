import { pino } from 'pino';
import pinoHttp from 'pino-http';

const pinoLogger = pino();

export const logger = {
    debug: pinoLogger.debug.bind(pinoLogger),
    info: pinoLogger.info.bind(pinoLogger),
    warn: pinoLogger.warn.bind(pinoLogger),
    error: pinoLogger.error.bind(pinoLogger),
    fatal: pinoLogger.fatal.bind(pinoLogger)
};

export const requestLogger = pinoHttp({ logger: pinoLogger });
