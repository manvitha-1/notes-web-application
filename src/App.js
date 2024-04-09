import React from "react";
import Header from './components/Header'
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
    </div>
  ); 
}

export default App;
