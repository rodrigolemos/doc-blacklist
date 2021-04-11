import React, { ReactElement, useRef, useState } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import { DesktopNav, NavContent, Title, User } from './styles';
import { useDocuments } from '../../hooks/documents';
import { validateDocument } from '../../utils/document-validator';

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
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

const Navbar: React.FC = (): ReactElement => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addDocument, clearSearch } = useDocuments();

  const [isBlacklist, setIsBlacklist] = useState<string>('N');
  const [value, setValue] = useState<string>('');

  const initialRef = useRef() as React.MutableRefObject<HTMLInputElement> | undefined;

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

  return (
    <>
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
              {/* <Switch id="blacklist" onChange={(e) => setIsBlacklist(e.target.checked)} /> */}
              
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
              <Button colorScheme="gray">Informações do Servidor</Button>
              <Button colorScheme="orange" onClick={onOpen}>Incluir Documento</Button>
            </Stack>
          </User>
        </NavContent>
      </DesktopNav>
    </>
  );
};

export default Navbar;
