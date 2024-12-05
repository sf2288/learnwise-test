import { useEffect } from 'react';

/**
 * useClickOutside hook allows to detect if a user clicks outside of
 * the component referenced by the passed ref. It attaches an event
 * listener to the document on mount and removes it on unmount.
 *
 * @param ref - React RefObject to the element to detect outside clicks
 * @param callback - Function to call when the user clicks outside
 *
 * @example
 * const ref = useRef<HTMLElement>(null);
 * useClickOutside(ref, () => {
 *   console.log('Clicked outside');
 * });
 * return <div ref={ref}>Click outside of this div</div>;
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    /**
     * Handles the click event to determine whether it occurred outside
     * the specified element. If the click is detected outside, the provided
     * callback function is executed.
     *
     * @param event - The MouseEvent object containing details about the click event
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
