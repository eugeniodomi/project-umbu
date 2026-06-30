import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Failed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)' }}>
      <h2 style={{ color: '#DC2626', marginBottom: '1rem' }}>Acesso Negado</h2>
      <p style={{ marginBottom: '2rem' }}>Você precisa estar autenticado para acessar esta página.</p>
      <Button onClick={() => navigate('/', { replace: true })}>Ir para Login</Button>
    </div>
  );
};

export default Failed;
