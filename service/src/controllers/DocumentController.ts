import { Request, Response } from 'express';

import CreateDocumentService from '../services/CreateDocumentService';

class DocumentController {

  public async index(_: Request, res: Response): Promise<Response> {
    return res.send({
      message: 'Hello world'
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createDocumentService = new CreateDocumentService();
    const document = await createDocumentService.execute(req.body);
    return res.status(201).send(document);
  }

}

export default new DocumentController;
