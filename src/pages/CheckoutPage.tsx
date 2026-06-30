import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { processarPagamento } from '../infrastructure/api/paymentMockService';
import { logEvent } from '../utils/logger';
import { calcularPontos } from '../application/services/fidelizacaoService';
import perfilMock from '../infrastructure/mock/perfil.json';

export const CheckoutPage: React.FC = () => {
  const { items, valorTotal, limparCarrinho } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [enderecoEntrega, setEnderecoEntrega] = useState(perfilMock.enderecoPadrao);
  const [metodoPagamento, setMetodoPagamento] = useState(perfilMock.metodosPagamento[0].id);

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

  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');
    
    logEvent('ORDER_CREATED');

    try {
      const pedidoIdMock = 'PED-' + Math.floor(Math.random() * 100000);
      const status = await processarPagamento(pedidoIdMock, valorTotal);
      
      if (status === 'APPROVED') {
        logEvent('PAYMENT_SUCCESS');
        limparCarrinho();
        
        const pontosGanhos = calcularPontos(valorTotal);
        
        navigate('/fidelizacao', { state: { novosPontos: pontosGanhos } });
      } else {
        logEvent('PAYMENT_FAILURE');
        setErrorMessage('Pagamento recusado. Tente novamente.');
      }
    } catch (error) {
      logEvent('PAYMENT_FAILURE');
      setErrorMessage('Pagamento recusado. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-container fade-in" style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Checkout</h2>
      
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-text-main)' }}>Endereço de Entrega</h3>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '3fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Rua</label>
            <input 
              type="text" 
              value={enderecoEntrega.rua}
              onChange={(e) => setEnderecoEntrega({...enderecoEntrega, rua: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Número</label>
            <input 
              type="text" 
              value={enderecoEntrega.numero}
              onChange={(e) => setEnderecoEntrega({...enderecoEntrega, numero: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '2fr 1fr', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Bairro</label>
            <input 
              type="text" 
              value={enderecoEntrega.bairro}
              onChange={(e) => setEnderecoEntrega({...enderecoEntrega, bairro: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>CEP</label>
            <input 
              type="text" 
              value={enderecoEntrega.cep}
              onChange={(e) => setEnderecoEntrega({...enderecoEntrega, cep: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-text-main)' }}>Forma de Pagamento</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {perfilMock.metodosPagamento.map(metodo => (
            <label key={metodo.id} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer', backgroundColor: metodoPagamento === metodo.id ? '#F0FDF4' : '#FFF', borderColor: metodoPagamento === metodo.id ? '#166534' : '#E5E7EB' }}>
              <input 
                type="radio" 
                name="pagamento" 
                value={metodo.id} 
                checked={metodoPagamento === metodo.id}
                onChange={() => setMetodoPagamento(metodo.id)}
                style={{ marginRight: '0.75rem' }}
              />
              <span style={{ fontWeight: 500 }}>{metodo.nome}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-text-main)' }}>Resumo do Pedido</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.produto.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
              <span>{item.quantidade}x {item.produto.nome}</span>
              <span>R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', marginTop: '1rem' }}>
          <span>Total:</span>
          <span style={{ color: '#166534' }}>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      {errorMessage && (
        <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '1rem', borderRadius: 'var(--border-radius)', marginBottom: '1rem', border: '1px solid #FCA5A5' }}>
          {errorMessage}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="secondary" onClick={() => navigate('/carrinho')} disabled={isProcessing}>
          Voltar para o Carrinho
        </Button>
        <Button variant="primary" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? 'Processando...' : 'Confirmar e Pagar'}
        </Button>
      </div>
    </div>
  );
};
