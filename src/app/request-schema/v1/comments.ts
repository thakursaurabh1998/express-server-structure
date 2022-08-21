import Joi from 'joi';

import { JoiValidation } from '../types';

export const add: JoiValidation = {
    body: Joi.object({
        content: Joi.string().required(),
        userId: Joi.number().required(),
        postId: Joi.number().required()
    })
};

export const fetchAllComments: JoiValidation = {
    query: Joi.object({
        postId: Joi.number().required()
    })
};
