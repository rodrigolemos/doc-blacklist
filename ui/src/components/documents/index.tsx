import React, { ReactElement, useState } from 'react';
import { Container, Content, Filters } from './styles';
import { useDocuments } from '../../hooks/documents';
import DocumentsTable from '../documents-table';

import { Button, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";

const Documents: React.FC = (): ReactElement => {
  const [type, setType] = useState<string>('');
  const [blacklist, setBlacklist] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const { fetchDocuments, clearSearch } = useDocuments();

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
    setValue(e.target.value);
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
    });
  }

  return (
    <Container>
      <Content>

        <Filters>
          <Stack spacing={15} direction="row" align="center" w="90%">
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
              placeholder="Pesquise um número de documento..."
              minLength={11}
              maxLength={14}
              value={value}
              onChange={handleDocumentValue}
            />
          </Stack>

          <Stack direction="row" align="center">
            <Button colorScheme="blue" onClick={handleSearchButton}>Pesquisar</Button>
          </Stack>
        </Filters>

        <DocumentsTable />

      </Content>
    </Container>
  );
};

export default Documents;
