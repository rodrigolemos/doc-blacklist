import { getRepository } from 'typeorm';
import { Document } from '../models/Document';
import AppError from '../errors/AppError';
import { validateCPF } from '../utils/document-validator';

interface IRequest {
  value: string;
  blacklist: boolean;
  type: string;
}

class CreateDocumentService {

  public async execute(body: IRequest): Promise<Document> {
    const { value, blacklist, type } = body;

    if (!validateCPF(value)) {
      throw new AppError({
        status: 1,
        message: 'Documento inválido.'
      }, 400);
    }

    const documentRepository = getRepository(Document);

    const documentRegistered = await documentRepository.findOne({
      where: {
        value
      }
    });

    if (documentRegistered) {
      throw new AppError({
        status: 2,
        message: 'Documento já registrado.'
      }, 400);
    }

    const document = documentRepository.create({ value, blacklist, type });

    await documentRepository.save(document);

    return document;
  }

}

export default CreateDocumentService;
