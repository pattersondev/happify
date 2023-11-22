import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (

    
    <nav className="navbar">
      <Link to="/" className="nav-link">home</Link>
      <Link to="/about" className="nav-link">about</Link>
      <Link to="/contact" className="nav-link">contact</Link>
      <Link to="/privacy" className="nav-link">privacy</Link>
    </nav>
  );
};

export default NavBar;
