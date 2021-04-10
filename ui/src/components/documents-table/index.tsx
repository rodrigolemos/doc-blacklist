import React, { ReactElement, useState, useRef } from 'react';
import { useDocuments } from '../../hooks/documents';
import { Centered, TableContainer } from './styles';
import { handleDocumentType, handleBlacklist } from '../../utils/handle-display-info';

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

const DocumentsTable: React.FC = (): ReactElement => {
  const { documents, requestStatus, deleteDocument, clearSearch } = useDocuments();
  const toast = useToast();
  const [documentToDelete, setDocumentToDelete] = useState<string>('');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = useRef() as React.MutableRefObject<HTMLInputElement> | undefined;

  const onClose = () => {
    setDocumentToDelete('');
    setIsOpen(false)
  };

  const setDeletion = (documentValue: string) => {
    setDocumentToDelete(documentValue);
    setIsOpen(true);
  };

  const handleDeleteDocument = async () => {
    setIsOpen(false);
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
      <div>{requestStatus.errorMessage || 'Erro'}</div>
    );
  }

  return (
    <>
      {documents?.length ? (
        <TableContainer>
          <>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Excluir Documento {documentToDelete}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Você tem certeza? Esta ação não pode ser desfeita.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteDocument} ml={3}>
                      Excluir
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
                  <Td>{document.value}</Td>
                  <Td>{handleBlacklist(document.blacklist)}</Td>
                  <Td>
                    <Button colorScheme="facebook" onClick={() => setIsOpen(true)}>
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
          Nenhum documento encontrado para o filtro.
        </Alert>
      )}
    </>
  );
};

export default DocumentsTable;
