import { Request, Response } from 'express';

export function getTopLevel(req: Request, res: Response) {
    res.send('Top level rout!');
}