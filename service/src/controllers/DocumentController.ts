import { Request, Response } from 'express';

import CreateDocumentService from '../services/CreateDocumentService';
import DeleteDocumentService from '../services/DeleteDocumentService';
import ListDocumentsService from '../services/ListDocumentsService';
import UpdateDocumentService from '../services/UpdateDocumentService';

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

  public async update(req: Request, res: Response): Promise<Response> {
    const updateDocumentService = new UpdateDocumentService();
    const document = await updateDocumentService.execute(req.body);
    return res.status(200).send(document);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const deleteDocumentService = new DeleteDocumentService();
    await deleteDocumentService.execute(req.body);
    return res.status(204).send({});
  }

}

export default new DocumentController;
