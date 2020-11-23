import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg-color: rgb(38,38,38);
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
        font-family: "PT Sans", sans-serif;
  }

`;

export default GlobalStyle;
