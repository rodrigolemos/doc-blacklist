import styled from 'styled-components';

export const DesktopNav = styled.nav`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;

  background-color: #fff;
  box-shadow: 0px 5px 15px #eee;

  width: 100%;
  height: 10vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;


export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 70%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.8rem;
  }
`;

export const User = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;