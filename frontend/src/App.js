import styled from "styled-components";
import './components/Header.jsx'
import Header from './components/Header.jsx';
import ComparePage from './components/compare/ComparePage.jsx'

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppDiv id="app">
      <Header />
      <ComparePage />
    </AppDiv>
  );
}

export default App;


/*  glitchless 3:56 - 4uio
    glitchless 3:59 - 4tbx */

/* coffeerunner
   glitchless hundo 7:08 - 6nz8
   glitchless hundo 7:58 - 6k0x */