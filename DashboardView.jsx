import React, { useState } from 'react';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import FormContainer from '../components/common/FormContainer';

const DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [registeredNodes, setRegisteredNodes] = useState([]);

  const handleFormSubmission = () => {
    if (!inputValue.trim()) {
      setInputError('Component text target label cannot be empty.');
      return;
    }
    setInputError('');
    setRegisteredNodes(prev => [...prev, inputValue]);
    setInputValue('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Button label="Initialize Node Core" variant="primary" size="large" onClick={() => setIsModalOpen(true)} />
      </div>

      <div>
        <h3>⚡ Running UI System Registries ({registeredNodes.length})</h3>
        {registeredNodes.map((node, index) => (
          <Card key={index} title={`Operational Component Primitive`} subtitle={`Matrix Index: 0x0${index}`} footerActions={
            <Button label="Purge Node" variant="danger" size="small" onClick={() => setRegisteredNodes(prev => prev.filter((_, i) => i !== index))} />
          }>
            <p>Allocated Dynamic Content: <strong>{node}</strong></p>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Configure Dynamic Library Primitives">
        <FormContainer onSubmit={handleFormSubmission} title="Allocation Framework">
          <InputField label="Target Component Label Text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="e.g., Primary Action Call" error={inputError} required />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button label="Cancel" variant="secondary" onClick={() => setIsModalOpen(false)} />
            <Button label="Save Changes" variant="primary" type="submit" />
          </div>
        </FormContainer>
      </Modal>
    </div>
  );
};

export default DashboardView;
