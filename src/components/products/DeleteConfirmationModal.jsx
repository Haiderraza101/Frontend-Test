import React from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName, isMultiple = false, count = 1 }) {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.4, bounce: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity cursor-pointer" 
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl cursor-default w-full max-w-md overflow-hidden"
          >
            {/* Header with Icon */}
            <div className="relative bg-gradient-to-br from-red-50 to-orange-50 px-6 pt-6 pb-4">
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {isMultiple ? 'Delete Selected Products?' : 'Delete Product?'}
                  </h3>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-8 text-center">
              <p className="text-gray-600 font-medium">
                Are you sure? This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button 
                onClick={onClose}
                type="button" 
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-red-700 transition-all group cursor-pointer shadow-sm hover:shadow-md"
              >
                <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Delete {isMultiple ? `${count} Products` : 'Product'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
