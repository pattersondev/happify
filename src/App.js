import React, { useEffect, Component } from "react";
//import React, { Component } from 'react'; 
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Privacy from "./Components/pages/Privacy"; 
import About from "./Components/pages/About"; 
import Contact from "./Components/pages/Contact"; 
import Home from "./Components/pages/Home";
import "./App.css";
import Login from "./Components/Login";
import { getResponseToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Happify from "./Components/Happify";


function App() {
  
  return (
    <Router>
    <div className="App">
      <div className="header-container">
            <li> 
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                  <h2 className="Home">home</h2>
                </Link> 
            </li> 
            <li> 
                <Link to="/About" style={{ textDecoration: 'none', color: 'black' }}>
                  <h2 className="about">about</h2>
                </Link> 
            </li> 
            <li> 
                <Link to="/Privacy" style={{ textDecoration: 'none', color: 'black' }}>
                  <h2 className="about">privacy</h2>
                </Link> 
            </li> 
            <li> 
                <Link to="/Contact" style={{ textDecoration: 'none', color: 'black' }}>
                  <h2 className="contact">contact</h2>
                </Link> 
            </li> 
      </div>
      <Routes>
                <Route exact path='/' element={< Home />}></Route> 
                <Route exact path='/About' element={< About />}></Route> 
                <Route exact path='/Privacy' element={< Privacy />}></Route> 
                <Route exact path='/Contact' element={< Contact />}></Route> 
      </Routes>
      
      <div className="footer">
        <a href="https://www.linkedin.com/in/pattersonrsam/" style={{ color: "black" }} target='_blank'> created by sam patterson</a>
        <a href="https://www.linkedin.com/in/jackmoorecameron/" style={{ color: "black" }} target='_blank'> and jack cameron</a>
      </div>
    </div>
  </Router>
  );
}

export default App;
