import React, { ReactElement } from 'react';
import { Container, Card, Content } from './styles';

const InfoSection: React.FC = (): ReactElement => {
  return (
    <Container>
      <Content>
        <Card>Server Info</Card>
        <Card>Documents Info</Card>
        <Card>Add Document</Card>
      </Content>
    </Container>
  );
};

export default InfoSection;
