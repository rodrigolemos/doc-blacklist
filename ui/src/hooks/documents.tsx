import { useState, createContext, useContext } from 'react';
import { api } from '../services/api';

interface IDocument {
  type: string;
  value: string;
  blacklist: boolean | undefined;
}

interface IRequestStatus {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

interface IDocuments {
  documents: IDocument[] | undefined;
  fetchDocuments(document: IDocument): void;
  deleteDocument(document: string): Promise<boolean>;
  requestStatus: IRequestStatus;
  clearSearch(): void;
}

interface IDocumentsProvider {
  children: JSX.Element[] | JSX.Element;
}

const DocumentsContext = createContext({} as IDocuments);

const DocumentsProvider = ({ children }: IDocumentsProvider) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [requestStatus, setRequestStatus] = useState<IRequestStatus>({
    isLoading: false,
    hasError: false
  });

  const clearSearch = (): void => {
    setDocuments([]);
  }

  const fetchDocuments = async (document: IDocument): Promise<void> => {
    setRequestStatus({
      isLoading: true,
      hasError: false
    });

    try {
      const response = await api.get('/documents', {
        params: {
          type: document.type,
          blacklist: document.blacklist,
          value: document.value
        }
      });

      setDocuments(response.data);
      
      setRequestStatus({
        isLoading: false,
        hasError: false
      });

    } catch (err) {
      clearSearch();

      setRequestStatus({
        isLoading: false,
        hasError: false,
        errorMessage: err.message
      });
    }
  }

  const deleteDocument = async (document: string): Promise<boolean> => {
    setRequestStatus({
      isLoading: true,
      hasError: false
    });

    try {
      await api.delete('/documents', {
        data: {
          value: document
        }
      });
      
      setRequestStatus({
        isLoading: false,
        hasError: false
      });

      return true;

    } catch (err) {
      setRequestStatus({
        isLoading: false,
        hasError: false,
        errorMessage: err.message
      });

      return false;
    }
  }

  return (
    <DocumentsContext.Provider value={{
      documents,
      fetchDocuments,
      requestStatus,
      clearSearch,
      deleteDocument
    }}>
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
