import React, { useState, useEffect } from 'react';
import { logEvent } from '../../utils/logger';
import { Button } from './Button';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    essenciais: true,
    analiticos: false,
    marketing: false
  });

  useEffect(() => {
    if (isOpen) {
      const savedPrefs = localStorage.getItem('lgpd_preferences');
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs);
          setPreferences({
            essenciais: true, // Always true
            analiticos: !!parsed.analiticos,
            marketing: !!parsed.marketing
          });
        } catch (e) {
          console.error("Error parsing LGPD preferences", e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('lgpd_preferences', JSON.stringify(preferences));
    logEvent('LGPD_PREFERENCES_SAVED', preferences);
    if (onSave) onSave();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }}>
      <div className="card fade-in" style={{ 
        maxWidth: '500px', 
        width: '100%', 
        backgroundColor: '#fff', 
        borderRadius: 'var(--border-radius)',
        padding: '2rem',
        boxShadow: 'var(--box-shadow)'
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>Preferências de Cookies</h2>
        <p style={{ color: 'var(--color-text-main)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Gerencie suas preferências de consentimento de cookies. Você pode alterar essas configurações a qualquer momento.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'not-allowed', opacity: 0.8 }}>
            <input 
              type="checkbox" 
              checked={preferences.essenciais} 
              disabled 
              style={{ marginTop: '0.25rem', width: '1.2rem', height: '1.2rem' }}
            />
            <div>
              <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>Cookies Estritamente Necessários</strong>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Sempre ativos. Necessários para o funcionamento básico do site.</span>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={preferences.analiticos}
              onChange={(e) => setPreferences({ ...preferences, analiticos: e.target.checked })}
              style={{ marginTop: '0.25rem', width: '1.2rem', height: '1.2rem' }}
            />
            <div>
              <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>Cookies de Desempenho e Analíticos</strong>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Ajudam a entender como os visitantes interagem com o site, coletando estatísticas.</span>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={preferences.marketing}
              onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              style={{ marginTop: '0.25rem', width: '1.2rem', height: '1.2rem' }}
            />
            <div>
              <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>Cookies de Marketing e Publicidade</strong>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Usados para rastrear visitantes em sites para exibir anúncios relevantes.</span>
            </div>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Salvar Preferências</Button>
        </div>
      </div>
    </div>
  );
};
