import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FaShoppingCart } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const { products, dispatch } = useApp();
  const [email, setEmail] = useState('');

  // Pegar apenas os primeiros 3 produtos para exibir como "em destaque"
  const featuredProducts = products.slice(0, 3);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Obrigado por se inscrever na nossa newsletter!');
    setEmail('');
  };

  const goals = [
    {
      id: 1,
      title: 'Eletrônicos',
      icon: '�',
      description: 'Smartphones, tablets e mais',
      category: 'Eletrônicos'
    },
    {
      id: 2,
      title: 'Computadores',
      icon: '�',
      description: 'Notebooks, desktops e componentes',
      category: 'Computadores'
    },
    {
      id: 3,
      title: 'Acessórios',
      icon: '🎧',
      description: 'Fones, capas e acessórios',
      category: 'Acessórios'
    },
    {
      id: 4,
      title: 'Casa',
      icon: '�',
      description: 'Decoração e utilidades domésticas',
      category: 'Casa'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>MAN Store</h1>
            <p>Sua loja online com os melhores produtos e tecnologia</p>
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
      <section className="stats-section">
        <div className="container">
          <h2>Números que impressionam</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{products.length}+</h3>
              <p>Produtos Disponíveis</p>
            </div>
            <div className="stat-item">
              <h3>5+</h3>
              <p>Categorias</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Clientes Satisfeitos</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Pedidos Entregues</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qual sua categoria */}
      <section className="goals-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore nossas categorias</h2>
            <p>Encontre os produtos ideais para você</p>
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
            <p>Os melhores produtos da nossa loja</p>
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
                  <button 
                    className="btn btn-cart"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart /> Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/products" className="btn btn-primary">Ver Todos os Produtos</Link>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="features-section">
        <div className="container">
          <h2>Por que escolher a MAN Store?</h2>
          
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
              <p>Tire suas dúvidas com nossos especialistas</p>
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
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
