import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaEnvelope, FaUser } from 'react-icons/fa';
import LoginButton from './LoginButton';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { cart, dispatch, sendCartEmail, loading } = useApp();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const onSubmit = async (data) => {
    const result = await sendCartEmail(data);
    if (result.success) {
      alert(result.message);
      reset();
      setShowCheckout(false);
    } else {
      alert(result.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="shopping-cart empty">
        <div className="empty-cart">
          <FaShoppingCart size={64} />
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione alguns produtos para começar suas compras!</p>
          {!user && (
            <div className="login-prompt">
              <p>Faça login para sincronizar seu carrinho:</p>
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shopping-cart">
        <div className="login-required">
          <FaUser size={64} />
          <h2>Login Necessário</h2>
          <p>Para continuar com suas compras, faça login com sua conta Google:</p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h2><FaShoppingCart /> Carrinho de Compras</h2>
        <span className="cart-count">{cart.length} itens</span>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="item-category">{item.category}</p>
              <p className="item-price">R$ {item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="btn-quantity"
              >
                <FaMinus />
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="btn-quantity"
              >
                <FaPlus />
              </button>
            </div>
            <div className="item-total">
              R$ {(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="btn-remove"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <h3>Total: R$ {total.toFixed(2)}</h3>
        </div>
        <button 
          className="btn-checkout"
          onClick={() => setShowCheckout(true)}
          disabled={loading}
        >
          <FaEnvelope /> Finalizar Pedido
        </button>
      </div>

      {showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-form">
            <div className="form-header">
              <h3>Finalizar Pedido</h3>
              <button 
                className="btn-close"
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  {...register('name', { required: 'Nome é obrigatório' })}
                  type="text"
                  placeholder="Digite seu nome completo"
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  {...register('email', { 
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email inválido'
                    }
                  })}
                  type="email"
                  placeholder="seu@email.com"
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label>Telefone (opcional)</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="order-summary">
                <h4>Resumo do Pedido:</h4>
                <ul>
                  {cart.map(item => (
                    <li key={item.id}>
                      {item.name} x {item.quantity} - R$ {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <strong>Total: R$ {total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
