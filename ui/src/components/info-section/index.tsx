import React, { ReactElement } from 'react';
import { Container, Content } from './styles';

const InfoSection: React.FC = (): ReactElement => {
  return (
    <Container>
      <Content>
        <span>Info</span>
      </Content>
    </Container>
  );
};

export default InfoSection;
