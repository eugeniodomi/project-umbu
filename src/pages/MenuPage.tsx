import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import produtosData from '../infrastructure/mock/produtos.json';
import { type Produto } from '../domain/models/Produto';

export const MenuPage: React.FC = () => {
  const { adicionarAoCarrinho } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button onClick={() => navigate('/franquias')} variant="secondary">
            Alterar Unidade / Voltar
          </Button>
          <h2 style={{ margin: 0 }}>Cardápio</h2>
        </div>
        <Button onClick={() => navigate('/carrinho')} variant="secondary">
          Ver Carrinho
        </Button>
      </div>
      
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {produtosData.map((produto) => (
          <div key={produto.id} style={{ 
            border: '1px solid #ced4da', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{produto.nome}</h3>
              {produto.promocao && (
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#ffc107',
                  color: '#000',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {produto.promocao}
                </span>
              )}
              <p style={{ color: '#6c757d', marginBottom: '1rem' }}>{produto.descricao}</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#198754' }}>
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            <Button 
              onClick={() => adicionarAoCarrinho(produto as Produto)}
              disabled={!produto.disponivel}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              {produto.disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
