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
        className={`input ${error ? 'error' : ''}`}
        {...props} 
      />
      {error && <span style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</span>}
    </div>
  );
};
