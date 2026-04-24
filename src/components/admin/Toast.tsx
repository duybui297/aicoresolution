import React from 'react';

interface ToastProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
  isVisible: boolean;
  type?: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, actionText, onAction, isVisible, type = 'info' }) => {
  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-admin-primary-100', // Greenish black
    error: 'bg-admin-error-100',    // Red
    info: 'bg-admin-netral-100',     // Black
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[400] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`${bgColors[type]} text-white w-[500px] h-[42px] rounded-[8px] px-4 py-2.5 flex items-center justify-between gap-[10px] shadow-lg transition-colors`}>
        <span className="text-admin-base font-admin-semibold truncate pr-4">
          {message}
        </span>
        {actionText && (
          <button 
            onClick={onAction}
            className="text-admin-sm font-admin-regular hover:underline transition-all shrink-0"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
