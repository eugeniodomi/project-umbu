import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { auth } from '../services/auth';
import usuariosMock from '../infrastructure/mock/usuarios.json';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showTips, setShowTips] = useState(() => {
    return localStorage.getItem('show_login_tips') === 'true';
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleToggleTips = () => {
    const newVal = !showTips;
    setShowTips(newVal);
    localStorage.setItem('show_login_tips', String(newVal));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      login(email, senha);
      const token = 'mock-token-' + Date.now();
      auth.login(token);
      navigate('/franquias', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login');
    }
  };

  return (
    <div className="page-container fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 150px)', padding: '2rem 1rem' }}>
      
      {/* Help Panel */}
      <div style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div 
          onClick={handleToggleTips}
          style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'var(--color-primary)', color: 'white' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
            <span role="img" aria-label="help">ℹ️</span> Dicas de Acesso
          </span>
          <span style={{ fontSize: '0.875rem' }}>{showTips ? 'Ocultar dicas' : 'Mostrar dicas'}</span>
        </div>
        
        {showTips && (
          <div style={{ padding: '1rem', border: '1px solid var(--color-primary-light)', borderTop: 'none', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>
              Dados mockados apenas para validação e testes do sistema.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {usuariosMock.map(u => (
                <div key={u.id} style={{ background: 'var(--color-background)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{u.nome}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{u.email}</span>
                    <button 
                      onClick={() => handleCopy(u.email)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: '0.2rem' }}
                      title="Copiar email"
                    >
                      📋
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{u.senha}</span>
                    <button 
                      onClick={() => handleCopy(u.senha)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: '0.2rem' }}
                      title="Copiar senha"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Login Form */}
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            label="Senha" 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
          {error && <div style={{ color: '#DC2626', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <Button type="submit" style={{ marginTop: '1rem' }}>Entrar</Button>
        </form>
      </div>
    </div>
  );
};

