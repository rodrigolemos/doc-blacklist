import React, { ReactElement } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import { DesktopNav, NavContent, Title, User } from './styles';

import { Button, Stack } from '@chakra-ui/react';

const Navbar: React.FC = (): ReactElement => {
  return (
    <>
      <DesktopNav>
        <NavContent>
          <Title>
            <BsCardChecklist />
            <span>Document Blacklist</span>
          </Title>
          <User>
            <Stack direction="row" align="center">
              <Button colorScheme="gray">Informações do Servidor</Button>
              <Button colorScheme="orange">Incluir Documento</Button>
            </Stack>
          </User>
        </NavContent>
      </DesktopNav>
    </>
  );
};

export default Navbar;
