import { Request, Response } from 'express';

class DocumentController {

  public async index(_: Request, res: Response): Promise<Response> {
    return res.send({
      message: 'Hello world'
    });
  }

}

export default new DocumentController;
