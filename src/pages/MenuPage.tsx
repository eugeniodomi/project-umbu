import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import produtosData from '../infrastructure/mock/produtos.json';
import { type Produto } from '../domain/models/Produto';

export const MenuPage: React.FC = () => {
  const { adicionarAoCarrinho, items } = useCart();
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (produto: Produto) => {
    adicionarAoCarrinho(produto);
    setAddedItems(prev => ({ ...prev, [produto.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [produto.id]: false }));
    }, 800);
  };

  const quantidadeTotal = items.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="page-container fade-in">
      <div className="menu-header">
        <div className="menu-actions">
          <Button onClick={() => navigate('/franquias')} variant="secondary">
            Alterar Unidade / Voltar
          </Button>
          <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Cardápio</h2>
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button onClick={() => navigate('/carrinho')} variant="secondary">
            Ver Carrinho
          </Button>
          {quantidadeTotal > 0 && (
            <span className="cart-badge" key={quantidadeTotal}>
              {quantidadeTotal}
            </span>
          )}
        </div>
      </div>
      
      <div className="responsive-grid">
        {produtosData.map((produto) => (
          <div key={produto.id} className="card clickable">
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{produto.nome}</h3>
              {produto.promocao && (
                <span style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-secondary)',
                  color: '#FFF',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {produto.promocao}
                </span>
              )}
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>{produto.descricao}</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#166534' }}>
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              <Button 
                onClick={() => handleAddToCart(produto as Produto)}
                disabled={!produto.disponivel}
                style={{ 
                  width: '100%',
                  ...(addedItems[produto.id] ? { backgroundColor: '#10B981', color: '#FFF' } : {})
                }}
              >
                {addedItems[produto.id] ? '✅ Adicionado!' : (produto.disponivel ? 'Adicionar ao Carrinho' : 'Indisponível')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
