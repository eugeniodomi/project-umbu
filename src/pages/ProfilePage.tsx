import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import perfilMock from '../infrastructure/mock/perfil.json';
import { CookiePreferencesModal } from '../components/ui/CookiePreferencesModal';

export const ProfilePage: React.FC = () => {
  const [endereco, setEndereco] = useState(perfilMock.enderecoPadrao);
  const [mensagem, setMensagem] = useState('');
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Perfil atualizado localmente com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <div className="page-container fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--color-primary)', margin: 0 }}>Meu Perfil</h2>
        <Button variant="secondary" onClick={() => navigate('/franquias')} style={{ padding: '0.4rem 0.8rem' }}>
          Voltar ao Menu Inicial
        </Button>
      </div>
      
      {mensagem && (
        <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: 'var(--border-radius)', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSave} className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-text-main)' }}>Endereço Padrão</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Rua</label>
          <input 
            type="text" 
            value={endereco.rua}
            onChange={(e) => setEndereco({...endereco, rua: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Número</label>
            <input 
              type="text" 
              value={endereco.numero}
              onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Bairro</label>
            <input 
              type="text" 
              value={endereco.bairro}
              onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>CEP</label>
          <input 
            type="text" 
            value={endereco.cep}
            onChange={(e) => setEndereco({...endereco, cep: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
          />
        </div>

        <Button type="submit" style={{ width: '100%' }}>Salvar Endereço</Button>
      </form>

      <div className="card">
        <h3 style={{ marginTop: 0, color: 'var(--color-text-main)' }}>Métodos de Pagamento</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {perfilMock.metodosPagamento.map((metodo) => (
            <li key={metodo.id} style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
              <span style={{ marginRight: '0.75rem', fontSize: '1.25rem' }}>💳</span> 
              <span style={{ fontWeight: 500 }}>{metodo.nome}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-text-main)' }}>Privacidade e Proteção de Dados (LGPD)</h3>
        <p style={{ color: 'var(--color-text-main)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Você pode revisar e atualizar suas preferências de consentimento de cookies e tratamento de dados pessoais a qualquer momento, de acordo com a LGPD.
        </p>
        <Button variant="secondary" onClick={() => setIsCookieModalOpen(true)}>
          Gerenciar Preferências de Cookies
        </Button>
      </div>

      <CookiePreferencesModal 
        isOpen={isCookieModalOpen} 
        onClose={() => setIsCookieModalOpen(false)} 
      />
    </div>
  );
};
