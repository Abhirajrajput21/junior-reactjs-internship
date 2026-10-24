import React, { useState, useEffect } from 'react';
import { fetchServerDataRegistry } from '../services/apiService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const DashboardView = () => {
  const [nodes, setNodes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineError, setPipelineError] = useState(null);

  // Core asynchronous orchestration utility
  const synchroniseRemoteCluster = async () => {
    setIsProcessing(true);
    setPipelineError(null);
    try {
      const distributedDataset = await fetchServerDataRegistry();
      setNodes(distributedDataset);
    } catch (error) {
      setPipelineError(error.message || 'Fatal data stream pipeline collapse occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Trigger server queries automatically during initial layout mount
  useEffect(() => {
    synchroniseRemoteCluster();
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Button 
          label={isProcessing ? 'Interrogating Cluster...' : 'Synchronize Upstream Registry'} 
          variant="primary" 
          onClick={synchroniseRemoteCluster} 
          isLoading={isProcessing} 
        />
      </div>

      {pipelineError && (
        <div style={{ backgroundColor: '#ffebe6', color: '#de350b', padding: '16px', borderRadius: '6px', border: '1px solid #ffbdad', marginBottom: '24px' }}>
          ❌ <strong>Asynchronous Exception Intercepted:</strong> {pipelineError}
        </div>
      )}

      <div>
        <h3 style={{ color: '#172b4d', borderBottom: '2px solid #f4f5f7', paddingBottom: '8px' }}>
          📡 Upstream Cloud Records ({nodes.length})
        </h3>
        
        {isProcessing ? (
          <p style={{ textAlign: 'center', color: '#7a869a', padding: '20px' }}>🔄 Streaming live parameters from backend cloud node...</p>
        ) : null}

        {!isProcessing && nodes.length === 0 && !pipelineError ? (
          <p style={{ textAlign: 'center', color: '#7a869a' }}>Zero nodes active. Re-trigger pipeline synchronization above.</p>
        ) : null}

        {!isProcessing && nodes.map((node) => (
          <Card 
            key={node.id} 
            title={node.title} 
            subtitle={`Node Cluster Link: upstream-0x${node.id} | Timestamp: ${node.timestamp}`}
            footerActions={
              <Button label="De-allocate" variant="danger" size="small" onClick={() => setNodes(prev => prev.filter(t => t.id !== node.id))} />
            }
          >
            <p style={{ margin: '0 0 6px 0' }}>Priority Weight: <strong>{node.priority}</strong></p>
            <p style={{ margin: 0 }}>Socket Pipeline Status: <span style={{ color: node.status === 'Resolved' ? '#00875a' : '#de350b', fontWeight: 'bold' }}>{node.status}</span></p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
