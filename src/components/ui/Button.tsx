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
  style,
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = variant === 'secondary' ? 'btn-secondary' : variant === 'danger' ? 'btn-danger' : 'btn-primary';
  const combinedClassName = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <button 
      className={combinedClassName}
      disabled={isLoading || disabled}
      style={style}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
};
