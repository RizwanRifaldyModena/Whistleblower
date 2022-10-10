import React, { useState } from "react";
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main_dashboard from "./components/main_dashboard";
import Login from "./components/login/login";
import Confirm_token from "./components/confirm/confirm";
import Main_card from "./components/main_card";
import Main_investigator from "./components/main_investigator";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_dashboard />} />  
          <Route path="/card_list" element={<Main_card />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/confirm" element={<Confirm_token />} />  
          <Route path="/investigator" element={<Main_investigator />} />  
        </Routes>
      </BrowserRouter>
      {/* <Sidebar/> */}
      {/* <Main_card/> */}
      
    </div>
  );
}

export default App;
