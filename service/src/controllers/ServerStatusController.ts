import { Request, Response } from 'express';

import ListServerStatusService from '../services/ListServerStatusService';

class ServerStatusController {

  public async index(_req: Request, res: Response): Promise<Response> {
    const listServerStatusService = new ListServerStatusService()
    const serverStatus = await listServerStatusService.execute();
    return res.status(200).send(serverStatus);
  }

}

export default new ServerStatusController;
