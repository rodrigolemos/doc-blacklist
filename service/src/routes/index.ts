import { Router } from 'express';
import documentsRouter from './documents.routes';
import serverStatusRouter from './server-status.routes';

const routes = Router();

routes.use('/documents', documentsRouter);
routes.use('/status', serverStatusRouter);

export default routes;
