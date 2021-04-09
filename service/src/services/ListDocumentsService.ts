import { getRepository } from 'typeorm';
import { Document } from '../models/Document';
import AppError from '../errors/AppError';
import { validateCPF } from '../utils/document-validator';

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

    if (value) {
      if (!validateCPF(value)) {
        throw new AppError({
          status: 1,
          message: 'Documento inválido.'
        }, 400);
      }

      where.value = value;
    }

    if (blacklist) {
      where.blacklist = eval(blacklist);
    }

    if (type) {
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
