import { Router } from 'express';
import documentsRouter from './documents.routes';

const routes = Router();

routes.use('/documents', documentsRouter);

export default routes;
