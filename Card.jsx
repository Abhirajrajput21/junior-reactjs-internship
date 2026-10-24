import React from 'react';

const Card = ({ title, subtitle, children, footerActions }) => {
  return (
    <article style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e1e4e8',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      padding: '24px',
      margin: '16px 0',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      {title && <h3 style={{ margin: '0 0 4px 0', color: '#172b4d', fontSize: '20px' }}>{title}</h3>}
      {subtitle && <h4 style={{ margin: '0 0 16px 0', color: '#7a869a', fontWeight: '400', fontSize: '14px' }}>{subtitle}</h4>}
      <section style={{ color: '#42526e', fontSize: '15px', lineHeight: '1.5' }}>
        {children}
      </section>
      {footerActions && (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px', borderTop: '1px solid #f4f5f7', paddingTop: '16px' }}>
          {footerActions}
        </div>
      )}
    </article>
  );
};

export default Card;
