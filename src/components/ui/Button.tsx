import { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled, 
  ...props 
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary': return '#6c757d';
      case 'danger': return '#dc3545';
      case 'primary':
      default: return '#0d6efd';
    }
  };

  return (
    <button 
      className={className}
      disabled={isLoading || disabled}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: (isLoading || disabled) ? 'not-allowed' : 'pointer',
        opacity: (isLoading || disabled) ? 0.65 : 1,
        backgroundColor: getBackgroundColor(),
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'opacity 0.2s'
      }}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
};
