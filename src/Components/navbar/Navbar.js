import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" className="nav-link" onClick={toggleMenu}>
                    Home
                </Link>
                <Link to="/about" className="nav-link" onClick={toggleMenu}>
                    About
                </Link>
                <Link to="/contact" className="nav-link" onClick={toggleMenu}>
                    Contact
                </Link>
                <Link to="/privacy" className="nav-link" onClick={toggleMenu}>
                    Privacy
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;