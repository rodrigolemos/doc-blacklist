import React, { ReactElement, useState, useRef } from 'react';
import { useDocuments } from '../../hooks/documents';
import { Centered, TableContainer } from './styles';
import { handleDocument, handleDocumentType, handleBlacklist } from '../../utils/handle-display-info';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  Button,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast
} from '@chakra-ui/react';

interface IDocumentUpdate {
  value: string;
  blacklist: boolean | undefined;
}

const DocumentsTable: React.FC = (): ReactElement => {
  const toast = useToast();
  const { documents, requestStatus, deleteDocument, updateDocument, clearSearch } = useDocuments();

  const [documentToDelete, setDocumentToDelete] = useState<string>('');
  const [documentToUpdate, setDocumentToUpdate] = useState<IDocumentUpdate>({} as IDocumentUpdate);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  const cancelRef = useRef() as React.MutableRefObject<HTMLInputElement> | undefined;

  const onDeleteClose = () => {
    setDocumentToDelete('');
    setIsDeleteOpen(false)
  };

  const onUpdateClose = () => {
    setDocumentToUpdate({} as IDocumentUpdate);
    setIsUpdateOpen(false)
  };

  const setDeletion = (documentValue: string) => {
    setDocumentToDelete(documentValue);
    setIsDeleteOpen(true);
  };

  const setUpdate = (documentValue: IDocumentUpdate) => {
    setDocumentToUpdate(documentValue);
    setIsUpdateOpen(true);
  };

  const handleDeleteDocument = async () => {
    setIsDeleteOpen(false);
    clearSearch();
    if (await deleteDocument(documentToDelete)) {
      toast({
        title: 'Documento excluído.',
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Não foi possível excluir o documento. Tente novamente mais tarde.',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const handleUpdateDocument = async () => {
    setIsUpdateOpen(false);
    clearSearch();

    const blacklist = !documentToUpdate.blacklist;

    if (await updateDocument(documentToUpdate.value, blacklist)) {
      toast({
        title: 'Blacklist atualizada.',
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Não foi possível atualizar o documento na blacklist. Tente novamente mais tarde.',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (requestStatus.isLoading) {
    return (
      <Centered>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Centered>
    );
  }

  if (requestStatus.hasError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {requestStatus.errorMessage || 'Erro'}
      </Alert>
    );
  }

  return (
    <>
      {documents?.length ? (
        <TableContainer>
          <>
            <AlertDialog
              isOpen={isDeleteOpen}
              leastDestructiveRef={cancelRef}
              onClose={onDeleteClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Excluir Documento {documentToDelete}?
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Você tem certeza? Esta ação não pode ser desfeita.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onDeleteClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteDocument} ml={3}>
                      Excluir
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            <AlertDialog
              isOpen={isUpdateOpen}
              leastDestructiveRef={cancelRef}
              onClose={onUpdateClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Alterar blacklist do documento {documentToUpdate.value}?
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Você pode voltar essa ação caso não tenha certeza.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onUpdateClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="facebook" onClick={handleUpdateDocument} ml={3}>
                      Alterar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
          <Table variant="simple">
            <TableCaption>Documentos cadastrados no sistema</TableCaption>
            <Thead>
              <Tr>
                <Th>Tipo</Th>
                <Th>Documento</Th>
                <Th>Está na blacklist?</Th>
                <Th>Alterar blacklist</Th>
                <Th>Excluir do cadastro</Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map(document => (
                <Tr key={document.value}>
                  <Td>{handleDocumentType(document.type)}</Td>
                  <Td>{handleDocument(document.value)}</Td>
                  <Td>{handleBlacklist(document.blacklist)}</Td>
                  <Td>
                    <Button colorScheme="facebook" onClick={() => { setUpdate(document) }}>
                      Alterar
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => { setDeletion(document.value) }}>
                      Excluir
                    </Button>
                  </Td>
                </Tr>  
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Alert status="info">
          <AlertIcon />
          Clique em pesquisar para listar os documentos.
        </Alert>
      )}
    </>
  );
};

export default DocumentsTable;
