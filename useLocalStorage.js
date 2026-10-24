import { useState, useEffect } from 'react';

/**
 * Custom hook to manage persistent reactive state in window.localStorage
 * @param {string} key Unique browser storage vector string
 * @param {any} initialValue Default state configuration fallback
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`[Storage Engine] Read failure on key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`[Storage Engine] Write allocation leakage on key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
