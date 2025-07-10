import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, statsResponse] = await Promise.all([
          axios.get('/api/products/featured'),
          axios.get('/api/stats')
        ]);
        
        setFeaturedProducts(productsResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goals = [
    {
      id: 1,
      title: 'Ganho de Massa',
      icon: '💪',
      description: 'Produtos para hipertrofia muscular',
      category: 'mass-gain'
    },
    {
      id: 2,
      title: 'Emagrecimento',
      icon: '🔥',
      description: 'Suplementos para queima de gordura',
      category: 'weight-loss'
    },
    {
      id: 3,
      title: 'Performance',
      icon: '⚡',
      description: 'Melhore seu desempenho nos treinos',
      category: 'performance'
    },
    {
      id: 4,
      title: 'Saúde & Bem-estar',
      icon: '🌱',
      description: 'Vitaminas e minerais essenciais',
      category: 'health'
    }
  ];

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>MAN Nutrition</h1>
            <p>Sua loja de suplementos com os melhores produtos do mercado</p>
            <div className="hero-highlight">
              <span className="discount-badge">5% OFF no PIX</span>
              <span className="free-shipping">Frete grátis acima de R$ 99</span>
            </div>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Ver Produtos</Link>
              <Link to="/about" className="btn btn-secondary">Sobre Nós</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">💰</span>
              <p>Desconto de 5% no PIX</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚚</span>
              <p>Frete grátis acima de R$ 99</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔄</span>
              <p>Troca e devolução em até 30 dias</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <p>Produtos originais garantidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      {stats && (
        <section className="stats-section">
          <div className="container">
            <h2>Números que impressionam</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>{stats.totalProducts}+</h3>
                <p>Suplementos Disponíveis</p>
              </div>
              <div className="stat-item">
                <h3>{stats.totalCategories}+</h3>
                <p>Categorias</p>
              </div>
              <div className="stat-item">
                <h3>{stats.totalUsers}+</h3>
                <p>Clientes Satisfeitos</p>
              </div>
              <div className="stat-item">
                <h3>{stats.totalOrders}+</h3>
                <p>Pedidos Entregues</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Qual sua meta */}
      <section className="goals-section">
        <div className="container">
          <div className="section-header">
            <h2>Qual a sua meta?</h2>
            <p>Encontre os produtos ideais para o seu objetivo</p>
          </div>
          
          <div className="goals-grid">
            {goals.map(goal => (
              <Link 
                key={goal.id} 
                to={`/products?category=${goal.category}`}
                className="goal-card"
              >
                <div className="goal-icon">{goal.icon}</div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
            <p>Os suplementos mais vendidos da nossa loja</p>
          </div>

          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-badge">Destaque</div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <div className="product-pricing">
                      <p className="product-price">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="product-installments">
                        ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="product-actions">
                  <button className="btn btn-cart">Adicionar ao Carrinho</button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/products" className="btn btn-primary">Ver Todos os Suplementos</Link>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="features-section">
        <div className="container">
          <h2>Por que escolher a MAN Nutrition?</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🏆</div>
              <h3>Qualidade Garantida</h3>
              <p>Produtos das melhores marcas do mercado com certificação</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">�</div>
              <h3>Produtos Testados</h3>
              <p>Todos os suplementos passam por rigorosos testes de qualidade</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">�</div>
              <h3>Entrega Rápida</h3>
              <p>Receba seus produtos em até 3 dias úteis em todo o Brasil</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💊</div>
              <h3>Suporte Nutricional</h3>
              <p>Tire suas dúvidas com nossos especialistas em nutrição</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Receba nossas ofertas exclusivas</h2>
            <p>Cadastre-se e seja o primeiro a saber sobre promoções e lançamentos</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-newsletter">
                Cadastrar
              </button>
            </form>
            <p className="newsletter-disclaimer">
              * Não enviamos spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
