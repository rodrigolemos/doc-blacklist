import { requestsQuantity } from '../server';

interface IResponse {
  uptime: string;
  requestsQuantity: number;
}

class ListServerStatusService {

  public async execute(): Promise<IResponse> {
    const uptime = new Date(process.uptime() * 1000).toISOString().substr(11, 8);
    return {
      uptime,
      requestsQuantity
    };
  }

}

export default ListServerStatusService;
