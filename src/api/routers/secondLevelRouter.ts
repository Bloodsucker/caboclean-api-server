import { Router } from 'express';
import { getSecondLevel } from '../controllers/getSecondLevel';

export const secondLevelRouter = Router();

secondLevelRouter.get('/', getSecondLevel);
