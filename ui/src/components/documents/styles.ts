import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-y: auto;
  padding: 2rem 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 70%;
  height: 100%;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  box-shadow: 5px 5px 15px #eee;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 2rem;

  width: 100%;
  height: 4.2rem;
`;