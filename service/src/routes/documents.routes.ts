import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';

const documentsRouter = Router();

documentsRouter.get('/', DocumentController.index);
documentsRouter.post('/', DocumentController.store);

export default documentsRouter;
