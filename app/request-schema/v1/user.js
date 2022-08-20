import Joi from 'joi';

export const create = {
    body: Joi.object({
        name: Joi.string().required(),
        userName: Joi.string().required()
    })
};
