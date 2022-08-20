import { useCallback, useState } from 'react';

// Hook
const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (_: string) => void, () => string] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item || initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value: string) => {
      try {
        const valueToStore = value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, valueToStore);
      } catch (error) {
        // A more advanced implementation would handle the error case
      }
    },
    [key]
  );

  const hydrateValue = useCallback(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      const newValue = item || initialValue;
      setStoredValue(newValue);
      return newValue;
    } catch (error) {
      // If error also return initialValue
      setStoredValue(initialValue);
      return initialValue;
    }
  }, [initialValue, key]);

  return [storedValue, setValue, hydrateValue];
};

export default useLocalStorage;
