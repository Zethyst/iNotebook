import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React from 'react';

//installing npm i concurrently because we want to run react server and nodejs server at the same time
//when deploying, we host nodejs application and react application differently

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/noteState';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar title="iNotebook" aboutText="About" />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
