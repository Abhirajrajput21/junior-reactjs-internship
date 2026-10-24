import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Primitive Structural QA Suite', () => {
  test('should render dynamic text node cleanly matching specification label', () => {
    render(<Button label="Execute Cluster" />);
    const targetElement = screen.getByRole('button', { name: /execute cluster/i });
    expect(targetElement).toBeInTheDocument();
    expect(targetElement).not.toBeDisabled();
  });

  test('should trigger assigned callback exactly once on user gesture interact', () => {
    const internalMockHandler = jest.fn();
    render(<Button label="Trigger Node" onClick={internalMockHandler} />);
    const targetElement = screen.getByRole('button', { name: /trigger node/i });
    fireEvent.click(targetElement);
    expect(internalMockHandler).toHaveBeenCalledTimes(1);
  });

  test('should render dynamic spinner element and block user interactions when isLoading is true', () => {
    render(<Button label="Sync System" isLoading={true} />);
    const targetElement = screen.getByRole('button');
    expect(targetElement).toBeDisabled();
    expect(targetElement).toHaveAttribute('aria-busy', 'true');
  });
});
