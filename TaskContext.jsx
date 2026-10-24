import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('sprint_logs_db', []);

  // Structural controller to register new state blocks
  const addTask = (title, priority) => {
    const taskNode = {
      id: `node-${Date.now()}`,
      title: title.trim(),
      priority,
      status: 'Active',
      timestamp: new Date().toLocaleDateString()
    };
    setTasks((prev) => [taskNode, ...prev]);
  };

  // Toggle state status flag
  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: task.status === 'Resolved' ? 'Active' : 'Resolved' } : task
      )
    );
  };

  // Purge selected item from the array configuration
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks execution failure: Target node must reside inside a TaskProvider container.');
  }
  return context;
};
