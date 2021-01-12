import styled from "styled-components";
import './components/Header.jsx'
import Header from './components/Header.jsx';
import ComparePage from './components/splitstable/SplitsTablePage.jsx'
import FAQ from './components/FAQ.jsx'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppDiv id="app">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={ComparePage} exact />
          <Route path="/faq" component={FAQ} />
        </Switch>
      </BrowserRouter>
    </AppDiv>
  );
}

export default App;


/*  glitchless 3:56 - 4uio
    glitchless 3:59 - 4tbx */

/* coffeerunner
   glitchless hundo 7:08 - 6nz8
   glitchless hundo 7:58 - 6k0x */