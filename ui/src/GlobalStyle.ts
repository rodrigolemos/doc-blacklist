import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans', sans-serif;
  }

  body {
    width: 100vw;
    
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: .8rem;
  }

  ::-webkit-scrollbar-track {
    background: #F1F1F1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #AAA;
    border-radius: .2rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888; 
  }

  :root {
    --warning: #F59E0B;
    --danger: #DC2626;
    --success: #10B981;
  }
`;
