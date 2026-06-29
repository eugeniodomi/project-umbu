import { type ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ConsentBanner } from '../ui/ConsentBanner';
import { Button } from '../ui/Button';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { usuario, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      <header className="app-header">
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Raízes do Nordeste</h1>
        {usuario && (
          <div className="header-user">
            <span style={{ fontWeight: '500' }}>Olá, {usuario.nome}</span>
            <Button variant="secondary" onClick={logout}>Sair</Button>
          </div>
        )}
      </header>
      
      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {children}
      </main>

      <ConsentBanner />
    </div>
  );
};
