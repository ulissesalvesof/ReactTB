import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get('/api/company/info');
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Erro ao carregar informações da empresa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1>Sobre Nós</h1>
        
        {companyInfo && (
          <div className="about-content">
            <div className="about-section">
              <h2>{companyInfo.name}</h2>
              <p>{companyInfo.description}</p>
            </div>
            
            <div className="about-section">
              <h3>Nossa Missão</h3>
              <p>{companyInfo.mission}</p>
            </div>
            
            <div className="about-section">
              <h3>Nossa Visão</h3>
              <p>{companyInfo.vision}</p>
            </div>
            
            <div className="about-section">
              <h3>Valores</h3>
              <ul>
                {companyInfo.values?.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
            
            <div className="about-section">
              <h3>Contato</h3>
              <p>Email: {companyInfo.contact?.email}</p>
              <p>Telefone: {companyInfo.contact?.phone}</p>
              <p>Endereço: {companyInfo.contact?.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
