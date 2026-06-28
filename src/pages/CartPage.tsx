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
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2>Seu carrinho está vazio</h2>
        <Button onClick={() => navigate('/cardapio')} style={{ marginTop: '1rem' }}>
          Voltar ao Cardápio
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Seu Carrinho</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {items.map((item) => (
          <div key={item.produto.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#fff',
            border: '1px solid #ced4da',
            borderRadius: '0.5rem'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.produto.nome}</h4>
              <p style={{ margin: 0, color: '#6c757d' }}>
                {item.quantidade}x R$ {item.produto.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>
                R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}
              </span>
              <Button variant="danger" onClick={() => removerDoCarrinho(item.produto.id)}>
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#fff', 
        border: '1px solid #ced4da', 
        borderRadius: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: 0 }}>Total:</h3>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#198754' }}>
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
