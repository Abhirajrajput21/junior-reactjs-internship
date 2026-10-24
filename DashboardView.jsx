import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Card from '../components/common/Card';

const DashboardView = () => {
  const { tasks, addTask, toggleTaskStatus, deleteTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('Medium');
  const [validationError, setValidationError] = useState('');

  const executeRegistration = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setValidationError('Sprint objective description title is mandatory.');
      return;
    }
    setValidationError('');
    addTask(taskTitle, priorityLevel);
    setTaskTitle('');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <form 
        onSubmit={executeRegistration} 
        style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e1e4e8', marginBottom: '32px' }}
      >
        <h3 style={{ marginTop: 0, color: '#172b4d' }}>📋 Allocate Project Node Matrix</h3>
        
        <InputField 
          label="Sprint Task Parameter" 
          value={taskTitle} 
          onChange={(e) => setTaskTitle(e.target.value)} 
          error={validationError} 
          placeholder="e.g., Configure Axios Instance Orchestrator" 
          required 
        />
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#172b4d' }}>Priority Weight</label>
          <select 
            value={priorityLevel} 
            onChange={(e) => setPriorityLevel(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '4px', border: '1px solid #c1c7d0', backgroundColor: '#ffffff', outline: 'none' }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        
        <Button label="Deploy Task State" variant="primary" size="medium" type="submit" />
      </form>

      <div>
        <h3 style={{ color: '#172b4d', borderBottom: '2px solid #f4f5f7', paddingBottom: '8px' }}>
          📡 Active Workspace Clusters ({tasks.length})
        </h3>
        
        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7a869a', padding: '20px' }}>Zero active pipelines found. Initialize a node object above.</p>
        ) : null}

        {tasks.map((task) => (
          <Card 
            key={task.id} 
            title={task.title} 
            subtitle={`Allocated Vector: ${task.id} | Timestamp: ${task.timestamp} | Priority: ${task.priority}`} 
            footerActions={
              <>
                <Button 
                  label={task.status === 'Resolved' ? 'Activate Node' : 'Resolve State'} 
                  variant="secondary" 
                  size="small" 
                  onClick={() => toggleTaskStatus(task.id)} 
                />
                <Button 
                  label="Purge" 
                  variant="danger" 
                  size="small" 
                  onClick={() => deleteTask(task.id)} 
                />
              </>
            }
          >
            <p style={{ margin: 0 }}>
              System Operational Flag: {' '}
              <strong style={{ color: task.status === 'Resolved' ? '#00875a' : '#de350b' }}>
                {task.status}
              </strong>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
