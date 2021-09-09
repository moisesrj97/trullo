import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  const state = useSelector((state) => state);
  return (
    <div className='App'>
      <h1>Hello world!</h1>
    </div>
  );
}

export default App;
