import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './LoginButton.css';

const LoginButton = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        console.log('Login realizado com sucesso!');
      } else {
        alert('Erro no login: ' + result.error);
      }
    } catch (error) {
      alert('Erro no login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        console.log('Logout realizado com sucesso!');
      } else {
        alert('Erro no logout: ' + result.error);
      }
    } catch (error) {
      alert('Erro no logout: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="user-info">
        <div className="user-avatar">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            <FaUser />
          )}
        </div>
        <div className="user-details">
          <span className="user-name">{user.displayName}</span>
          <button 
            onClick={handleLogout}
            disabled={loading}
            className="logout-btn"
          >
            <FaSignOutAlt /> {loading ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={handleLogin}
      disabled={loading}
      className="login-btn"
    >
      <FaGoogle /> {loading ? 'Entrando...' : 'Entrar com Google'}
    </button>
  );
};

export default LoginButton;
