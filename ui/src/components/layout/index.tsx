import { ReactElement } from 'react';
import { Container } from './styles';

import Navbar from '../../components/navbar';
import InfoSection from '../../components/info-section';

interface ILayout {
  children: ReactElement | ReactElement[];
}

export default function Layout({ children }: ILayout): ReactElement {
  return (
    <Container>
      <div className="nav">
        <Navbar />
      </div>
      <div className="info-section">
        <InfoSection />
      </div>
      <div className="content">{children}</div>
    </Container>
  );
}
