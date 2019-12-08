import { Router } from 'express';
import { topLevelRouter } from './routes'

const api = Router();

api.use('/', topLevelRouter);

export default api;