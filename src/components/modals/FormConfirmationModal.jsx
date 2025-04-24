import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const messages = {
  create: {
    title: "Success",
    message: "Item has been created successfully.",
    confirmLabel: "Close",
    cancelLabel: null,
    confirmClass: "bg-blue-500 hover:bg-blue-600",
  },
  update: {
    title: "Success",
    message: "Item has been updated successfully.",
    confirmLabel: "Close",
    cancelLabel: null,
    confirmClass: "bg-green-500 hover:bg-green-600",
  },
  delete: {
    title: "Confirm Delete",
    message: "Are you sure you want to delete this item? This action cannot be undone.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    confirmClass: "bg-red-500 hover:bg-red-600",
  },
};

const FormConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  mode = "create",
}) => {
  const config = messages[mode] || messages.create;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">{config.title}</h2>
        <p className="text-sm text-gray-600">{config.message}</p>
        <div className="flex justify-center gap-3 pt-2">
          {config.cancelLabel && (
            <Button
              onClick={onClose}
              className="rounded-md px-4 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {config.cancelLabel}
            </Button>
          )}
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={`rounded-md  px-4 py-1 text-white ${config.confirmClass}`}
          >
            {config.confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FormConfirmationModal;
