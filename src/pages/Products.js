import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar produtos e categorias
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('/api/products', {
            params: {
              category: currentCategory !== 'all' ? currentCategory : undefined,
              search: searchTerm || undefined
            }
          }),
          axios.get('/api/categories')
        ]);
        
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCategory, searchTerm]);

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
                key={category.id}
                className={`filter-btn ${currentCategory === category.slug ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Produtos */}
        {loading ? (
          <div className="loading">Carregando produtos...</div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="no-products">
                <p>Nenhum produto encontrado.</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
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
                      <button className="btn btn-primary btn-small">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
