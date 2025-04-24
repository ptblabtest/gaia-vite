import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import UrlConfirmationModal from '@/components/modals/UrlConfirmationModal';

export const RenderEmail = ({ value, className = '' }) => {
  const [modalState, setModalState] = useState({ isOpen: false, link: '' });
  
  const toggleModal = (isOpen, link = '') => {
    setModalState({ isOpen, link });
  };
  
  const emailUrl = `mailto:${value}`;
  
  return (
    <>
      <span
        onClick={() => toggleModal(true, emailUrl)}
        className={`cursor-pointer ${className}`}
      >
        <MailOutlineIcon sx={{ mr: 1 }} />
        <span className="font-bold">{value}</span>
      </span>
      <UrlConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => toggleModal(false)}
        link={modalState.link}
        onConfirm={() => {
          window.location.href = modalState.link;
        }}
      />
    </>
  );
};