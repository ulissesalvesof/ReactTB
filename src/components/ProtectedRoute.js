import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaLock, FaGoogle } from 'react-icons/fa';
import LoginButton from './LoginButton';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-route loading">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="protected-route">
        <div className="access-denied">
          <FaLock size={64} />
          <h2>Acesso Restrito</h2>
          <p>Você precisa estar logado para acessar esta página.</p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
