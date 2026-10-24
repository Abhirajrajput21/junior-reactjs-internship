import React from 'react';

const FormContainer = ({ onSubmit, children, title }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} noValidate style={{ width: '100%', boxSizing: 'border-box' }}>
      {title && <h2 style={{ color: '#172b4d', marginBottom: '20px', fontFamily: 'sans-serif' }}>{title}</h2>}
      {children}
    </form>
  );
};

export default FormContainer;
