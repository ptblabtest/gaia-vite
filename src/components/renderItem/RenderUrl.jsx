import React, { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import UrlConfirmationModal from "@/components/modals/UrlConfirmationModal";

export const RenderUrl = ({ value, className = "" }) => {
  const [modalState, setModalState] = useState({ isOpen: false, link: "" });

  const toggleModal = (isOpen, link = "") => {
    setModalState({ isOpen, link });
  };

  const websiteUrl = `https://${value}`;

  return (
    <>
      <span
        onClick={() => toggleModal(true, websiteUrl)}
        className={`cursor-pointer ${className}`}
      >
        <LinkIcon sx={{ mr: 1 }} />
        <span className="font-bold">Open Link</span>
      </span>
      <UrlConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => toggleModal(false)}
        link={modalState.link}
        onConfirm={() => {
          window.open(modalState.link, "_blank", "noopener,noreferrer");
        }}
      />
    </>
  );
};
