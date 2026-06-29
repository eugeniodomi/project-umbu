import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import franquiasData from '../infrastructure/mock/franquias.json';

export const FranquiaSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const getStatusDisplay = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativa':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
            🟢 Aberta (Operação Normal)
          </span>
        );
      case 'reduzida':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#fef9c3', color: '#854d0e', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
            🟡 Operação Limitada (Alguns serviços indisponíveis)
          </span>
        );
      default:
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#e5e7eb', color: '#374151', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'capitalize' }}>
            {status}
          </span>
        );
    }
  };

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
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{franquia.nome}</h3>
            <div style={{ marginBottom: '1rem' }}>
              {getStatusDisplay(franquia.status)}
            </div>
            <p style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ marginRight: '0.5rem' }}>Atendimento:</span>
              {franquia.canais.map(canal => {
                const canalMap: Record<string, string> = {
                  APP: '📱 App',
                  TOTEM: '🏪 Totem',
                  PICKUP: '🛍️ Retirada'
                };
                const label = canalMap[canal] || canal;
                return (
                  <span key={canal} style={{
                    display: 'inline-block',
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    marginRight: '0.4rem',
                    marginBottom: '0.2rem',
                    marginTop: '0.2rem',
                    fontWeight: 500
                  }}>
                    {label}
                  </span>
                );
              })}
            </p>
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
