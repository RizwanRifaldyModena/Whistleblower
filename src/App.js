import React, { useState } from "react";
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main_dashboard from "./components/main_dashboard";
import Login from "./components/login/login";
import Logout from "./components/logout/logout";
import Confirm_token from "./components/confirm/confirm";
import Main_card from "./components/main_card";
import Main_investigator from "./components/main_investigator";
import Tes from "./components/tes/tes";
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div>
      <Helmet>
			  <meta charSet='utf-8'/>
			  <title>WBS MODENA</title>
		  </Helmet>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_dashboard />} />  
          <Route path="/tes" element={<Tes />} />  
          <Route path="/card_list" element={<Main_card />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/logout" element={<Logout />} />  
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
