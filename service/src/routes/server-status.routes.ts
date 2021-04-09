import { Router } from 'express';
import ServerStatusController from '../controllers/ServerStatusController';

const serverStatusRouter = Router();

serverStatusRouter.get('/', ServerStatusController.index);

export default serverStatusRouter;
