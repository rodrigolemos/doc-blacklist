import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-areas:
    'nav'
    'info'
    'content';
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 15vh 75vh;

  background-color: #f5f6f7;

  .nav {
    grid-area: nav;
  }

  .info {
    grid-area: info;
  }

  .content {
    grid-area: content;
  }
`;
