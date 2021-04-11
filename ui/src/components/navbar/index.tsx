import React, { ReactElement, useRef, useState } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import { DesktopNav, NavContent, Title, User } from './styles';
import { useDocuments } from '../../hooks/documents';
import { validateDocument } from '../../utils/document-validator';
import { api } from '../../services/api';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

interface IRequestStatus {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

interface IServerStatus {
  uptime: string;
  requestsQuantity: number;
}

const Navbar: React.FC = (): ReactElement => {
  const toast = useToast();
  const { addDocument, clearSearch } = useDocuments();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isServerStatusOpen, setIsServerStatusOpen] = useState<boolean>(false);
  const [isBlacklist, setIsBlacklist] = useState<string>('N');
  const [value, setValue] = useState<string>('');
  
  const [serverStatus, setServerStatus] = useState<IServerStatus>({} as IServerStatus);
  const [requestStatus, setRequestStatus] = useState<IRequestStatus>({
    isLoading: false,
    hasError: false,
    errorMessage: ''
  });

  const initialRef = useRef() as React.MutableRefObject<HTMLInputElement> | undefined;
  
  const closeServerStatus = () => {
    setIsServerStatusOpen(false);
  }

  const handleDocumentValue = (e: any): void => {
    clearSearch();
    setValue(e.target.value.replace(/\.|-|\//g, ''));
  }

  const handleAddDocument = async () => {
    clearSearch();

    const validation = validateDocument(value);

    if (!validation.isValid) {
      toast({
        title: 'Documento inválido.',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const document = {
      type: validation.type,
      blacklist: isBlacklist === 'Y' ? true : false,
      value
    }

    if (await addDocument(document)) {
      toast({
        title: 'Documento incluído.',
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Não foi possível incluir o documento.',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    onClose();
  }

  const fetchServerStatus = async (): Promise<void> => {
    setRequestStatus({
      isLoading: true,
      hasError: false,
      errorMessage: '',
    });

    try {
      const response = await api.get('/status');

      setServerStatus(response.data);
      
      setRequestStatus({
        isLoading: false,
        hasError: false,
        errorMessage: '',
      });

      setIsServerStatusOpen(!isServerStatusOpen);

    } catch (err) {
      setRequestStatus({
        isLoading: false,
        hasError: true,
        errorMessage: err.response.data.message.message
      });
    }
  }

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isServerStatusOpen}
        onClose={closeServerStatus}
        placement="bottom"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button colorScheme="pink">Popover Target</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Informações do Servidor</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text as="p">
              <Text as="label">Tempo de servidor:</Text> {serverStatus.uptime}
            </Text>
            <Text as="p">
              <Text as="label">Quantidade de requisições:</Text> {serverStatus.requestsQuantity}
            </Text>
          </PopoverBody>
        </PopoverContent>

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Incluir Documento</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Número do documento</FormLabel>
                <Input ref={initialRef} placeholder="CPF ou CNPJ" onChange={handleDocumentValue}/>
              </FormControl>

              <FormControl display="flex" alignItems="center" mt={7}>
                <FormLabel htmlFor="blacklist" mb="0">
                  Está na blacklist?
                </FormLabel>

                <RadioGroup onChange={setIsBlacklist} value={isBlacklist}>
                  <Stack direction="row">
                    <Radio value="Y">Sim</Radio>
                    <Radio value="N">Não</Radio>
                  </Stack>
                </RadioGroup>

              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddDocument}>
                Incluir
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <DesktopNav>
          <NavContent>
            <Title>
              <BsCardChecklist />
              <span>Document Blacklist</span>
            </Title>
            <User>
              <Stack direction="row" align="center">
                <PopoverTrigger>
                  <Button
                    colorScheme="gray"
                    onClick={fetchServerStatus}
                    isLoading={requestStatus.isLoading}
                  >
                    Informações do Servidor
                  </Button>
                </PopoverTrigger>
                <Button colorScheme="orange" onClick={onOpen}>Incluir Documento</Button>
              </Stack>
            </User>
          </NavContent>
        </DesktopNav>
      </Popover>
    </>
  );
};

export default Navbar;
