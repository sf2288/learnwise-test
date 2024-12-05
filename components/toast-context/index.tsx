'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Toast from '../toast';

interface IToast {
  title: string;
  message: string;
  type?: 'success' | 'error'; // Add type to specify toast type
}

interface ToastContextType {
  addToast: ({ title, message, type }: IToast) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastData {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error'; // Add type to the state
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = ({ title, message, type = 'success' }: IToast) => {
    const id = new Date().getTime().toString();
    setToasts((prevToasts) => [...prevToasts, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed bottom-0 right-0 space-y-4 p-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type} // Pass type to Toast component
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
