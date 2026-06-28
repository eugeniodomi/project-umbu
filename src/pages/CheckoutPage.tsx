import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { processarPagamento } from '../infrastructure/api/paymentMockService';
import { logEvent } from '../utils/logger';
import { calcularPontos } from '../application/services/fidelizacaoService';

export const CheckoutPage: React.FC = () => {
  const { items, valorTotal, limparCarrinho } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Checkout</h2>
      
      <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #ced4da', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0 }}>Resumo do Pedido</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.produto.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #e9ecef', paddingBottom: '0.5rem' }}>
              <span>{item.quantidade}x {item.produto.nome}</span>
              <span>R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', marginTop: '1rem' }}>
          <span>Total:</span>
          <span style={{ color: '#198754' }}>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      {errorMessage && (
        <div style={{ backgroundColor: '#f8d7da', color: '#842029', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #f5c2c7' }}>
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
