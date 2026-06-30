import React, { useState, useEffect } from 'react';
import { logEvent } from '../../utils/logger';
import { Button } from './Button';
import { CookiePreferencesModal } from './CookiePreferencesModal';

export const ConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasPreferences = localStorage.getItem('lgpd_preferences');
    if (!hasPreferences) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs = { essenciais: true, analiticos: true, marketing: true };
    localStorage.setItem('lgpd_preferences', JSON.stringify(prefs));
    logEvent('LGPD_PREFERENCES_SAVED', prefs);
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const prefs = { essenciais: true, analiticos: false, marketing: false };
    localStorage.setItem('lgpd_preferences', JSON.stringify(prefs));
    logEvent('LGPD_PREFERENCES_SAVED', prefs);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fade-in" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: 1000,
        borderTop: '1px solid #e5e7eb',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            <strong>Como cuidamos dos seus dados:</strong> Utilizamos cookies para personalizar anúncios, gerar estatísticas de tráfego e melhorar sua experiência no site. Você pode escolher quais categorias deseja permitir clicando em 'Gerenciar preferências'.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={handleAcceptAll}>
              Aceitar Todos
            </Button>
            <Button variant="secondary" onClick={handleRejectNonEssential}>
              Rejeitar Não Essenciais
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              Gerenciar Preferências
            </Button>
          </div>
        </div>
      </div>
      
      <CookiePreferencesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={() => setIsVisible(false)} 
      />
    </>
  );
};
