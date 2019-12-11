import { Router } from 'express';
import { getHome } from '../controllers/getHome';

export const HomeRouter = Router();

HomeRouter
    .route('/')
    .get(getHome);
