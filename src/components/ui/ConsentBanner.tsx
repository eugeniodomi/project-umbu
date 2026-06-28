import React, { useState, useEffect } from 'react';
import { logEvent } from '../../utils/logger';
import { Button } from './Button';

export const ConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('lgpd_consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd_consent', 'true');
    logEvent('LGPD_CONSENT_GIVEN');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f8f9fa',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      borderTop: '1px solid #dee2e6'
    }}>
      <p style={{ margin: 0, paddingRight: '1rem', color: '#212529' }}>
        Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política de privacidade.
      </p>
      <Button variant="primary" onClick={handleAccept}>
        Aceitar
      </Button>
    </div>
  );
};
