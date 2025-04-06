import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import NavSection from './NavSection/NavSection';

function App() {
  return (
    <div className="App">
      <NavSection></NavSection>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
