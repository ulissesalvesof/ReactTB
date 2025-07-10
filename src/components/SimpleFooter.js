import React from 'react';
import './SimpleFooter.css';

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="simple-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>� MAN Nutrition</h3>
            <p>Há mais de 10 anos oferecendo os melhores suplementos para potencializar seus resultados e transformar sua vida através da nutrição esportiva.</p>
          </div>
          
          <div className="footer-section">
            <h4>Navegação</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Suplementos</a></li>
              <li><a href="/about">Sobre Nós</a></li>
              <li><a href="/contact">Contato</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Categorias</h4>
            <ul>
              <li><a href="/products?category=proteinas">Proteínas</a></li>
              <li><a href="/products?category=performance">Performance</a></li>
              <li><a href="/products?category=vitaminas">Vitaminas</a></li>
              <li><a href="/products?category=emagrecimento">Emagrecimento</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Atendimento</h4>
            <p>📧 contato@mannutrition.com.br</p>
            <p>📱 (85) 3354-5573</p>
            <p>📍 Canindé, CE</p>
            <div className="business-hours">
              <strong>Horário de Atendimento:</strong>
              <p>Seg-Qui: 7h às 18h</p>
              <p>Sex: 7h às 17h</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} MAN Nutrition. Todos os direitos reservados.</p>
          <p className="footer-disclaimer">
            Os produtos vendidos não se destinam a diagnosticar, tratar, curar ou prevenir qualquer doença. 
            Consulte sempre um médico antes de usar qualquer suplemento.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
