import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        setError('Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Carregando produto...</div>;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="error-message">
            <h2>{error}</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Voltar aos Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        {product && (
          <div className="product-detail">
            <div className="product-detail-grid">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-info">
                <h1>{product.name}</h1>
                <p className="product-category">{product.category}</p>
                <p className="product-price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                
                <div className="product-description">
                  <h3>Descrição</h3>
                  <p>{product.description}</p>
                </div>
                
                {product.specifications && (
                  <div className="product-specs">
                    <h3>Especificações</h3>
                    <ul>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="product-actions">
                  <button className="btn btn-primary">
                    Adicionar ao Carrinho
                  </button>
                  <button className="btn btn-secondary" onClick={() => navigate('/products')}>
                    Voltar aos Produtos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
