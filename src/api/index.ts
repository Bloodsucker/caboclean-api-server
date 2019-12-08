import { Router } from 'express';
import * as routers from './routers'

const api = Router();

api.use('/', routers.topLevelRouter);
api.use('/second', routers.secondLevelRouter);

export default api;
