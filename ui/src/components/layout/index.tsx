import { ReactElement } from 'react';
import { Container } from './styles';

import Navbar from '../../components/navbar';

interface ILayout {
  children: ReactElement | ReactElement[];
}

export default function Layout({ children }: ILayout): ReactElement {
  return (
    <Container>
      <div className="nav">
        <Navbar />
      </div>
      <div className="info">
        Info
      </div>
      <div className="content">{children}</div>
    </Container>
  );
}
