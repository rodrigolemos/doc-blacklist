import { useState, createContext, useContext } from 'react';
import { api } from '../services/api';

interface IDocument {
  type: string;
  value: string;
  blacklist: boolean | undefined;
}

interface IDocuments {
  documents: IDocument[] | undefined;
  fetchDocuments(document: IDocument): void;
}

interface IDocumentsProvider {
  children: JSX.Element[] | JSX.Element;
}

const DocumentsContext = createContext({} as IDocuments);

const DocumentsProvider = ({ children }: IDocumentsProvider) => {
  const [documents, setDocuments] = useState<IDocument[]>();

  const fetchDocuments = async (document: IDocument): Promise<void> => {

    try {
      const response = await api.get('/documents', {
        params: {
          type: document.type,
          blacklist: document.blacklist,
          value: document.value
        }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setDocuments([]);
  }

  return (
    <DocumentsContext.Provider value={{ documents, fetchDocuments }}>
      { children }
    </DocumentsContext.Provider>
  )
}

const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) throw new Error('useDocuments must be used within DocumentsContext');
  return context;
}

export { DocumentsProvider, useDocuments };
