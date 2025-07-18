import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FaShoppingCart } from 'react-icons/fa';

const Products = () => {
  const { products, dispatch } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';

  // Filtrar produtos baseado na categoria e termo de busca
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, currentCategory, searchTerm]);

  // Obter categorias únicas dos produtos
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories;
  }, [products]);

  const handleCategoryFilter = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');
    
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1>Produtos</h1>
        
        {/* Filtros e Busca */}
        <div className="products-filters">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              name="search"
              placeholder="Buscar produtos..."
              defaultValue={searchTerm}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
          
          <div className="category-filters">
            <button
              className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryFilter('all')}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${currentCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Produtos */}
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </Link>
                <div className="product-actions">
                  <button 
                    className="btn btn-primary btn-small"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart /> Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
