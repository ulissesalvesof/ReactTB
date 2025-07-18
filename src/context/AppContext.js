import React, { createContext, useContext, useReducer, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useAuth } from './AuthContext';
import { productService, cartService, orderService } from '../services/firebaseService';

// Contexto
const AppContext = createContext();

// Reducer para gerenciar o estado
const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'LOAD_CART':
      return { ...state, cart: action.payload };
    
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};

// Estado inicial
const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: null
};

// Provider do contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user } = useAuth();

  // Carregar produtos do Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const products = await productService.getProducts();
        dispatch({ type: 'LOAD_PRODUCTS', payload: products });
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadProducts();
  }, []);

  // Carregar carrinho do usuário quando logado
  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        try {
          const cart = await cartService.getCart(user.uid);
          if (cart.items) {
            dispatch({ type: 'LOAD_CART', payload: cart.items });
          }
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error);
        }
      };

      loadCart();
    } else {
      // Limpar carrinho quando não logado
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user]);

  // Salvar carrinho no Firebase quando houver alterações
  useEffect(() => {
    if (user && state.cart.length >= 0) {
      const saveCart = async () => {
        try {
          await cartService.saveCart(user.uid, state.cart);
        } catch (error) {
          console.error('Erro ao salvar carrinho:', error);
        }
      };

      // Delay para evitar muitas chamadas
      const timeout = setTimeout(saveCart, 500);
      return () => clearTimeout(timeout);
    }
  }, [user, state.cart]);

  // Funções para produtos
  const addProduct = async (productData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newProduct = await productService.addProduct(productData);
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      return { success: true, product: newProduct };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedProduct = await productService.updateProduct(id, productData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      return { success: true, product: updatedProduct };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await productService.deleteProduct(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Função para enviar email com itens do carrinho
  const sendCartEmail = async (customerInfo) => {
    if (!user) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const cartItems = state.cart.map(item => 
        `${item.name} - Quantidade: ${item.quantity} - Preço: R$ ${item.price.toFixed(2)}`
      ).join('\n');
      
      const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Criar pedido no Firebase
      const orderData = {
        userId: user.uid,
        customerInfo,
        items: state.cart,
        total,
        status: 'pending'
      };
      
      await orderService.createOrder(orderData);
      
      const templateParams = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || 'Não informado',
        cart_items: cartItems,
        total_amount: `R$ ${total.toFixed(2)}`,
        order_date: new Date().toLocaleString('pt-BR'),
        user_name: user.displayName || 'Usuário',
        user_email: user.email
      };

      // Enviar email (opcional - mantém funcionalidade original)
      if (process.env.REACT_APP_EMAILJS_SERVICE_ID) {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_EMAILJS_USER_ID
        );
      }

      // Limpar carrinho
      await cartService.clearCart(user.uid);
      dispatch({ type: 'CLEAR_CART' });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: true, message: 'Pedido enviado com sucesso!' };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Erro ao enviar pedido. Tente novamente.' };
    }
  };

  const value = {
    ...state,
    dispatch,
    sendCartEmail,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar o contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
