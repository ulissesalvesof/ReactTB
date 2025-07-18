import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaCog, FaUser } from 'react-icons/fa';
import LoginButton from './LoginButton';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { cart } = useApp();
  const { user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <h2>🏪 MAN Nutrition</h2>
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
              Produtos
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
          
          <div className="nav-actions">
            <Link 
              to="/cart" 
              className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
            >
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
            
            {user ? (
              <div className="user-info">
                <img 
                  src={user.photoURL || '/default-avatar.png'} 
                  alt="Avatar" 
                  className="user-avatar"
                />
                <span className="user-name">{user.displayName?.split(' ')[0] || 'Usuário'}</span>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`nav-link login-link ${isActive('/login') ? 'active' : ''}`}
              >
                <FaUser />
                Login
              </Link>
            )}
            
            <Link 
              to="/admin" 
              className={`nav-link admin-link ${isActive('/admin') ? 'active' : ''}`}
            >
              <FaCog />
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
