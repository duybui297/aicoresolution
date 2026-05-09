import React from 'react';
import CommonModal from './CommonModal';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Publish this article?"
      message="The article will be automatically published on the website."
      confirmText="Yes, publish!"
      variant="primary"
    />
  );
};

export default PublishModal;
