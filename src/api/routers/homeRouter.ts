import { Router } from 'express';
import { getHome } from '../controllers/getHome';
import { postHome } from '../controllers/postHome';
import bodyParser = require('body-parser');

export const HomeRouter = Router();

HomeRouter
    .post('/', bodyParser.json(), postHome)
    .get('/:domain', getHome);
