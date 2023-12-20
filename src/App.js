import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import NoteState from './context/notes/noteState';
import CategoryState from './context/categories/CategoryState';
import Alert from './components/Alert';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import OTP from './components/OTP';

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
  const [ID, setID] = useState('');
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

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
              <Route exact path="/login" element={<Login setID={setID} showAlert={showAlert} credentials={credentials} setCredentials={setCredentials} />} />
              <Route exact path="/forgot-password" element={<ForgotPassword showAlert={showAlert}/>} />
              <Route exact path="/reset-password" element={<ResetPassword showAlert={showAlert}/>} />
              <Route exact path="/verify-email" element={<OTP ID={ID} showAlert={showAlert} email={credentials.email}/>} />
            </Routes>
          </BrowserRouter>
        </CategoryState>
      </NoteState>
    </>
  );
}

export default App;
