import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background:rgb(81, 131, 207);
  }

  * {
    box-sizing: border-box;
  }
`;