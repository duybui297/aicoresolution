import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-admin-netral-10 w-full max-w-[400px] rounded-[24px] p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-admin-base font-admin-semibold text-admin-primary-100">
              Publish this article?
            </h2>
            <button 
              onClick={onClose}
              className="text-admin-netral-50 hover:text-admin-netral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Body */}
          <p className="text-admin-sm font-admin-regular text-admin-netral-90">
            The article will be automatically published on the website.
          </p>
          
          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-admin-netral-20 text-admin-xs font-admin-regular text-admin-netral-100 bg-white hover:bg-admin-netral-10 transition-colors min-w-[100px]"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="px-6 py-2.5 rounded-lg bg-admin-primary-100 text-admin-netral-10 text-admin-xs font-admin-regular hover:bg-admin-primary-90 transition-colors min-w-[100px]"
            >
              Yes, publish!
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PublishModal;
