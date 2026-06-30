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
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Selecione uma Franquia</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
          Tradição e sabor da nossa terra entregues com qualidade e rapidez para você. Escolha a unidade mais próxima!
        </p>
      </div>
      <div className="responsive-grid">
        {franquiasData.map((franquia) => (
          <div key={franquia.id} className="card clickable">
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{franquia.nome}</h3>
            
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {getStatusDisplay(franquia.status)}
              
              {franquia.tempoEntrega && (
                <span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#F3F4F6', color: '#4B5563', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
                  ⏱️ {franquia.tempoEntrega}
                </span>
              )}
            </div>

            <p style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ marginRight: '0.5rem', fontWeight: 500 }}>Atendimento:</span>
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
                    backgroundColor: 'var(--color-bg-main)',
                    border: '1px solid #E5E7EB',
                    color: 'var(--color-text-main)',
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
            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Button 
                onClick={() => handleSelect(franquia.id)}
                style={{ width: '100%' }}
              >
                Selecionar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
