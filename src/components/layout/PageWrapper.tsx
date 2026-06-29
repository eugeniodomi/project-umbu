import { type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ConsentBanner } from '../ui/ConsentBanner';
import { Button } from '../ui/Button';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  const handleLogout = () => {
    setIsLoggingOff(true); // Ativa o aviso visual de logoff
    
    // Aguarda 1.5s para exibir o feedback visual antes de limpar o estado e redirecionar
    setTimeout(() => {
      logout();
      navigate('/', { replace: true });
      setIsLoggingOff(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      <header className="app-header">
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Raízes do Nordeste</h1>
        {usuario && (
          <div className="header-user">
            <span style={{ fontWeight: '500' }}>Olá, {usuario.nome}</span>
            <Button variant="secondary" onClick={handleLogout}>Sair</Button>
          </div>
        )}
      </header>
      
      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {children}
      </main>

      <ConsentBanner />

      {isLoggingOff && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Desconectando... Até logo!
        </div>
      )}
    </div>
  );
};
