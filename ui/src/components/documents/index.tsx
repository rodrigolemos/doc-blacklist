import React, { ReactElement } from 'react';
import { Container, Content, Filters } from './styles';

const Documents: React.FC = (): ReactElement => {
  return (
    <Container>
      <Content>
        <Filters>
          <span>Filters</span>
        </Filters>
        <span>Table</span>
      </Content>
    </Container>
  );
};

export default Documents;
