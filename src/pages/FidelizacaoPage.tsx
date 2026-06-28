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
    <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '0.5rem', border: '1px solid #ced4da' }}>
      <h2 style={{ color: '#198754', marginBottom: '1.5rem' }}>Pagamento Confirmado!</h2>
      <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        Obrigado pelo seu pedido, <strong>{usuario?.nome || 'Cliente'}</strong>.
      </p>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem', margin: '2rem 0' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Seu Saldo de Fidelidade</h3>
        {novosPontos > 0 && (
          <p style={{ color: '#0d6efd', margin: '0 0 0.5rem 0' }}>
            +{novosPontos} pontos ganhos nesta compra
          </p>
        )}
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107', margin: 0 }}>
          {saldoTotal} pontos
        </p>
      </div>

      <Button variant="primary" onClick={() => navigate('/franquias')} style={{ padding: '0.75rem 2rem' }}>
        Voltar ao Início
      </Button>
    </div>
  );
};
