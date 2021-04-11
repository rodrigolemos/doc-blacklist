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
  errorMessage: string;
}

interface IDocuments {
  documents: IDocument[] | undefined;
  addDocument(document: IDocument): Promise<boolean>;
  fetchDocuments(document: IDocument): Promise<void>;
  deleteDocument(document: string): Promise<boolean>;
  updateDocument(document: string, blacklist: boolean): Promise<boolean>;
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
    hasError: false,
    errorMessage: ''
  });

  const clearSearch = (): void => {
    setDocuments([]);
  }

  const addDocument = async (document: IDocument): Promise<boolean> => {
    setRequestStatus({
      isLoading: true,
      hasError: false,
      errorMessage: '',
    });

    try {
      await api.post('/documents', {
        type: document.type,
        blacklist: document.blacklist,
        value: document.value
      });
      
      setRequestStatus({
        isLoading: false,
        hasError: false,
        errorMessage: '',
      });

      clearSearch();

      return true;

    } catch (err) {

      setRequestStatus({
        isLoading: false,
        hasError: true,
        errorMessage: err.response.data.message.message
      });

      clearSearch();

      return false;
    }
  }

  const fetchDocuments = async (document: IDocument): Promise<void> => {
    setRequestStatus({
      isLoading: true,
      hasError: false,
      errorMessage: '',
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
        hasError: false,
        errorMessage: '',
      });

    } catch (err) {
      clearSearch();

      setRequestStatus({
        isLoading: false,
        hasError: true,
        errorMessage: err.response.data.message.message
      });
    }
  }

  const deleteDocument = async (document: string): Promise<boolean> => {
    setRequestStatus({
      isLoading: true,
      hasError: false,
      errorMessage: '',
    });

    try {
      await api.delete('/documents', {
        data: {
          value: document
        }
      });
      
      setRequestStatus({
        isLoading: false,
        hasError: false,
        errorMessage: '',
      });

      return true;

    } catch (err) {
      setRequestStatus({
        isLoading: false,
        hasError: true,
        errorMessage: err.response.data.message.message
      });

      return false;
    }
  }

  const updateDocument = async (document: string, blacklist: boolean): Promise<boolean> => {
    setRequestStatus({
      isLoading: true,
      hasError: false,
      errorMessage: '',
    });

    try {
      await api.put('/documents', {
        value: document,
        blacklist
      });
      
      setRequestStatus({
        isLoading: false,
        hasError: false,
        errorMessage: '',
      });

      return true;

    } catch (err) {
      setRequestStatus({
        isLoading: false,
        hasError: true,
        errorMessage: err.response.data.message.message
      });

      return false;
    }
  }

  return (
    <DocumentsContext.Provider value={{
      documents,
      addDocument,
      fetchDocuments,
      requestStatus,
      clearSearch,
      deleteDocument,
      updateDocument
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
