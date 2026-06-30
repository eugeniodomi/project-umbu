import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { auth } from '../services/auth';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login, usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario || auth.isAuthenticated()) {
      navigate('/franquias', { replace: true });
    }
  }, [usuario, navigate]);

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
    <div className="page-container fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)' }}>
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
