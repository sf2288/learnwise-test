'use client';

import React, { useEffect, useState } from 'react';
import { Icons } from '../Icons';

interface ToastProps {
  id: string;
  title: string;
  message: string;
  onClose: (id: string) => void;
  type?: 'success' | 'error'; // Accept 'success' or 'error'
}

const CloseIcon = Icons['close'];

/**
 * A toast component that displays a message and automatically closes after 5 seconds.
 * Can be closed manually by clicking the close button.
 *
 * @param {string} id - Unique ID for the toast.
 * @param {string} title - Title of the toast.
 * @param {string} message - Message of the toast.
 * @param {Function} onClose - Function to call when the toast is closed.
 * @param {'success' | 'error'} type - Type of the toast, defaults to 'success'.
 */
const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  onClose,
  type = 'success'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose(id);
      }, 300); // Wait for fade-out animation to complete
    }, 5000); // Automatically close after 5 seconds

    return () => clearTimeout(timeout);
  }, [id, onClose]);

  // Set toast background color based on type
  const toastClass = type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    isVisible && (
      <div
        className={`mb-4 flex w-72 items-center justify-between rounded-lg p-4 text-white shadow-lg ${toastClass}`}
      >
        <div className="flex flex-col">
          <strong className="text-base">{title}</strong>
          <span className="text-sm">{message}</span>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              onClose(id);
            }, 300);
          }}
          className="ml-4 rounded p-1 text-white"
          aria-label="Close toast"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>
    )
  );
};

export default Toast;
