import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';

const documentsRouter = Router();

documentsRouter.get('/:id?', DocumentController.index);
documentsRouter.post('/', DocumentController.store);

export default documentsRouter;
