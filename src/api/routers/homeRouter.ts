import { Router } from 'express';
import { getHome } from '../controllers/getHome';
import { postHome } from '../controllers/postHome';
import bodyParser = require('body-parser');
import { ParamsDictionary } from 'express-serve-static-core';
import { putHome } from '../controllers/putHome';

export const HomeRouter = Router();

export interface GetHomeParams extends ParamsDictionary {
    homeId: string;
}

HomeRouter
    .post('/', bodyParser.json(), postHome)
    .get('/:homeId', getHome)
    .put('/:homeId', bodyParser.json(), putHome);
