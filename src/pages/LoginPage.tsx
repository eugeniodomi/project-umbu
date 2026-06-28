import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      login(email, senha);
      navigate('/franquias');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
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
        {error && <div style={{ color: '#dc3545', marginBottom: '1rem' }}>{error}</div>}
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};
