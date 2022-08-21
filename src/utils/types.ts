import e from 'express';

export type ControllerFunction = (req: e.Request, res: e.Response, next: e.NextFunction) => void;
