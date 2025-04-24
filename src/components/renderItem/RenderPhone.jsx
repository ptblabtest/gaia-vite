import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import UrlConfirmationModal from '@//components/modals/UrlConfirmationModal';

export const RenderPhone = ({ value, className = '' }) => {
  const [modalState, setModalState] = useState({ isOpen: false, link: '' });
  
  const toggleModal = (isOpen, link = '') => {
    setModalState({ isOpen, link });
  };
  
  const phoneUrl = `https://wa.me/${value}`;
  
  return (
    <>
      <span
        onClick={() => toggleModal(true, phoneUrl)}
        className={`cursor-pointer ${className}`}
      >
        <PhoneIcon sx={{ mr: 1 }} />
        <span className="font-bold">+{value}</span>
      </span>
      <UrlConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => toggleModal(false)}
        link={modalState.link}
        onConfirm={() => {
          window.open(modalState.link, '_blank', 'noopener,noreferrer');
        }}
      />
    </>
  );
};