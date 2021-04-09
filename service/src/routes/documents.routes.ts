import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';

const documentsRouter = Router();

documentsRouter.get('/:id?', DocumentController.index);

export default documentsRouter;
