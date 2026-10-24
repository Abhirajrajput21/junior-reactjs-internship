import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskProvider } from '../context/TaskContext';
import DashboardView from '.views/DashboardView';

const structuralMockDataset = [
  { id: '1', title: 'Mock Upstream Node 01', priority: 'High', status: 'Active', timestamp: '24/10/2026' }
];

describe('Workspace Integration & Orchestration QA Suite', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(structuralMockDataset),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should complete dynamic system stream mount and permit user deletion loops safely', async () => {
    render(
      <TaskProvider>
        <DashboardView />
      </TaskProvider>
    );

    expect(screen.getByText(/streaming live parameters/i)).toBeInTheDocument();

    const cardTitle = await screen.findByText('Mock Upstream Node 01');
    expect(cardTitle).toBeInTheDocument();

    const purgeButton = screen.getByRole('button', { name: /de-allocate/i });
    fireEvent.click(purgeButton);

    expect(screen.queryByText('Mock Upstream Node 01')).toBeNull();
  });
});
