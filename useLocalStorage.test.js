import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('Custom useLocalStorage Hook Quality Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('should safely fall back to defined initial configuration bounds when storage entry is absent', () => {
    const { result } = renderHook(() => useLocalStorage('target_key', ['initial_node']));
    expect(result.current[0]).toEqual(['initial_node']);
  });

  test('should update storage serialization registry concurrently when active state shifts', () => {
    const { result } = renderHook(() => useLocalStorage('target_key', []));
    act(() => {
      result.current[1](['new_cluster_node']);
    });
    expect(result.current[0]).toEqual(['new_cluster_node']);
    expect(JSON.parse(window.localStorage.getItem('target_key'))).toEqual(['new_cluster_node']);
  });
});
