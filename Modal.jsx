import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(9, 30, 66, 0.54)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        fontFamily: 'sans-serif',
        overflow: 'hidden'
      }}>
        <header style={{ padding: '16px 20px', borderBottom: '1px solid #f4f5f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="modal-title" style={{ margin: 0, fontSize: '18px', color: '#172b4d' }}>{title}</h2>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#7a869a' }}>&times;</button>
        </header>
        <div style={{ padding: '20px', color: '#42526e' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
