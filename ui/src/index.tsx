import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { ChakraProvider } from '@chakra-ui/react';
import { DocumentsProvider } from './hooks/documents';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <DocumentsProvider>
        <App />
        <GlobalStyle />
      </DocumentsProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
