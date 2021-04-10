import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-areas:
    'nav'
    'content';
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 90vh;

  background-color: #f5f6f7;

  .nav {
    grid-area: nav;
  }

  .content {
    grid-area: content;
  }
`;
