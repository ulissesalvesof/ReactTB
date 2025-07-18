import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import './ProductManager.css';

const ProductManager = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useApp();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    let result;
    
    if (editingProduct) {
      // Atualizar produto existente
      result = await updateProduct(editingProduct.id, {
        ...data,
        price: parseFloat(data.price),
        inStock: true
      });
    } else {
      // Adicionar novo produto
      result = await addProduct({
        ...data,
        price: parseFloat(data.price),
        inStock: true
      });
    }

    if (result.success) {
      reset();
      setShowForm(false);
      setEditingProduct(null);
      alert(editingProduct ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!');
    } else {
      alert('Erro: ' + result.error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setValue('name', product.name);
    setValue('category', product.category);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('description', product.description);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const result = await deleteProduct(id);
      if (result.success) {
        alert('Produto excluído com sucesso!');
      } else {
        alert('Erro ao excluir produto: ' + result.error);
      }
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
    reset();
  };

  return (
    <div className="product-manager">
      <div className="manager-header">
        <h2>Gerenciar Produtos</h2>
        <button 
          className="btn-add"
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> Adicionar Produto
        </button>
      </div>

      {showForm && (
        <div className="product-form-overlay">
          <div className="product-form">
            <div className="form-header">
              <h3>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button className="btn-close" onClick={handleCancel}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Nome do Produto</label>
                <input
                  {...register('name', { required: 'Nome é obrigatório' })}
                  type="text"
                  placeholder="Digite o nome do produto"
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select {...register('category', { required: 'Categoria é obrigatória' })}>
                  <option value="">Selecione uma categoria</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Computadores">Computadores</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Casa">Casa</option>
                  <option value="Roupas">Roupas</option>
                </select>
                {errors.category && <span className="error">{errors.category.message}</span>}
              </div>

              <div className="form-group">
                <label>Preço</label>
                <input
                  {...register('price', { 
                    required: 'Preço é obrigatório',
                    min: { value: 0.01, message: 'Preço deve ser maior que 0' }
                  })}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
                {errors.price && <span className="error">{errors.price.message}</span>}
              </div>

              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  {...register('image', { required: 'URL da imagem é obrigatória' })}
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {errors.image && <span className="error">{errors.image.message}</span>}
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  {...register('description', { required: 'Descrição é obrigatória' })}
                  placeholder="Descreva o produto..."
                  rows="3"
                />
                {errors.description && <span className="error">{errors.description.message}</span>}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  <FaTimes /> Cancelar
                </button>
                <button type="submit" className="btn-save">
                  <FaSave /> {editingProduct ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-thumb"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td>
                  <span className={`status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                    {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
