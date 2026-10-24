import React, { useId } from 'react';

const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false 
}) => {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;

  return (
    <div style={{ marginBottom: '16px', textAlign: 'left', fontFamily: 'sans-serif' }}>
      <label 
        htmlFor={generatedId} 
        style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#172b4d' }}
      >
        {label} {required && <span style={{ color: '#de350b' }}>*</span>}
      </label>
      <input
        id={generatedId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '15px',
          borderRadius: '4px',
          border: `1px solid ${error ? '#de350b' : '#c1c7d0'}`,
          outline: 'none',
          boxSizing: 'border-box'
        }}
      />
      {error && (
        <span id={errorId} style={{ color: '#de350b', fontSize: '13px', marginTop: '4px', display: 'block' }}>
          ⚠️ {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
