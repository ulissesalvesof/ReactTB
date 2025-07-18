import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaUser, FaSignInAlt } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const { user, loginWithGoogle, logout, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await loginWithGoogle();
      if (result.success) {
        alert('Login realizado com sucesso!');
      } else {
        alert('Erro ao fazer login: ' + result.error);
      }
    } catch (error) {
      alert('Erro inesperado: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await logout();
      if (result.success) {
        alert('Logout realizado com sucesso!');
      } else {
        alert('Erro ao fazer logout: ' + result.error);
      }
    } catch (error) {
      alert('Erro inesperado: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {user ? (
          <div className="user-info">
            <div className="user-avatar">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" />
              ) : (
                <FaUser size={40} />
              )}
            </div>
            <div className="user-details">
              <h3>Olá, {user.displayName || 'Usuário'}!</h3>
              <p>{user.email}</p>
              <button 
                className="btn btn-logout"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <FaSignInAlt />
                {isLoading ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </div>
        ) : (
          <div className="login-form">
            <div className="login-header">
              <h2>Bem-vindo!</h2>
              <p>Faça login para salvar seu carrinho e acompanhar seus pedidos</p>
            </div>
            
            <button 
              className="btn btn-google"
              onClick={handleLogin}
              disabled={isLoading}
            >
              <FaGoogle />
              {isLoading ? 'Entrando...' : 'Entrar com Google'}
            </button>
            
            <div className="login-benefits">
              <h4>Benefícios de fazer login:</h4>
              <ul>
                <li>🛒 Carrinho sincronizado</li>
                <li>📱 Acesso em qualquer dispositivo</li>
                <li>📦 Histórico de pedidos</li>
                <li>🎯 Recomendações personalizadas</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
