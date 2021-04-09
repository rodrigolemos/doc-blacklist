import { Request, Response } from 'express';

import CreateDocumentService from '../services/CreateDocumentService';
import ListDocumentsService from '../services/ListDocumentsService';
class DocumentController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listDocumentsService = new ListDocumentsService()
    const documents = await listDocumentsService.execute(req.query);
    return res.status(200).send(documents);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createDocumentService = new CreateDocumentService();
    const document = await createDocumentService.execute(req.body);
    return res.status(201).send(document);
  }

}

export default new DocumentController;
