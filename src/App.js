import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';


//installing npm i concurrently because we want to run react server and nodejs server at the same time
//when deploying, we host nodejs application and react application differently

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [alert,setAlert]=useState(null);
  function showAlert(message,type){
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar title="iNotebook" aboutText="About" />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
