import { getRepository } from 'typeorm';
import { Document } from '../models/Document';
import AppError from '../errors/AppError';

interface IRequest {
  value: string;
}

class DeleteDocumentService {

  public async execute(body: IRequest): Promise<boolean> {
    const { value } = body;

    const documentRepository = getRepository(Document);

    const documentRegistered = await documentRepository.findOne({
      where: {
        value
      }
    });

    if (!documentRegistered) {
      throw new AppError({
        status: 1,
        message: 'Documento não encontrado.'
      }, 404);
    }

    if (documentRegistered._id) {
      await documentRepository.delete(documentRegistered._id);
    }

    return true;
  }

}

export default DeleteDocumentService;
