import React from 'react';

const Button = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  isLoading = false,
  ariaLabel 
}) => {
  const baseStyle = {
    fontFamily: 'sans-serif',
    fontWeight: '600',
    borderRadius: '6px',
    border: 'none',
    cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer',
    opacity: (disabled || isLoading) ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
    outline: 'none'
  };

  const variants = {
    primary: { backgroundColor: '#0052cc', color: '#ffffff' },
    secondary: { backgroundColor: '#7a869a', color: '#ffffff' },
    danger: { backgroundColor: '#de350b', color: '#ffffff' }
  };

  const sizes = {
    small: { padding: '6px 12px', fontSize: '14px' },
    medium: { padding: '10px 20px', fontSize: '16px' },
    large: { padding: '14px 28px', fontSize: '18px' }
  };

  const finalStyle = { ...baseStyle, ...variants[variant], ...sizes[size] };

  return (
    <button 
      style={finalStyle} 
      onClick={!isLoading ? onClick : undefined} 
      disabled={disabled || isLoading}
      aria-label={ariaLabel || label}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>🔄</span>
      ) : null}
      {label}
    </button>
  );
};

export default Button;
