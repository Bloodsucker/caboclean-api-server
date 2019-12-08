import { Request, Response } from 'express';

export function getSecondLevel(req: Request, res: Response) {
    res.send('Second level rout!');
}