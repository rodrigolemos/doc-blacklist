import React, { ReactElement, useState } from 'react';
import { Container, Content, Filters } from './styles';
import { useDocuments } from '../../hooks/documents';

import { Button, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";

const Documents: React.FC = (): ReactElement => {
  const [type, setType] = useState<string>('');
  const [blacklist, setBlacklist] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const { fetchDocuments } = useDocuments();

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
            <RadioGroup onChange={setType} value={type} mr={10}>
              <Stack direction="row">
                <Radio value="">Todos</Radio>
                <Radio value="P">CPF</Radio>
                <Radio value="C">CNPJ</Radio>
              </Stack>
            </RadioGroup>

            <Select onChange={e => { setBlacklist(e.target.value)}} value={blacklist}>
              <option value="">Todos os documentos</option>
              <option value="Y">Somente os que são blacklist</option>
              <option value="N">Somente os que NÃO são blacklist</option>
            </Select>

            <Input
              placeholder="Pesquise um número de documento..."
              minLength={11}
              maxLength={14}
              value={value}
              onChange={(e) => { setValue(e.target.value)}}
            />
          </Stack>

          <Stack direction="row" align="center">
            <Button colorScheme="blue" onClick={handleSearchButton}>Pesquisar</Button>
          </Stack>
        </Filters>

        {/* <span>Table</span> */}

      </Content>
    </Container>
  );
};

export default Documents;
