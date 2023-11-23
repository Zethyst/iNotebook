import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import NoteState from './context/notes/noteState';
import CategoryState from './context/categories/CategoryState';
import Alert from './components/Alert';
import Login from './components/Login';

//installing npm i concurrently because we want to run react server and nodejs server at the same time
//when deploying, we host nodejs application and react application differently

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  function showAlert(message, type) {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }
  return (
    <>
      <NoteState>
        <CategoryState>
          <BrowserRouter>
            <Navbar title="iNotebook" onSearch={handleSearch} />
            <div className='h-[82px]'></div>
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} searchKeyword={searchQuery}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            </Routes>
          </BrowserRouter>
        </CategoryState>
      </NoteState>
    </>
  );
}

export default App;
