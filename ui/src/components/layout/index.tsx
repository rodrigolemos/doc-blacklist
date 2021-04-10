import { ReactElement } from 'react';
import { Container } from './styles';

import Navbar from '../../components/navbar';
import Documents from '../../components/documents';

export default function Layout(): ReactElement {
  return (
    <Container>
      <nav className="nav">
        <Navbar />
      </nav>
      <section className="content">
        <Documents />
      </section>
    </Container>
  );
}
