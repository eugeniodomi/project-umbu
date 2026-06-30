import { useEffect } from 'react';

type Props = {
  onAccept?: () => void;
};

// Mantemos como export const / function com o nome original para não quebrar PageWrapper.tsx
export const ConsentBanner = ({ onAccept }: Props) => {
  useEffect(() => {
    // expõe função para testes (window) — limpa após uso
    (window as any).__rg_banner = {
      close: () => {
        const el = document.getElementById('rgpd-banner');
        if (el) el.setAttribute('data-visible','false');
      },
    };
    return () => { delete (window as any).__rg_banner; };
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd_preferences', JSON.stringify({ accepted: true, ts: Date.now() }));
    // sinal para observabilidade e para Cypress esperar
    window.dispatchEvent(new CustomEvent('LGPD_ACCEPTED'));
    if (onAccept) onAccept();
    const el = document.getElementById('rgpd-banner');
    if (el) el.setAttribute('data-visible','false');
  };

  const handleClose = () => {
    const el = document.getElementById('rgpd-banner');
    if (el) el.setAttribute('data-visible','false');
  };

  return (
    <div
      id="rgpd-banner"
      role="dialog"
      aria-live="polite"
      aria-modal="false"
      data-visible="true"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
    >
      <div style={{
        maxWidth: 520,
        width: 'calc(100% - 24px)',
        margin: '12px',
        borderRadius: 12,
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        background: 'white',
        padding: '16px',
        position: 'relative',
        touchAction: 'manipulation',
      }}>
        <button
          aria-label="Fechar aviso de privacidade"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'transparent',
            border: 'none',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >✕</button>

        <p style={{ margin: 0, color: '#0F172A', lineHeight: 1.4 }}>
          Como cuidamos dos seus dados: utilizamos cookies para personalizar anúncios e melhorar sua experiência.
        </p>

        <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleAccept} style={{ background:'#D97706', color:'#fff', border:'none', padding:'10px 16px', borderRadius:8, cursor:'pointer' }} >
            Aceitar Todos
          </button>
          <button onClick={handleClose} style={{ background:'#F59E0B', color:'#fff', border:'none', padding:'10px 16px', borderRadius:8, cursor:'pointer' }} >
            Rejeitar Não Essenciais
          </button>
          <button onClick={() => { /* open modal preferences */ }} style={{ background:'#F97316', color:'#fff', border:'none', padding:'10px 16px', borderRadius:8, cursor:'pointer' }} >
            Gerenciar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}
