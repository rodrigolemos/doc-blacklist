import { getRepository } from 'typeorm';
import { Document } from '../models/Document';
import AppError from '../errors/AppError';

interface IRequest {
  value: string;
  blacklist: string;
}

class UpdateDocumentService {

  public async execute(body: IRequest): Promise<Document> {
    const { value, blacklist } = body;

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

    documentRegistered.blacklist = eval(blacklist);

    if (documentRegistered.id) {
      await documentRepository.update(documentRegistered.id, documentRegistered);
    }

    return documentRegistered;
  }

}

export default UpdateDocumentService;
