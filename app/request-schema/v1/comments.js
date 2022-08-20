import Joi from 'joi';

export const add = {
    body: Joi.object({
        content: Joi.string().required(),
        userId: Joi.number().required(),
        postId: Joi.number().required()
    })
};

export const fetchAllComments = {
    query: Joi.object({
        postId: Joi.number().required()
    })
};
