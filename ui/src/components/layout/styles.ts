import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-areas:
    'nav'
    'info-section'
    'content';
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 17vh 73vh;

  background-color: #f5f6f7;

  .nav {
    grid-area: nav;
  }

  .info-section {
    grid-area: info-section;
  }

  .content {
    grid-area: content;
  }
`;
