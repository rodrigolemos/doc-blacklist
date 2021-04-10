import { getRepository } from 'typeorm';
import { Document } from '../models/Document';
import AppError from '../errors/AppError';
import { validateDocument } from '../utils/document-validator';

interface IRequest {
  value?: string;
  blacklist?: string;
  type?: string;
}

class ListDocumentsService {

  public async execute(query: IRequest): Promise<Document[]> {
    const { value, blacklist, type } = query;

    const documentRepository = getRepository(Document);

    const where: IRequest = {};

    let validType;

    if (value) {
      const validation = validateDocument(value);

      if (!validation.isValid) {
        throw new AppError({
          status: 1,
          message: 'Documento inválido.'
        }, 400);
      }

      where.value = value;

      validType = validation.type;

      if (validType) {
        where.type = validType;
      }
    }

    if (blacklist) {
      where.blacklist = eval(blacklist);
    }

    if (!validType && type) {
      where.type = type;
    }

    const documents = await documentRepository.find({ where });

    if (!documents.length) {
      throw new AppError({
        status: 1,
        message: 'Documentos não encontrados para esse filtro.'
      }, 404);
    }

    return documents;
  }

}

export default ListDocumentsService;
