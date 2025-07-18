import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import SimpleFooter from './components/SimpleFooter';
import Home from './pages/Home/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ShoppingCart from './components/ShoppingCart';
import ProductManager from './components/ProductManager';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <ProductManager />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <SimpleFooter />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
