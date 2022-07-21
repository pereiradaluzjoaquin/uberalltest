import logo from './logo.svg';
import './App.css';
import { Search } from './Search/Components/Search';

function App() {



  return (
    <div className="App container">
          <h2 className='my-4'>Is your company listed accurately in these online directories?</h2>
          <h5 className='my-5'>COMPANY PRESENCE CHECK</h5>
          <Search />
    </div>
  );
}

export default App;
