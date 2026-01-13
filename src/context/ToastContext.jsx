import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 z-[200] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md",
                toast.type === 'success' && "bg-white/90 border-[#16a34a]/20 text-gray-900",
                toast.type === 'error' && "bg-white/90 border-red-200 text-gray-900",
                toast.type === 'info' && "bg-white/90 border-blue-200 text-gray-900"
              )}
            >
              <div className={cn(
                "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                toast.type === 'success' && "bg-[#e8f5e9] text-[#16a34a]",
                toast.type === 'error' && "bg-red-50 text-red-600",
                toast.type === 'info' && "bg-blue-50 text-blue-600"
              )}>
                {toast.type === 'success' && <CheckCircle2 className="h-6 w-6" />}
                {toast.type === 'error' && <AlertCircle className="h-6 w-6" />}
                {toast.type === 'info' && <Info className="h-6 w-6" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Notification'}
                </p>
                <p className="text-xs text-gray-500 font-medium leading-tight mt-0.5">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
