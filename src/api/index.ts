import { Router } from 'express';
import * as routers from './routers'

const api = Router();

api.use('/homes', routers.HomeRouter);
// Rest routers...

export default api;
