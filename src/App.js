import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import Cookie from './components/Cookie/Cookie';
import { useState } from 'react';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <BrowserRouter>
    <div className="App">
      <div className='wrapper'>
        <div className='content'>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
          <Content />
        </div>
          <Cookie />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
