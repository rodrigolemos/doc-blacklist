import { getRepository } from 'typeorm';
import { Document } from '../models/Document';
import AppError from '../errors/AppError';
import { validateDocument } from '../utils/document-validator';

interface IRequest {
  value?: string;
  blacklist?: string;
  type?: string;
  orderField?: string;
}
class ListDocumentsService {

  public async execute(query: IRequest): Promise<Document[]> {
    const { value, blacklist, type, orderField } = query;

    const documentRepository = getRepository(Document);

    const where: IRequest = {};

    if (value) {
      const validation = validateDocument(value);

      if (!validation.isValid) {
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

    let order = 'type';

    if (orderField === 'type' || orderField === 'blacklist') {
      order = orderField;
    }

    const documents = await documentRepository.find({ where, order: { [order]: 'ASC' } });

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
