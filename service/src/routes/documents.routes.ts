import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';

const documentsRouter = Router();

documentsRouter.get('/', DocumentController.index);
documentsRouter.post('/', DocumentController.store);
documentsRouter.put('/', DocumentController.update);

export default documentsRouter;
