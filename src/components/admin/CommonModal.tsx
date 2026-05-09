import React from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  variant?: 'primary' | 'danger' | 'warning';
  isLoading?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const getConfirmButtonClass = () => {
    switch (variant) {
      case 'danger': return "bg-admin-error-100 text-white hover:bg-admin-error-100/90";
      case 'warning': return "bg-admin-warning-100 text-white hover:bg-admin-warning-90";
      default: return "bg-admin-primary-100 text-admin-netral-10 hover:bg-admin-primary-90";
    }
  };

  const getTitleClass = () => {
    switch (variant) {
      case 'danger': return "text-admin-error-100";
      case 'warning': return "text-admin-warning-100";
      default: return "text-admin-primary-100";
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => !isLoading && onClose()}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-admin-netral-10 w-full max-w-[400px] rounded-[24px] p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className={`text-admin-base font-admin-semibold ${getTitleClass()}`}>
              {title}
            </h2>
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="text-admin-netral-50 hover:text-admin-netral-100 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Body */}
          <p className="text-admin-sm font-admin-regular text-admin-netral-90 leading-relaxed">
            {message}
          </p>
          
          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg border border-admin-netral-20 text-admin-xs font-admin-regular text-admin-netral-100 bg-white hover:bg-admin-netral-10 transition-colors min-w-[100px] disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-lg text-admin-xs font-admin-regular transition-colors min-w-[100px] flex items-center justify-center gap-2 disabled:opacity-50 ${getConfirmButtonClass()}`}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommonModal;
