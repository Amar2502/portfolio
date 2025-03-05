import React from 'react';
import { AlertTriangle,X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 flex items-center">
          <div className="mr-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="text-red-800 font-medium text-sm">{message}</p>
          </div>
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="ml-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorBanner;