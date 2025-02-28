
import React, { useState, useEffect } from 'react';
import Toast, { ToastType } from './Toast';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Create a singleton toast service
class ToastService {
  private static instance: ToastService;
  private listeners: ((toast: ToastMessage) => void)[] = [];

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  public addListener(listener: (toast: ToastMessage) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public show(message: string, type: ToastType = 'info', duration: number = 3000) {
    const toast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
      duration
    };
    this.listeners.forEach(listener => listener(toast));
  }
}

// Export the singleton for use throughout the app
export const toastService = ToastService.getInstance();

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toastService.addListener((toast) => {
      setToasts(prev => [...prev, toast]);
    });
    
    return unsubscribe;
  }, []);

  const removeToast = (id: string) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
