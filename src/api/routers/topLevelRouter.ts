import { Router } from 'express';
import { getTopLevel } from '../controllers/getTopLevel';

export const topLevelRouter = Router();

topLevelRouter.get('/', getTopLevel);
