import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value by a specified delay.
 *
 * This hook returns a debounced version of the input value, which only updates
 * after the specified delay has passed since the last change. It's useful for
 * limiting the rate at which a function is called, such as when processing
 * user input in real-time.
 *
 * @template T
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=500] - The delay in milliseconds to wait before updating
 * the debounced value.
 * @returns {T} - The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
