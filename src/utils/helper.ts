import e from 'express';
import Joi from 'joi';
import { JoiValidation, ValidationTypes } from '../app/request-schema/types';

import { ControllerFunction } from './types';

export function createResponse(
    success: boolean,
    errors?: unknown[] | null,
    data?: unknown,
    errorType?: string
) {
    return {
        success,
        errors,
        data,
        errorType
    };
}

export function errorResponse(error: Error) {
    let errorMessage = 'InternalError';
    let statusCode = 500;
    if (error instanceof ServerError) {
        errorMessage = error.clientError;
        statusCode = error.statusCode;
    }
    const response = createResponse(false, [errorMessage]);
    return { statusCode, response };
}

export class ServerError extends Error {
    constructor(
        internalError: string,
        public statusCode: number = 500,
        public clientError: string = internalError
    ) {
        super(internalError);
    }
}

type OBT = keyof typeof ValidationTypes;

/**
 * This function acts like a higher order function which wraps the main controller
 * and helps in validation of the request body, param or/and query before
 * letting them reach the main controller which it surrounds
 */
export function verifyRequestSchema(
    controller: ControllerFunction,
    schemaValidator: JoiValidation = {}
) {
    return async (req: e.Request, res: e.Response, next: e.NextFunction) => {
        try {
            await Promise.all(
                Object.entries(schemaValidator).map(async ([validationType, validations]) => {
                    const vt = validationType as OBT;
                    if (validationType in ValidationTypes) {
                        req[vt] = await validations.validateAsync(req[vt], {
                            stripUnknown: true
                        });
                    }
                })
            );
            controller(req, res, next);
        } catch (error) {
            const customErr = error as Joi.ValidationError;
            if (customErr.isJoi) {
                res.status(400).json(
                    createResponse(
                        false,
                        customErr.details.map((detail) => detail.message),
                        null,
                        'ValidationError'
                    )
                );
            } else {
                req.log.error(customErr);
                res.status(500).json(
                    createResponse(false, ['Unknown Error'], null, 'Internal Error')
                );
            }
        }
    };
}
