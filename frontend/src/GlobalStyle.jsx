import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg-color: rgb(38,38,38);
        --sidebar-color: rgb(30, 30, 30);
        --yellow: rgb(237, 227, 83);
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100%;
        overflow-y: scroll;
    }
  
    body {
        height: 100%;
        width: 100%;
        background-color: var(--bg-color);
        color: white;
        font-family: "Nunito", sans-serif;
  }

`;

export default GlobalStyle;
