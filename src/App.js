import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import NoteState from './context/notes/noteState';
import CategoryState from './context/categories/CategoryState';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import OTP from './components/OTP';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showMessage, clearMessage ,selectMessage, selectMessageType } from "./store/reducers/notificationSlice";


//installing npm i concurrently because we want to run react server and nodejs server at the same time
//when deploying, we host nodejs application and react application differently

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginMobile from './components/LoginMobile';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ID, setID] = useState('');
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const messageType = useSelector(selectMessageType);


  const showToastMessage = (message, messageType) => {
    switch (messageType) {
      case 'success':
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        break;
      case 'error':
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
        break;
      case 'warning':
        toast.warning(message, { position: toast.POSITION.TOP_RIGHT });
        break;
      default:
        toast.info(message, { position: toast.POSITION.TOP_RIGHT });
    }
  };
  

  React.useEffect(() => {
    if (message) {
      showToastMessage(message, messageType);
      dispatch(clearMessage());
    }
  }, [message, messageType, dispatch]);
  

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
            <ToastContainer/>
            <Routes>
              <Route exact path="/" element={<Home searchKeyword={searchQuery}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login setID={setID} credentials={credentials} setCredentials={setCredentials} />} />
              <Route exact path="/login-app" element={<LoginMobile setID={setID} credentials={credentials} setCredentials={setCredentials} />} />
              <Route exact path="/forgot-password" element={<ForgotPassword/>} />
              <Route exact path="/reset-password" element={<ResetPassword/>} />
              <Route exact path="/verify-email" element={<OTP ID={ID} email={credentials.email}/>} />
            </Routes>
          </BrowserRouter>
        </CategoryState>
      </NoteState>
    </>
  );
}

export default App;
