import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "@/components/Button";

const Modal = ({ isOpen, onClose, children, className = "max-w-2xl" }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-xs" />
        </Transition.Child>

        {/* Modal wrapper */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Modal panel */}
              <Dialog.Panel
                className={`relative w-full transform rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all ${className}`}
              >
                {/* Close button */}
                <Button
                  type="button"
                  onClick={onClose}
                  className="absolute top-3 right-3 !bg-transparent !text-gray-500 hover:!text-gray-700 !p-1 !h-6 !w-6 !min-w-0 !border-0"
                >
                  ×
                </Button>

                {/* Content slot */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
