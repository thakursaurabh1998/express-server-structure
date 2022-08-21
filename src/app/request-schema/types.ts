import { ObjectSchema } from 'joi';

export enum ValidationTypes {
    body = 'body',
    params = 'params',
    query = 'query',
    headers = 'headers'
}

export type JoiValidation = Partial<Record<ValidationTypes, ObjectSchema>>;
