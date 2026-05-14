import React from 'react';
import CommonModal from './CommonModal';

interface UnpublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const UnpublishModal: React.FC<UnpublishModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false
}) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      confirmText="Unpublish now"
      variant="warning"
      isLoading={isLoading}
    />
  );
};

export default UnpublishModal;
