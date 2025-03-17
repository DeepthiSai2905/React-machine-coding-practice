import logo from './logo.svg';
import './App.css';
import AutoComplete from './Components/AutoComplete';
import ProgressBar from './Components/ProgressBar';

function App() {

  const bars = [5,10,30,50,70,90,98,100];
  return (
    <div className="App">
      {/* <AutoComplete /> */}
      {bars.map((item)=>(
        <ProgressBar progress={item} />
      ))}
    </div>
  );
}

export default App;
