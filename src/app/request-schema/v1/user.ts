import Joi from 'joi';

import { JoiValidation } from '../types';

export const create: JoiValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        userName: Joi.string().required()
    })
};
