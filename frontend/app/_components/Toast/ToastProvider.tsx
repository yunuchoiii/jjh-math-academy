"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import Toast from "./Toast";

type ToastContextType = {
  addToast: ({ component, type, message }: { component?: React.ReactNode; type?: 'success' | 'error' | 'info' | 'warning'; message?: string, duration?: number }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<
    { id: number; component: React.ReactNode; type: 'success' | 'error' | 'info' | 'warning' | 'default'; message?: string, duration?: number }[]
  >([]);

  const addToast = ({ component, type = 'default', message, duration = 3000 }: { component?: React.ReactNode; type?: 'success' | 'error' | 'info' | 'warning' | 'default'; message?: string, duration?: number }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, component, type, message, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration + 300);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 &&
        <div className="fixed bottom-0 right-0 w-full z-50 p-5 flex flex-col items-center gap-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              component={toast.component}
              onClose={() => removeToast(toast.id)}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
            />
        ))}
        </div>
      }
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};