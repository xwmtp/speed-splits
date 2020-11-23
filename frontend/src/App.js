import './App.css';
import './components/Header.jsx'
import Header from './components/Header.jsx';
import ComparePage from './components/compare/ComparePage.jsx'

function App() {
  return (
    <div className="App">
    <Header/>
    <ComparePage/>
    </div>
  );
}

export default App;
