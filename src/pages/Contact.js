import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    // Carregar informações de contato
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('/api/contact/info');
        setContactInfo(response.data);
      } catch (error) {
        console.error('Erro ao carregar informações de contato:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post('/api/contact', formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1>Contato</h1>
        
        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Envie sua mensagem</h2>
            
            {submitStatus === 'success' && (
              <div className="alert alert-success">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="alert alert-error">
                Erro ao enviar mensagem. Tente novamente.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Assunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
          
          {contactInfo && (
            <div className="contact-info-section">
              <h2>Informações de Contato</h2>
              
              <div className="contact-item">
                <h3>📍 Endereço</h3>
                <p>{contactInfo.address}</p>
              </div>
              
              <div className="contact-item">
                <h3>📞 Telefone</h3>
                <p>{contactInfo.phone}</p>
              </div>
              
              <div className="contact-item">
                <h3>✉️ Email</h3>
                <p>{contactInfo.email}</p>
              </div>
              
              <div className="contact-item">
                <h3>🕐 Horário de Funcionamento</h3>
                <ul>
                  {contactInfo.hours?.map((hour, index) => (
                    <li key={index}>{hour}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
