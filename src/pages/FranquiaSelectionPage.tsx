import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import franquiasData from '../infrastructure/mock/franquias.json';

export const FranquiaSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    // In a real app, you might save this to a context or localStorage
    console.log(`Franquia selecionada: ${id}`);
    navigate('/cardapio');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Selecione uma Franquia</h2>
      </div>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {franquiasData.map((franquia) => (
          <div key={franquia.id} style={{ 
            border: '1px solid #ced4da', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0 }}>{franquia.nome}</h3>
            <p>Status: <strong>{franquia.status}</strong></p>
            <p>Canais: {franquia.canais.join(', ')}</p>
            <Button 
              onClick={() => handleSelect(franquia.id)}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              Selecionar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
