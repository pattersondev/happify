import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/privacy" className="nav-link">Privacy</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  );
};

export default NavBar;
