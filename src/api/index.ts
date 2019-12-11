import { Router } from 'express';
import * as routers from './routers'

const api = Router();

api.use('/home', routers.HomeRouter);
// Rest routers...

export default api;
