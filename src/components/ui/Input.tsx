import { type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }} className={className}>
      {label && <label style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>{label}</label>}
      <input 
        style={{
          padding: '0.5rem',
          borderRadius: '0.25rem',
          border: `1px solid ${error ? '#dc3545' : '#ced4da'}`,
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        {...props} 
      />
      {error && <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</span>}
    </div>
  );
};
