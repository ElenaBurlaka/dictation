import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
// import Entering from './components/Content/Entering/Entering';
// import MyWords from './components/Content/MyWords/MyWords';
import Cookie from './components/Cookie/Cookie';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className='wrapper'>
        <div className='content'>
          <Sidebar />
          <Content />
        </div>
          <Cookie />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
