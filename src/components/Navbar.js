import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <h2>� MAN Nutrition</h2>
          </Link>
          
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
            >
              Suplementos
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              Sobre
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contato
            </Link>
          </div>
          
          <div className="nav-mobile-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
