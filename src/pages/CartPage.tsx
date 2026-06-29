import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export const CartPage: React.FC = () => {
  const { items, removerDoCarrinho, valorTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="page-container fade-in" style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2 style={{ color: 'var(--color-primary)' }}>Seu carrinho está vazio</h2>
        <Button onClick={() => navigate('/cardapio')} style={{ marginTop: '1rem' }}>
          Voltar ao Cardápio
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Seu Carrinho</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {items.map((item) => (
          <div key={item.produto.id} className="card" style={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1.5rem'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>{item.produto.nome}</h4>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                {item.quantidade}x R$ {item.produto.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}
              </span>
              <Button variant="danger" onClick={() => removerDoCarrinho(item.produto.id)}>
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem'
      }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--color-text-main)' }}>Total:</h3>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
            R$ {valorTotal.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <Button onClick={handleCheckout} style={{ padding: '0.75rem 2rem' }}>
          Ir para Pagamento
        </Button>
      </div>
    </div>
  );
};

