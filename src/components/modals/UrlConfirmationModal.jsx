import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const UrlConfirmationModal = ({ isOpen, onClose, link, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Navigation Confirmation</h2>
        <p>You are about to visit this link:</p>
        <pre className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800 overflow-x-auto">
          {link}
        </pre>
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UrlConfirmationModal;
