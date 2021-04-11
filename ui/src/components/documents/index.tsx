import React, { ReactElement, useState } from 'react';
import { Container, Content, Filters } from './styles';
import { useDocuments } from '../../hooks/documents';
import DocumentsTable from '../documents-table';

import { Button, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';

const Documents: React.FC = (): ReactElement => {
  const [type, setType] = useState<string>('');
  const [blacklist, setBlacklist] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const [order, setOrder] = useState<string>('type');

  const { fetchDocuments, clearSearch, requestStatus } = useDocuments();

  const handleType = (value: string): void => {
    clearSearch();
    setType(value);
  }

  const handleBlacklist = (e: any): void => {
    clearSearch();
    setBlacklist(e.target.value);
  }

  const handleDocumentValue = (e: any): void => {
    clearSearch();
    setValue(e.target.value.replace(/\.|-|\//g, ''));
  }

  const handleOrder = (e: any): void => {
    clearSearch();
    setOrder(e.target.value);
  }

  const handleSearchButton = () => {
    let queryBlacklist = undefined;

    if (blacklist === 'Y') {
      queryBlacklist = true;
    }

    if (blacklist === 'N') {
      queryBlacklist = false;
    }

    fetchDocuments({
      blacklist: queryBlacklist,
      type,
      value
    }, order);
  }

  return (
    <Container>
      <Content>

        <Filters>
          <Stack spacing={10} direction="row" align="center" w="90%">
            <RadioGroup onChange={handleType} value={type} mr={10}>
              <Stack direction="row">
                <Radio value="">Todos</Radio>
                <Radio value="P">CPF</Radio>
                <Radio value="C">CNPJ</Radio>
              </Stack>
            </RadioGroup>

            <Select onChange={handleBlacklist} value={blacklist}>
              <option value="">Todos os documentos</option>
              <option value="Y">Somente os que são blacklist</option>
              <option value="N">Somente os que NÃO são blacklist</option>
            </Select>

            <Input
              placeholder="Pesquise um documento..."
              minLength={11}
              maxLength={14}
              value={value}
              onChange={handleDocumentValue}
            />

            <Select onChange={handleOrder} value={order}>
              <option value="type">Ordenar por tipo</option>
              <option value="blacklist">Ordenar por blacklist</option>
            </Select>

          </Stack>

          <Stack direction="row" align="center" ml={2}>

            <Button
              colorScheme="blue"
              onClick={handleSearchButton}
              isLoading={requestStatus.isLoading}
            >
              Pesquisar
            </Button>
          </Stack>
        </Filters>

        <DocumentsTable />

      </Content>
    </Container>
  );
};

export default Documents;
