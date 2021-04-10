import React, { ReactElement } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import { DesktopNav, NavContent, Title, User } from './styles';

const Navbar: React.FC = (): ReactElement => {
  return (
    <>
      <DesktopNav>
        <NavContent>
          <Title>
            <BsCardChecklist />
            <span>Document Blacklist</span>
          </Title>
          <User>User</User>
        </NavContent>
      </DesktopNav>
    </>
  );
};

export default Navbar;
