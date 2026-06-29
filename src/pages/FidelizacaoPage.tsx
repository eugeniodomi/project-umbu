import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const FidelizacaoPage: React.FC = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const novosPontos = location.state?.novosPontos || 0;
  const saldoTotal = (usuario?.saldoPontosFidelidade || 0) + novosPontos;

  return (
    <div className="page-container fade-in" style={{ maxWidth: '600px', textAlign: 'center', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="card" style={{ padding: '3rem 2rem' }}>
        <h2 style={{ color: '#166534', marginBottom: '1.5rem' }}>Pagamento Confirmado!</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          Obrigado pelo seu pedido, <strong style={{ color: 'var(--color-primary)' }}>{usuario?.nome || 'Cliente'}</strong>.
        </p>
        
        <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1.5rem', borderRadius: 'var(--border-radius)', margin: '2rem 0', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Seu Saldo de Fidelidade</h3>
          {novosPontos > 0 && (
            <p style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
              +{novosPontos} pontos ganhos nesta compra
            </p>
          )}
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary)', margin: 0 }}>
            {saldoTotal} pontos
          </p>
        </div>

        <Button variant="primary" onClick={() => navigate('/franquias')} style={{ padding: '0.75rem 2rem', margin: '0 auto' }}>
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};
